"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Mic,
  X,
  Keyboard,
  ChevronLeft,
  MessageCircle,
  Image as ImageIcon,
  FileText,
  Users,
  Calendar,
  Plus,
  Send,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useGeminiLive } from "@/hooks/use-gemini-live";

const SUGGESTION_CARDS = [
  { icon: ImageIcon, label: "Generating Image", color: "text-blue-600" },
  { icon: FileText, label: "Creating Content", color: "text-purple-600" },
  { icon: Users, label: "Scheduling Meeting", color: "text-indigo-600" },
  { icon: FileText, label: "Writing Note", color: "text-pink-600" },
];

const HISTORY_CHIPS = [
  "What prepaid datasim plan available?",
  "What 5G plans are available?",
  "How much does roaming cost?",
  "What safety features does CelcomDigi offer?",
];

export function VoiceChatAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"voice" | "chat">("voice");
  const { isConnected, error, connect, disconnect, volume } = useGeminiLive();

  // Handle connection based on open state and mode
  useEffect(() => {
    if (isOpen && mode === "voice") {
      connect();
    } else {
      disconnect();
    }
  }, [isOpen, mode, connect, disconnect]);

  // Reset mode when closed
  useEffect(() => {
    if (!isOpen) {
      setMode("voice");
    }
  }, [isOpen]);

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
      <div className="relative flex h-full w-full flex-col overflow-hidden bg-white sm:h-[630px] sm:w-[400px] sm:rounded-4xl sm:shadow-2xl transition-all duration-300">
        {mode === "voice" ? (
          <VoiceInterface
            onSwitchToChat={() => setMode("chat")}
            onClose={() => setIsOpen(false)}
            isListening={isConnected}
            error={error}
            volume={volume}
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
  error,
  volume = 0,
}: {
  onSwitchToChat: () => void;
  onClose: () => void;
  isListening: boolean;
  error: string | null;
  volume?: number;
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
        <div className="w-10" /> {/* Spacer for centering */}
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
        {/* The Blob */}
        <div className="relative mb-16  mt-4 flex items-center justify-center">
          <div
            className="relative h-48 w-48 rounded-full transition-transform duration-75 ease-out"
            style={{
              transform: isListening
                ? `scale(${1 + Math.min(volume * 1.5, 0.5)})`
                : "scale(1)",
            }}
          >
            {/* Core gradient */}
            <div className="absolute inset-0 rounded-full bg-linear-to-br from-blue-400 via-purple-500 to-indigo-600 opacity-80 blur-xl animate-pulse" />

            {/* Inner texture simulation */}
            <div
              className="absolute inset-2 rounded-full bg-linear-to-tr from-blue-300 via-indigo-400 to-purple-400 opacity-90 shadow-inner"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8) 0%, rgba(100,100,255,0) 20%), conic-gradient(from 0deg, #a5b4fc, #818cf8, #6366f1, #a5b4fc)",
              }}
            >
              <div className="absolute inset-0 rounded-full bg-white/20 backdrop-blur-sm animate-[spin_8s_linear_infinite]" />
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
              "text-sm font-medium animate-pulse mb-3",
              error ? "text-red-500" : "text-blue-600"
            )}
          >
            {error ? error : isListening ? "listening..." : "Connecting..."}
          </p>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="mb-8 flex items-center justify-center gap-6 px-6 pb-6">
        <button
          onClick={onSwitchToChat}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200"
        >
          <Keyboard className="h-5 w-5" />
        </button>

        <button className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-200 transition-transform hover:scale-105 active:scale-95">
          <Mic className="h-8 w-8" />
        </button>

        <button
          onClick={onClose}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200"
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
        body: JSON.stringify({ query: userQuery }),
      });

      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();

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

                      <div className="text-gray-800">
                        {/* Custom rendering for the specific JSON structure */}
                        {msg.content.contentMarkdown ? (
                          <div className="space-y-4">
                            {msg.content.contentMarkdown
                              .split("\n")
                              .map((line: string, i: number) => {
                                // H2 - Main Title
                                if (line.startsWith("## ")) {
                                  return (
                                    <h3
                                      key={i}
                                      className="text-lg font-bold text-gray-900 leading-tight"
                                    >
                                      {line.replace("## ", "")}
                                    </h3>
                                  );
                                }
                                // H5 - Section Headers
                                if (line.startsWith("##### ")) {
                                  const content = line.replace("##### ", "");
                                  // Handle bold in H5
                                  const parts = content.split("**");
                                  return (
                                    <h5
                                      key={i}
                                      className="text-sm font-semibold text-gray-700 mt-4 mb-2"
                                    >
                                      {parts.map((part, pIdx) =>
                                        pIdx % 2 === 1 ? (
                                          <span
                                            key={pIdx}
                                            className="font-bold text-gray-900"
                                          >
                                            {part}
                                          </span>
                                        ) : (
                                          part
                                        )
                                      )}
                                    </h5>
                                  );
                                }
                                // Bold lines (often key info)
                                if (
                                  line.startsWith("**") &&
                                  line.endsWith("**")
                                ) {
                                  return (
                                    <p
                                      key={i}
                                      className="font-semibold text-gray-900"
                                    >
                                      {line.replace(/\*\*/g, "")}
                                    </p>
                                  );
                                }
                                // Links
                                if (line.match(/\[.*\]\(.*\)/)) {
                                  const match = line.match(/\[(.*)\]\((.*)\)/);
                                  if (match) {
                                    return (
                                      <a
                                        key={i}
                                        href={match[2]}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-blue-600 hover:underline font-medium mt-2"
                                      >
                                        {match[1]}{" "}
                                        <ArrowUpRight className="ml-1 h-3 w-3" />
                                      </a>
                                    );
                                  }
                                }
                                // Empty lines
                                if (!line.trim()) return null;

                                // Regular text with potential bold parts
                                const parts = line.split("**");
                                return (
                                  <p
                                    key={i}
                                    className={cn(
                                      "text-sm leading-relaxed",
                                      // Heuristic for price or short prominent text
                                      line.length < 20 &&
                                        (line.includes("RM") ||
                                          line.includes("DataSIM"))
                                        ? "font-medium text-gray-900"
                                        : "text-gray-600"
                                    )}
                                  >
                                    {parts.map((part, pIdx) =>
                                      pIdx % 2 === 1 ? (
                                        <span
                                          key={pIdx}
                                          className="font-bold text-gray-900"
                                        >
                                          {part}
                                        </span>
                                      ) : (
                                        part
                                      )
                                    )}
                                  </p>
                                );
                              })}
                          </div>
                        ) : (
                          <div className="whitespace-pre-wrap text-sm">
                            {msg.content.contentMarkdown}
                          </div>
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
                                <span className="text-sm font-semibold text-blue-900 group-hover:text-blue-800 truncate max-w-[200px]">
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
