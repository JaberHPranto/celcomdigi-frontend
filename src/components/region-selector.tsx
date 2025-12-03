"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectedRegion {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface RegionSelectorProps {
  onRegionSelected: (region: SelectedRegion) => void;
  onCancel: () => void;
  isCapturing?: boolean;
}

export function RegionSelector({
  onRegionSelected,
  onCancel,
  isCapturing = false,
}: RegionSelectorProps) {
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });
  const overlayRef = useRef<HTMLDivElement>(null);

  // Handle escape key to cancel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCancel();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onCancel]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    // Ignore if clicking on cancel button
    if ((e.target as HTMLElement).closest("[data-cancel-button]")) {
      return;
    }

    setIsDrawing(true);
    setStartPos({ x: e.clientX, y: e.clientY });
    setCurrentPos({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDrawing) {
        setCurrentPos({ x: e.clientX, y: e.clientY });
      }
    },
    [isDrawing]
  );

  const handleMouseUp = useCallback(() => {
    if (isDrawing) {
      const x = Math.min(startPos.x, currentPos.x);
      const y = Math.min(startPos.y, currentPos.y);
      const width = Math.abs(currentPos.x - startPos.x);
      const height = Math.abs(currentPos.y - startPos.y);

      // Only trigger if selection is large enough
      if (width > 20 && height > 20) {
        onRegionSelected({ x, y, width, height });
      }
      setIsDrawing(false);
    }
  }, [isDrawing, startPos, currentPos, onRegionSelected]);

  const selectionRect = isDrawing
    ? {
        left: Math.min(startPos.x, currentPos.x),
        top: Math.min(startPos.y, currentPos.y),
        width: Math.abs(currentPos.x - startPos.x),
        height: Math.abs(currentPos.y - startPos.y),
      }
    : null;

  return (
    <div
      ref={overlayRef}
      className={cn(
        "fixed inset-0 z-9999 cursor-crosshair transition-colors",
        isCapturing ? "bg-black/40" : "bg-black/20"
      )}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Instructions Banner */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-gray-900/95 text-white px-6 py-3 rounded-xl shadow-xl backdrop-blur-sm">
        <div className="flex flex-col">
          <span className="font-semibold text-sm">
            {isCapturing ? "Capturing..." : "Select a Region"}
          </span>
          <span className="text-xs text-gray-300">
            {isCapturing
              ? "Please wait while we capture the selected area"
              : "Click and drag to select an area to capture"}
          </span>
        </div>

        {!isCapturing && (
          <button
            data-cancel-button
            onClick={onCancel}
            className="ml-4 p-2 hover:bg-white/20 rounded-full transition-colors"
            title="Cancel (ESC)"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Keyboard shortcut hint */}
      {!isCapturing && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gray-900/80 text-white text-xs px-3 py-1.5 rounded-lg">
          Press{" "}
          <kbd className="px-1.5 py-0.5 bg-gray-700 rounded mx-1">ESC</kbd> to
          cancel
        </div>
      )}

      {/* Selection Rectangle */}
      {selectionRect && (
        <>
          {/* Main selection box */}
          <div
            className="absolute border-2 border-blue-500 bg-blue-500/10 pointer-events-none"
            style={{
              left: selectionRect.left,
              top: selectionRect.top,
              width: selectionRect.width,
              height: selectionRect.height,
            }}
          >
            {/* Corner handles for visual feedback */}
            <div className="absolute -top-1 -left-1 w-3 h-3 bg-blue-500 rounded-sm" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-sm" />
            <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-500 rounded-sm" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 rounded-sm" />

            {/* Dimension display */}
            {selectionRect.width > 60 && selectionRect.height > 40 && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-xs px-2 py-1 rounded pointer-events-none">
                {Math.round(selectionRect.width)} ×{" "}
                {Math.round(selectionRect.height)}
              </div>
            )}
          </div>

          {/* Darkened areas outside selection */}
          <div
            className="absolute bg-black/30 pointer-events-none"
            style={{
              top: 0,
              left: 0,
              right: 0,
              height: selectionRect.top,
            }}
          />
          <div
            className="absolute bg-black/30 pointer-events-none"
            style={{
              top: selectionRect.top + selectionRect.height,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
          <div
            className="absolute bg-black/30 pointer-events-none"
            style={{
              top: selectionRect.top,
              left: 0,
              width: selectionRect.left,
              height: selectionRect.height,
            }}
          />
          <div
            className="absolute bg-black/30 pointer-events-none"
            style={{
              top: selectionRect.top,
              left: selectionRect.left + selectionRect.width,
              right: 0,
              height: selectionRect.height,
            }}
          />
        </>
      )}

      {/* Capturing indicator */}
      {isCapturing && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-white rounded-2xl shadow-2xl p-6 flex items-center gap-4">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-gray-700 font-medium">
              Capturing region...
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
