"use client";

import { cn } from "@/lib/utils";
import { ArrowUpRight, ChevronLeft, Mic, Plus, Send, X } from "lucide-react";
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
                        {msg.content.aiAnswer ? (
                          <div
                            className="text-gray-600 leading-relaxed wrap-break-word"
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
                          <p className="text-red-700 italic">
                            Failed to generate AI response
                          </p>
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
