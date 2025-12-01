"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { GeminiLiveClient } from "@/lib/gemini-live";
import { useRouter } from "next/navigation";

export function useGeminiLive() {
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [volume, setVolume] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const clientRef = useRef<GeminiLiveClient | null>(null);
  const router = useRouter();

  const connect = useCallback(async () => {
    setError(null);
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
        },
        (url) => {
          console.log("Navigating to:", url);
          window.open(url, "_blank");
        },
        (vol) => {
          setVolume(vol);
        }
      );

      await clientRef.current.connect();
      setIsConnected(true);
    } catch (error) {
      console.error("Failed to connect:", error);
      setError("Failed to connect to voice service");
      setIsConnected(false);
    }
  }, [router]);

  const disconnect = useCallback(() => {
    if (clientRef.current) {
      clientRef.current.stop();
      clientRef.current = null;
    }
    setIsConnected(false);
    setIsSpeaking(false);
  }, []);

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
    connect,
    disconnect,
  };
}
