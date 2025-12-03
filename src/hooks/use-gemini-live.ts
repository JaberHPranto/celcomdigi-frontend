"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { GeminiLiveClient, TranscriptEvent } from "@/lib/gemini-live";
import { useRouter } from "next/navigation";

export function useGeminiLive() {
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [volume, setVolume] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [userCaption, setUserCaption] = useState("");
  const [aiCaption, setAiCaption] = useState("");
  const [toolAction, setToolAction] = useState<{
    action: string;
    data: any;
  } | null>(null);
  const clientRef = useRef<GeminiLiveClient | null>(null);
  const userCaptionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const aiCaptionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const handleTranscript = useCallback((event: TranscriptEvent) => {
    if (event.source === "user") {
      // Clear any pending timeout
      if (userCaptionTimeoutRef.current) {
        clearTimeout(userCaptionTimeoutRef.current);
      }

      if (event.isFinal) {
        // Clear user caption when turn is done
        setUserCaption("");
      } else {
        // Accumulate user speech
        setUserCaption((prev) => prev + event.text);
        // Auto-clear after 2 seconds of no new input
        userCaptionTimeoutRef.current = setTimeout(() => {
          setUserCaption("");
        }, 2000);
      }
    } else if (event.source === "ai") {
      // Clear any pending timeout
      if (aiCaptionTimeoutRef.current) {
        clearTimeout(aiCaptionTimeoutRef.current);
      }

      if (event.isFinal) {
        // Clear AI caption when turn is complete
        setTimeout(() => {
          setAiCaption("");
        }, 1000); // Small delay so user can read the last bit
      } else {
        // Accumulate AI speech
        setAiCaption((prev) => prev + event.text);
      }
    }
  }, []);

  const connect = useCallback(async () => {
    setError(null);
    setCaption("");
    setUserCaption("");
    setAiCaption("");
    setToolAction(null);
    try {
      // In a real app, fetch a short-lived token here
      // For this demo, we'll fetch the key from a server action or API
      const response = await fetch("/api/config");
      const { apiKey } = await response.json();

      if (!apiKey) {
        const errMsg = "No API key found";
        console.error(errMsg);
        setError(errMsg);
        return;
      }

      clientRef.current = new GeminiLiveClient(
        apiKey,
        (text) => {
          // Handle text (e.g. captions)
          console.log("Gemini said:", text);
          setCaption((prev) => prev + text);
        },
        (url) => {
          console.log("Navigating to:", url);
          window.open(url, "_blank");
        },
        (vol) => {
          setVolume(vol);
        },
        handleTranscript,
        (action, data) => {
          console.log("Tool action:", action, data);
          setToolAction({ action, data });

          // Clear tool action after a delay if it's a completion event
          if (action.endsWith("_complete")) {
            setTimeout(() => {
              setToolAction(null);
            }, 5000);
          }
        }
      );

      await clientRef.current.connect();
      setIsConnected(true);
    } catch (error) {
      console.error("Failed to connect:", error);
      setError("Failed to connect to voice service");
      setIsConnected(false);
    }
  }, [router, handleTranscript]);

  const disconnect = useCallback(() => {
    if (clientRef.current) {
      clientRef.current.stop();
      clientRef.current = null;
    }
    // Clear any pending timeouts
    if (userCaptionTimeoutRef.current) {
      clearTimeout(userCaptionTimeoutRef.current);
    }
    if (aiCaptionTimeoutRef.current) {
      clearTimeout(aiCaptionTimeoutRef.current);
    }
    setIsConnected(false);
    setIsSpeaking(false);
    setCaption("");
    setUserCaption("");
    setAiCaption("");
    setToolAction(null);
  }, []);

  /**
   * Send an image to the Gemini Live session for visual context analysis.
   * @param imageBase64 - Base64 encoded image data
   * @param mimeType - MIME type of the image
   * @param prompt - Optional prompt to send with the image
   * @returns true if successful, false otherwise
   */
  const sendImage = useCallback(
    async (
      imageBase64: string,
      mimeType: string = "image/jpeg",
      prompt?: string
    ): Promise<boolean> => {
      if (!clientRef.current || !isConnected) {
        console.warn("Cannot send image: not connected");
        return false;
      }

      try {
        const result = await clientRef.current.sendImage(
          imageBase64,
          mimeType,
          prompt
        );
        return result;
      } catch (error) {
        console.error("Failed to send image:", error);
        return false;
      }
    },
    [isConnected]
  );

  /**
   * Send a text message to the Gemini Live session
   * @param text - The text to send
   * @returns true if successful, false otherwise
   */
  const sendText = useCallback(
    (text: string): boolean => {
      if (!clientRef.current || !isConnected) {
        console.warn("Cannot send text: not connected");
        return false;
      }

      return clientRef.current.sendText(text);
    },
    [isConnected]
  );

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    isConnected,
    isSpeaking,
    volume,
    error,
    caption,
    userCaption,
    aiCaption,
    toolAction,
    connect,
    disconnect,
    sendImage,
    sendText,
  };
}
