"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, Keyboard, Mic, MicOff, X, Crop } from "lucide-react";
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
      <div className="flex flex-1 flex-col items-center justify-center px-8 text-center relative">
        {/* Background Ambient Glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
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

        {/* The Blob Animation */}
        <div className="relative mb-12 mt-4 flex items-center justify-center">
          {/* Outer rings */}
          {isListening && (
            <>
              <div className="absolute inset-0 rounded-full border border-blue-200 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
              <div className="absolute inset-0 rounded-full border border-purple-200 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] [animation-delay:0.5s]" />
            </>
          )}

          <div
            className="relative h-56 w-56 transition-all duration-100 ease-out"
            style={{
              transform: isListening
                ? `scale(${1 + Math.min(volume * 2, 0.4)})`
                : "scale(1)",
            }}
          >
            {/* Core gradient */}
            <div
              className={cn(
                "absolute inset-0 rounded-full bg-linear-to-br from-blue-500 via-indigo-500 to-purple-600 blur-xl transition-opacity duration-500",
                isListening ? "opacity-60" : "opacity-30"
              )}
            />

            {/* Main Orb */}
            <div className="absolute inset-4 rounded-full bg-linear-to-tr from-blue-400 via-indigo-500 to-purple-500 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.4),transparent)]" />
              <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent,rgba(255,255,255,0.2),transparent)] animate-[spin_4s_linear_infinite]" />

              {/* Inner fluid effect */}
              <div className="absolute inset-0 opacity-50 mix-blend-overlay">
                <div className="absolute -inset-full bg-linear-to-r from-transparent via-white/30 to-transparent rotate-45 animate-[shimmer_3s_infinite]" />
              </div>
            </div>
          </div>
        </div>

        {/* Text and Captions */}
        <div className="space-y-6 max-w-lg relative z-10 min-h-[120px]">
          {!userCaption && !aiCaption && !toolAction && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
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
                <p className="text-xl font-medium text-gray-600 animate-in fade-in slide-in-from-bottom-2">
                  "{userCaption}"
                </p>
              )}
              {aiCaption && (
                <p className="text-xl font-medium text-blue-600 animate-in fade-in slide-in-from-bottom-2">
                  {aiCaption}
                </p>
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
            "h-20 w-20 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95",
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
      </div>
    </>
  );
}
