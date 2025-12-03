"use client";

import { useGeminiLive } from "@/hooks/use-gemini-live";
import {
  captureRegion,
  formatFileSize,
  getBase64Size,
  resizeImage,
} from "@/lib/screen-capture";
import { cn } from "@/lib/utils";
import {
  ArrowUpRight,
  ChevronLeft,
  Keyboard,
  Mic,
  MicOff,
  Plus,
  Scan,
  Send,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { RegionSelector, type SelectedRegion } from "./region-selector";

const HISTORY_CHIPS = [
  "What prepaid datasim plan available?",
  "What 5G plans are available?",
  "How much does roaming cost?",
  "Can you tell me about the Home Fibre plan? ",
];

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
    // Close the chat panel temporarily to allow full screen selection
    setIsCapturingRegion(true);
  }, []);

  // Handle when a region is selected
  const handleRegionSelected = useCallback(
    async (region: SelectedRegion) => {
      setIsProcessingCapture(true);

      try {
        // Capture the selected region
        const result = await captureRegion(region);

        // Resize if too large (max 1024px)
        let finalBase64 = result.base64;
        const originalSize = getBase64Size(result.base64);

        if (originalSize > 500 * 1024) {
          // If > 500KB, resize
          finalBase64 = await resizeImage(result.base64, 1024, 1024, 0.7);
          console.log(
            `Image resized: ${formatFileSize(originalSize)} -> ${formatFileSize(
              getBase64Size(finalBase64)
            )}`
          );
        }

        // Store captured image for preview
        setCapturedImage(`data:${result.mimeType};base64,${finalBase64}`);

        // If connected, send the image immediately
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

  // Cancel region capture
  const handleCancelCapture = useCallback(() => {
    setIsCapturingRegion(false);
  }, []);

  // Clear captured image
  const handleClearCapture = useCallback(() => {
    setCapturedImage(null);
  }, []);

  // Show region selector overlay when capturing
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
            "h-[650px]": mode === "chat",
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

function VoiceInterface({
  onSwitchToChat,
  onClose,
  isListening,
  onToggleListening,
  onStartCapture,
  onClearCapture,
  capturedImage,
  error,
  volume = 0,
  caption = "",
  userCaption = "",
  aiCaption = "",
  toolAction = null,
}: {
  onSwitchToChat: () => void;
  onClose: () => void;
  isListening: boolean;
  onToggleListening: () => void;
  onStartCapture: () => void;
  onClearCapture: () => void;
  capturedImage: string | null;
  error: string | null;
  volume?: number;
  caption?: string;
  userCaption?: string;
  aiCaption?: string;
  toolAction?: { action: string; data: any } | null;
}) {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <button
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h2 className="text-lg font-semibold text-gray-900">Voice chat</h2>

        {/* Screen Capture button */}
        <button
          onClick={onStartCapture}
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full transition-colors",
            capturedImage
              ? "bg-blue-100 text-blue-600 hover:bg-blue-200"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          )}
          title="Capture screen region"
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M7 19a2 2 0 0 1 -2 -2" />
              <path d="M5 13v-2" />
              <path d="M5 7a2 2 0 0 1 2 -2" />
              <path d="M11 5h2" />
              <path d="M17 5a2 2 0 0 1 2 2" />
              <path d="M19 11v2" />
              <path d="M19 17v4" />
              <path d="M21 19h-4" />
              <path d="M13 19h-2" />
            </svg>
          </div>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
        {/* Captured Image Preview */}
        {capturedImage && (
          <div className="mb-6 relative group">
            <div className="rounded-xl overflow-hidden border-2 border-blue-200 shadow-lg max-w-[280px]">
              <img
                src={capturedImage}
                alt="Captured region"
                className="w-full h-auto max-h-40 object-contain bg-gray-50"
              />
            </div>
            <button
              onClick={onClearCapture}
              className="absolute -top-2 -right-2 h-6 w-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
              title="Remove captured image"
            >
              <X className="h-3 w-3" />
            </button>
            <p className="text-xs text-blue-600 mt-2 font-medium">
              ✓ Image captured - Ask me about it!
            </p>
          </div>
        )}

        {/* The Blob */}
        <div className="relative mb-16 mt-4 flex items-center justify-center">
          <div
            className="relative h-48 w-48 rounded-full transition-transform duration-75 ease-out"
            style={{
              transform: isListening
                ? `scale(${1 + Math.min(volume * 1.5, 0.5)})`
                : "scale(1)",
            }}
          >
            {/* Core gradient */}
            <div
              className={cn(
                "absolute inset-0 rounded-full bg-linear-to-br from-blue-400 via-purple-500 to-indigo-600 opacity-80 blur-xl",
                isListening ? "animate-pulse" : "opacity-40"
              )}
            />

            {/* Inner texture simulation */}
            <div
              className="absolute inset-2 rounded-full bg-linear-to-tr from-blue-300 via-indigo-400 to-purple-400 opacity-90 shadow-inner"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8) 0%, rgba(100,100,255,0) 20%), conic-gradient(from 0deg, #a5b4fc, #818cf8, #6366f1, #a5b4fc)",
              }}
            >
              <div
                className={cn(
                  "absolute inset-0 rounded-full bg-white/20 backdrop-blur-sm",
                  isListening ? "animate-[spin_8s_linear_infinite]" : ""
                )}
              />
            </div>

            {/* Shine effect */}
            <div className="absolute top-4 left-8 h-12 w-20 -rotate-45 rounded-full bg-linear-to-b from-white/60 to-transparent blur-md" />
          </div>
        </div>

        {/* Text */}
        <div className="space-y-4">
          <p className="text-xl font-medium leading-relaxed text-gray-800">
            "Hello 👋 I can help you answer questions related to{" "}
            <strong>CelcomDigi</strong> <br />
            Ask me anything!"
          </p>

          <p
            className={cn(
              "text-sm font-medium mb-3",
              error
                ? "text-red-500"
                : isListening
                  ? "text-blue-600 animate-pulse"
                  : "text-gray-500"
            )}
          >
            {error
              ? error
              : isListening
                ? "Listening..."
                : "Tap microphone to start"}
          </p>

          {/* Live Caption Display */}
          {(userCaption || aiCaption) && (
            <div className="my-6 max-w-md mx-auto space-y-3">
              {/* User Caption */}
              {userCaption && (
                <div className="rounded-2xl bg-gray-100 p-4 shadow-sm border border-gray-200">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-gray-500">
                      You
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {userCaption}
                  </p>
                </div>
              )}

              {/* AI Caption */}
              {aiCaption && (
                <div className="rounded-2xl bg-linear-to-br from-blue-50 to-indigo-50 p-4 shadow-sm border border-blue-100">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-blue-600">
                      AI
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {aiCaption}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Tool Action Visuals */}
          {toolAction && (
            <div className="my-4 w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
              {/* Network Diagnostic Visuals */}
              {toolAction.action === "diagnostic_start" && (
                <div className="bg-white rounded-2xl p-5 shadow-lg border border-blue-100">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                      <div className="absolute inset-0 rounded-full border-4 border-blue-500/30 border-t-blue-600 animate-spin" />
                      <Scan className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900">
                        Scanning Network
                      </h3>
                      <p className="text-sm text-gray-500">
                        Checking signal strength & latency...
                      </p>
                    </div>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 animate-[loading_2s_ease-in-out_infinite] w-1/2 rounded-full" />
                  </div>
                </div>
              )}

              {toolAction.action === "diagnostic_complete" && (
                <div className="bg-green-50 rounded-2xl p-5 shadow-lg border border-green-100">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <div className="h-6 w-6 text-green-600 font-bold text-xl">
                        ✓
                      </div>
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-green-900">
                        Issue Resolved
                      </h3>
                      <p className="text-sm text-green-700">
                        Port reset successful. Speed restored.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Mobile Plan Visuals */}
              {toolAction.action === "purchase_mobile_start" && (
                <div className="bg-linear-to-br from-blue-600 to-blue-800 rounded-2xl p-5 shadow-lg text-white border border-blue-500/50">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                      <div className="absolute h-12 w-12 rounded-full border-4 border-white/30 animate-spin" />
                      <span className="text-xl">📱</span>
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-white">
                        Activating Plan
                      </h3>
                      <p className="text-sm text-blue-100">
                        {toolAction.data.planName} • {toolAction.data.type}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {toolAction.action === "purchase_mobile_complete" && (
                <div className="bg-white rounded-2xl p-0 shadow-xl overflow-hidden border border-gray-100">
                  <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
                    <span className="font-bold text-lg">CelcomDigi</span>
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full uppercase tracking-wider">Active</span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 text-xl mb-1">{toolAction.data.planName}</h3>
                    <p className="text-gray-500 text-sm mb-4 capitalize">{toolAction.data.type} Plan</p>
                    <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-2 rounded-lg w-fit">
                      <span className="text-lg">✓</span>
                      <span className="font-medium text-sm">Activation Successful</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Fibre Plan Visuals */}
              {toolAction.action === "purchase_fibre_start" && (
                <div className="bg-gray-900 rounded-2xl p-5 shadow-lg text-white border border-gray-800">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/20">
                      <div className="h-full bg-blue-500 animate-[pulse_1s_ease-in-out_infinite] w-1 rounded-full mx-0.5" />
                      <div className="h-3/4 bg-blue-500 animate-[pulse_1.2s_ease-in-out_infinite] w-1 rounded-full mx-0.5" />
                      <div className="h-1/2 bg-blue-500 animate-[pulse_0.8s_ease-in-out_infinite] w-1 rounded-full mx-0.5" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-white">
                        Checking Availability
                      </h3>
                      <p className="text-sm text-gray-400">
                        {toolAction.data.planName} • {toolAction.data.speed}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {toolAction.action === "purchase_fibre_complete" && (
                <div className="bg-white rounded-2xl p-5 shadow-xl border-l-4 border-l-blue-600 border-y border-r border-gray-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">Installation Scheduled</h3>
                      <p className="text-blue-600 font-medium">{toolAction.data.planName}</p>
                      <p className="text-gray-500 text-xs mt-1">Speed: {toolAction.data.speed}</p>
                    </div>
                    <div className="h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center">
                      <span className="text-xl">🏠</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Roaming Pass Visuals */}
              {toolAction.action === "purchase_roaming_start" && (
                <div className="bg-linear-to-r from-orange-500 to-pink-500 rounded-2xl p-5 shadow-lg text-white">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm animate-bounce">
                      <span className="text-xl">✈️</span>
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-white">
                        Adding Roaming Pass
                      </h3>
                      <p className="text-sm text-white/90">
                        {toolAction.data.country} • {toolAction.data.duration}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {toolAction.action === "purchase_roaming_complete" && (
                <div className="relative bg-white rounded-2xl p-5 shadow-xl border border-gray-200 overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-orange-100 rounded-bl-full -mr-10 -mt-10 z-0" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">🇯🇵</span> {/* Placeholder flag, could be dynamic */}
                      <span className="font-bold text-gray-900 text-lg">Roaming Active</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Country</span>
                        <span className="font-medium text-gray-900">{toolAction.data.country}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Duration</span>
                        <span className="font-medium text-gray-900">{toolAction.data.duration}</span>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-dashed border-gray-200 text-center text-xs text-gray-400">
                      Safe travels! 🌍
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer Controls */}
      <div className="mb-8 flex items-center justify-center gap-4 px-6 pb-6">
        {/* Keyboard / Chat button */}
        <button
          onClick={onSwitchToChat}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200"
          title="Switch to chat"
        >
          <Keyboard className="h-5 w-5" />
        </button>

        {/* Main Mic button */}
        <button
          onClick={onToggleListening}
          className={cn(
            "flex h-20 w-20 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95",
            isListening
              ? "bg-red-500 text-white shadow-red-200 animate-pulse"
              : "bg-blue-600 text-white shadow-blue-200"
          )}
        >
          {isListening ? (
            <MicOff className="h-8 w-8" />
          ) : (
            <Mic className="h-8 w-8" />
          )}
        </button>

        {/* Close button */}
        <button
          onClick={onClose}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200"
          title="Close"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </>
  );
}

function ChatInterface({
  onBack,
  onClose,
}: {
  onBack: () => void;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<
    Array<{ role: "user" | "assistant"; content: any }>
  >([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userQuery = inputValue;

    // Add user message
    const newMessages = [
      ...messages,
      { role: "user" as const, content: userQuery },
    ];
    setMessages(newMessages);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat/retrieval", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userQuery, k: 1 }),
      });

      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();
      console.log("DATA", data)

      if (data.results && data.results.length > 0) {
        // Take the top result
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.results[0] },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: {
              contentPlainText:
                "I'm sorry, I couldn't find any specific information about that. Could you try rephrasing your question?",
              category: "System",
              similarity: 0,
            },
          },
        ]);
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: {
            contentPlainText:
              "Sorry, something went wrong while connecting to the server. Please try again later.",
            category: "Error",
            similarity: 0,
          },
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col bg-gray-50/50">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-4 shadow-sm">
        <button
          onClick={onBack}
          className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100"
        >
          <ChevronLeft className="h-5 w-5 text-gray-600" />
        </button>
        <h2 className="text-base font-semibold text-gray-900">Chat</h2>
        <button
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100"
        >
          <X className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="space-y-8 pt-4">
            {/* Chat History */}
            <div>
              <div className="mb-5 flex items-center justify-between px-1">
                <h3 className=" text-gray-900 font-semibold">
                  I can help you with following task
                </h3>
              </div>
              <div className="flex gap-2 flex-wrap">
                {HISTORY_CHIPS.map((chip, idx) => (
                  <button
                    key={idx}
                    className="whitespace-pre-wrap rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 text-left"
                    onClick={() => setInputValue(chip)}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex",
                  msg.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl p-4",
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-white shadow-sm rounded-bl-none border border-gray-100"
                  )}
                >
                  {msg.role === "user" ? (
                    <p>{msg.content}</p>
                  ) : (
                    <div className="space-y-3">
                      {/* Render AI Response */}
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                        <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium capitalize">
                          {msg.content.category}
                        </span>
                        <span>
                          Match: {Math.round(msg.content.similarity * 100)}%
                        </span>
                      </div>

                      <div className="text-gray-700 mt-3 ">
                        {
                          msg.content.aiAnswer ? (
                            <div
                              className="text-gray-600 leading-relaxed wrap-break-word"
                              dangerouslySetInnerHTML={{
                                __html: msg.content.aiAnswer
                                  .replace(
                                    /\*\*(.*?)\*\*/g,
                                    "<strong class='font-semibold text-blue-600'>$1</strong>"
                                  )
                                  .replace(/\n/g, "<br/>")
                              }}
                            />
                          ) : msg.content.contentPlainText ? (
                            <p>{msg.content.contentPlainText}</p>
                          ) : (
                            <p className="text-red-700 italic">Failed to generate AI response</p>
                          )}

                        {msg.content.url && (
                          <div className="mt-4 pt-3 border-t border-gray-100">
                            <a
                              href={msg.content.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between w-full p-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors group"
                            >
                              <div className="flex flex-col items-start">
                                <span className="text-xs font-medium text-blue-600 uppercase tracking-wider">
                                  Visit Page
                                </span>
                                <span className=" mt-1 text-sm font-semibold text-blue-900 group-hover:text-blue-800 truncate max-w-[200px]">
                                  View full details
                                </span>
                              </div>
                              <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                <ArrowUpRight className="h-4 w-4 text-blue-600" />
                              </div>
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white shadow-sm rounded-2xl rounded-bl-none border border-gray-100 p-4">
                  <div className="flex space-x-2 items-center h-6">
                    <div
                      className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <div
                      className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <div
                      className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-white p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="relative flex items-center gap-2 rounded-full bg-gray-100 p-2 pr-2">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-500 shadow-sm hover:text-gray-700">
            <Plus className="h-5 w-5" />
          </button>

          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask anything..."
            className="flex-1 bg-transparent px-2 text-gray-900 placeholder-gray-500 focus:outline-none"
          />

          {inputValue.trim() ? (
            <button
              onClick={handleSend}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm hover:bg-blue-700"
            >
              <Send className="h-5 w-5" />
            </button>
          ) : (
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-500 shadow-sm hover:text-gray-700">
              <Mic className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
