"use client";

import { cn } from "@/lib/utils";
import {
  ArrowUpRight,
  ChevronLeft,
  Mic,
  Plus,
  Send,
  X,
  Sparkles,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ChatInterfaceProps, HISTORY_CHIPS, Message } from "./types";

export function ChatInterface({ onBack, onClose }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
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
      console.log("DATA", data);

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
    <div className="flex h-full flex-col bg-gray-50/50 relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-blue-50/50 to-transparent" />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between p-4 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0">
        <button
          onClick={onBack}
          className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="h-5 w-5 text-gray-600" />
        </button>
        <div className="flex flex-col items-center">
          <h2 className="text-sm font-bold text-gray-900">
            CelcomDigi Assistant
          </h2>
          <span className="text-[10px] text-green-600 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            Online
          </span>
        </div>
        <button
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 scroll-smooth">
        {messages.length === 0 ? (
          <div className="space-y-8 pt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center space-y-2">
              <div className="h-16 w-16 bg-blue-100 rounded-2xl mx-auto flex items-center justify-center mb-4 rotate-3">
                <Sparkles className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                How can I help you today?
              </h3>
              <p className="text-sm text-gray-500 max-w-xs mx-auto">
                Ask about plans, coverage, bills, or technical support.
              </p>
            </div>

            {/* Chat History / Suggestions */}
            <div>
              <div className="mb-4 px-1">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Suggested Topics
                </h3>
              </div>
              <div className="flex gap-2 flex-wrap">
                {HISTORY_CHIPS.map((chip, idx) => (
                  <button
                    key={idx}
                    className="whitespace-pre-wrap rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-all text-left shadow-[rgba(0,0,0,0.25)_0px_1px_2px] active:scale-95"
                    onClick={() => setInputValue(chip)}
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 pb-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex animate-in fade-in slide-in-from-bottom-2 duration-300",
                  msg.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl p-4 shadow-sm",
                    msg.role === "user"
                      ? "bg-linear-to-br from-blue-600 to-indigo-600 text-white rounded-br-none"
                      : "bg-white rounded-bl-none border border-gray-100"
                  )}
                >
                  {msg.role === "user" ? (
                    <p className="leading-relaxed">{msg.content}</p>
                  ) : (
                    <div className="space-y-3">
                      {/* Render AI Response */}
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                        <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium capitalize border border-blue-100">
                          {msg.content.category}
                        </span>
                        {msg.content.similarity > 0 && (
                          <span className="text-gray-400">
                            • {Math.round(msg.content.similarity * 100)}% match
                          </span>
                        )}
                      </div>

                      <div className="text-gray-700 mt-3">
                        {msg.content.aiAnswer ? (
                          <div
                            className="text-gray-600 leading-relaxed wrap-break-word prose-sm"
                            dangerouslySetInnerHTML={{
                              __html: msg.content.aiAnswer
                                .replace(
                                  /\*\*(.*?)\*\*/g,
                                  "<strong class='font-semibold text-blue-600'>$1</strong>"
                                )
                                .replace(/\n/g, "<br/>"),
                            }}
                          />
                        ) : msg.content.contentPlainText ? (
                          <p>{msg.content.contentPlainText}</p>
                        ) : (
                          <p className="text-red-700 italic text-sm">
                            Failed to generate AI response
                          </p>
                        )}

                        {msg.content.url && (
                          <div className="mt-4 pt-3 border-t border-gray-100">
                            <a
                              href={msg.content.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between w-full p-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all group border border-blue-100 hover:border-blue-200 hover:shadow-sm"
                            >
                              <div className="flex flex-col items-start overflow-hidden">
                                <span className="text-[10px] font-bold text-blue-500 uppercase tracking-wider">
                                  Source
                                </span>
                                <span className="mt-0.5 text-sm font-semibold text-blue-900 group-hover:text-blue-800 truncate w-full">
                                  View full details
                                </span>
                              </div>
                              <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform shrink-0 ml-3">
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
              <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2">
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
      <div className="bg-white p-4 border-t border-gray-100 shadow-[0_-4px_20px_-1px_rgba(0,0,0,0.05)] relative z-20">
        <div className="relative flex items-center gap-2 rounded-2xl bg-gray-50 p-2 pr-2 border border-gray-200 focus-within:border-blue-300 focus-within:ring-4 focus-within:ring-blue-50 transition-all">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask anything..."
            className="flex-1 bg-transparent px-2 text-gray-900 placeholder-gray-400 focus:outline-none text-sm font-medium  h-10"
          />

          {inputValue.trim() && (
            <button
              onClick={handleSend}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md hover:bg-blue-700 transition-all hover:scale-105 active:scale-95"
            >
              <Send className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
