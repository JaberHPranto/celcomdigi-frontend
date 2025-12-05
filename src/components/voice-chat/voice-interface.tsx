"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, Keyboard, Mic, MicOff, X } from "lucide-react";
import { VoiceInterfaceProps } from "./types";
import { ToolActionVisuals } from "./tool-action-visuals";

export function VoiceInterface({
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
}: VoiceInterfaceProps) {
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

        {/* The Blob Animation */}
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

        {/* Text and Captions */}
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
          <ToolActionVisuals toolAction={toolAction} />
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
