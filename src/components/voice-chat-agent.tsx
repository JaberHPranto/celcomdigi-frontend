"use client";

import { useGeminiLive } from "@/hooks/use-gemini-live";
import {
  captureRegion,
  formatFileSize,
  getBase64Size,
  resizeImage,
} from "@/lib/screen-capture";
import { cn } from "@/lib/utils";
import { Mic } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { RegionSelector, type SelectedRegion } from "./region-selector";
import { VoiceInterface } from "./voice-chat/voice-interface";
import { ChatInterface } from "./voice-chat/chat-interface";

export function VoiceChatAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"voice" | "chat">("voice");
  const [isCapturingRegion, setIsCapturingRegion] = useState(false);
  const [isProcessingCapture, setIsProcessingCapture] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const {
    isConnected,
    error,
    connect,
    disconnect,
    volume,
    caption,
    userCaption,
    aiCaption,
    sendImage,
    toolAction,
  } = useGeminiLive();

  // Handle connection based on open state and mode
  useEffect(() => {
    if (!isOpen || mode !== "voice") {
      disconnect();
    }
  }, [isOpen, mode, disconnect]);

  // Reset mode when closed
  useEffect(() => {
    if (!isOpen) {
      setMode("voice");
      setCapturedImage(null);
    }
  }, [isOpen]);

  const handleToggleListening = () => {
    if (isConnected) {
      disconnect();
    } else {
      connect();
    }
  };

  // Start the screen region capture process
  const handleStartCapture = useCallback(() => {
    setIsCapturingRegion(true);
  }, []);

  // Handle when a region is selected
  const handleRegionSelected = useCallback(
    async (region: SelectedRegion) => {
      setIsProcessingCapture(true);

      try {
        const result = await captureRegion(region);
        let finalBase64 = result.base64;
        const originalSize = getBase64Size(result.base64);

        if (originalSize > 500 * 1024) {
          finalBase64 = await resizeImage(result.base64, 1024, 1024, 0.7);
          console.log(
            `Image resized: ${formatFileSize(originalSize)} -> ${formatFileSize(
              getBase64Size(finalBase64)
            )}`
          );
        }

        setCapturedImage(`data:${result.mimeType};base64,${finalBase64}`);

        if (isConnected) {
          const success = await sendImage(
            finalBase64,
            result.mimeType,
            "The user has captured this screen region and wants to ask about it. Please analyze this image and be ready to answer questions about it. Start by briefly describing what you see."
          );

          if (success) {
            console.log("Image sent to Gemini Live successfully");
          }
        }
      } catch (error) {
        console.error("Failed to capture region:", error);
      } finally {
        setIsProcessingCapture(false);
        setIsCapturingRegion(false);
      }
    },
    [isConnected, sendImage]
  );

  const handleCancelCapture = useCallback(() => {
    setIsCapturingRegion(false);
  }, []);

  const handleClearCapture = useCallback(() => {
    setCapturedImage(null);
  }, []);

  if (isCapturingRegion) {
    return (
      <RegionSelector
        onRegionSelected={handleRegionSelected}
        onCancel={handleCancelCapture}
        isCapturing={isProcessingCapture}
      />
    );
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-transform hover:scale-110 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Open voice chat"
      >
        <Mic className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm sm:items-end sm:justify-end sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsOpen(false);
      }}
    >
      <div
        className={cn(
          "relative flex h-full w-full flex-col overflow-hidden bg-white sm:w-[450px] sm:rounded-4xl sm:shadow-2xl transition-all duration-300",
          {
            "h-auto max-h-[80vh] overflow-y-auto": mode === "voice",
            "h-[660px]": mode === "chat",
          }
        )}
      >
        {mode === "voice" ? (
          <VoiceInterface
            onSwitchToChat={() => setMode("chat")}
            onClose={() => setIsOpen(false)}
            isListening={isConnected}
            onToggleListening={handleToggleListening}
            onStartCapture={handleStartCapture}
            onClearCapture={handleClearCapture}
            capturedImage={capturedImage}
            error={error}
            volume={volume}
            caption={caption}
            userCaption={userCaption}
            aiCaption={aiCaption}
            toolAction={toolAction}
          />
        ) : (
          <ChatInterface
            onBack={() => setMode("voice")}
            onClose={() => setIsOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
