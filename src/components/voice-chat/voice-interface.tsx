"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, Keyboard, Mic, MicOff, X, Crop } from "lucide-react";
import { VoiceInterfaceProps } from "./types";
import { ToolActionVisuals } from "./tool-action-visuals";
import { mockToolActions } from "../../data/sample";

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
    <div className="flex flex-col h-full w-full relative overflow-hidden bg-linear-to-t from-blue-100 via-blue-50/50 to-white">
      {/* Header */}
      <div className="flex items-center justify-between p-6 relative z-10">
        <button
          onClick={onClose}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white/80 backdrop-blur-md text-gray-600 shadow-sm border border-gray-100 transition-all hover:bg-white hover:shadow-md hover:scale-105 active:scale-95"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <div className="px-4 py-1.5 bg-white/50 backdrop-blur-sm rounded-full border border-white/20 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-600 tracking-wide uppercase">
            Voice Assistant
          </h2>
        </div>

        {/* Screen Capture button */}
        <button
          onClick={onStartCapture}
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full transition-all shadow-sm border border-transparent hover:scale-105 active:scale-95",
            capturedImage
              ? "bg-blue-100 text-blue-600 border-blue-200 shadow-blue-100"
              : "bg-white/80 backdrop-blur-md text-gray-600 border-gray-100 hover:bg-white hover:shadow-md"
          )}
          title="Capture screen region"
        >
          <Crop className="h-5 w-5" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col items-center justify-center text-center relative">
        {/* The Blob */}
        <div className="relative mb-16 mt-4 flex items-center justify-center">
          <div
            className="relative h-48 w-48 rounded-full transition-transform duration-75 ease-out "
            style={{
              transform: isListening
                ? `scale(${1 + Math.min(volume * 1.5, 0.5)})`
                : "scale(1)",
            }}
          >
            {/* Core gradient */}
            <>
              <div
                className={cn(
                  "absolute inset-0 rounded-full pointer-events-none transition-opacity duration-300",
                  isListening ? "opacity-95" : "opacity-70"
                )}
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, rgba(191,219,254,0.95) 0%, rgba(99,102,241,0.36) 30%, rgba(59,130,246,0.12) 60%)",
                  filter: "blur(18px)",
                  boxShadow:
                    "0 12px 50px rgba(59,130,246,0.20), 0 0 60px rgba(99,102,241,0.08)",
                }}
              />

              {/* Inner subtle glow / sheen */}
              <div
                className={cn(
                  "absolute inset-3 rounded-full pointer-events-none transition-opacity duration-300",
                  isListening ? "opacity-100" : "opacity-80"
                )}
                style={{
                  background:
                    "conic-gradient(from 200deg at 50% 50%, rgba(255,255,255,0.12), rgba(255,255,255,0.04), rgba(255,255,255,0))",
                  boxShadow: "inset 0 6px 18px rgba(255,255,255,0.06)",
                  mixBlendMode: "screen",
                }}
              />
            </>

            {/* Inner texture simulation */}
            <div
              className="absolute inset-2 rounded-full bg-linear-to-tr from-blue-300 via-blue-400 to-blue-500 opacity-90 shadow-inner animate-[spin_20s_linear_infinite]"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8) 0%, rgba(100,150,255,0) 20%), conic-gradient(from 0deg, #bfdbfe, #60a5fa, #3b82f6, #bfdbfe)",
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

        {/* Captured Image Preview */}
        {capturedImage && (
          <div className="mb-8 relative group animate-in fade-in zoom-in-95 duration-300">
            <div className="rounded-2xl overflow-hidden border-4 border-white shadow-2xl max-w-[280px] rotate-2 transition-transform group-hover:rotate-0">
              <img
                src={capturedImage}
                alt="Captured region"
                className="w-full h-auto max-h-40 object-contain bg-gray-50"
              />
            </div>
            <button
              onClick={onClearCapture}
              className="absolute -top-3 -right-3 h-8 w-8 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-all hover:scale-110"
              title="Remove captured image"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                Image Attached
              </span>
            </div>
          </div>
        )}

        {/* Text and Captions */}
        <div className="space-y-6 relative z-10 min-h-[120px] w-full px-6">
          {!userCaption && !aiCaption && !toolAction && !capturedImage && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                How can I help you?
              </h3>
              <p className="text-gray-500">
                Ask about plans, coverage, or troubleshooting.
              </p>
            </div>
          )}

          {/* Live Captions */}
          {(userCaption || aiCaption) && !toolAction && (
            <div className="space-y-4">
              {userCaption && (
                <div className="rounded-2xl bg-gray-100 p-4 shadow-sm border border-gray-200">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-gray-500">
                      You
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {userCaption} I am interested to know more about your 5G
                    plans.
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
                    including...
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Tool Action Visuals */}
          <div className="w-full">
            <ToolActionVisuals toolAction={toolAction} />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-medium animate-in fade-in slide-in-from-bottom-2 inline-block">
              {error}
            </div>
          )}
        </div>
      </div>

      <div className="text-center">
        <p
          className={cn(
            "text-sm font-medium",
            error
              ? "text-red-500"
              : isListening
              ? "text-blue-600 animate-pulse"
              : "text-gray-400/80"
          )}
        >
          {error
            ? error
            : isListening
            ? "Listening..."
            : "Tap microphone to start"}
        </p>
      </div>

      {/* Footer Controls */}
      <div className="p-8 flex items-center justify-center gap-6 relative z-10">
        <button
          onClick={onSwitchToChat}
          className="h-14 w-14 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-500 hover:text-blue-600 hover:scale-110 transition-all duration-300"
          title="Switch to keyboard"
        >
          <Keyboard className="h-6 w-6" />
        </button>

        <button
          onClick={onToggleListening}
          className={cn(
            "h-20 w-20 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer",
            isListening
              ? "bg-red-500 text-white shadow-red-200 animate-pulse"
              : "bg-linear-to-br from-blue-400 to-primary text-white shadow-blue-200"
          )}
        >
          {isListening ? (
            <MicOff className="h-8 w-8" />
          ) : (
            <Mic className="h-8 w-8" />
          )}
        </button>
        <button
          onClick={onClose}
          className="h-14 w-14 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-500 hover:text-blue-600 hover:scale-110 transition-all duration-300"
          title="Close"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
