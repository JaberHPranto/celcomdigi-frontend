/**
 * Screen Capture Utility
 * Provides functions for capturing screen regions, elements, and viewport
 * using html2canvas for web content rendering.
 */

export interface CaptureRegion {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface CaptureResult {
  base64: string; // Base64 encoded image data (without data URL prefix)
  dataUrl: string; // Full data URL
  mimeType: string;
  width: number;
  height: number;
}

/**
 * Dynamically import html2canvas to avoid SSR issues
 */
async function getHtml2Canvas() {
  const html2canvas = (await import("html2canvas-pro")).default;
  return html2canvas;
}

/**
 * Capture a specific region of the screen
 * @param region - The region to capture (x, y, width, height)
 * @param quality - JPEG quality (0-1), defaults to 0.8
 * @returns CaptureResult with base64 encoded image
 */
export async function captureRegion(
  region: CaptureRegion,
  quality: number = 0.8
): Promise<CaptureResult> {
  const html2canvas = await getHtml2Canvas();
  const canvas = await html2canvas(document.body, {
    x: region.x + window.scrollX,
    y: region.y + window.scrollY,
    width: region.width,
    height: region.height,
    scrollX: -window.scrollX,
    scrollY: -window.scrollY,
    useCORS: true,
    allowTaint: true,
    logging: false,
    backgroundColor: "#ffffff",
  });

  const dataUrl = canvas.toDataURL("image/jpeg", quality);
  const base64 = dataUrl.split(",")[1];

  return {
    base64,
    dataUrl,
    mimeType: "image/jpeg",
    width: region.width,
    height: region.height,
  };
}

/**
 * Capture a specific HTML element
 * @param element - The HTML element to capture
 * @param quality - JPEG quality (0-1), defaults to 0.8
 * @returns CaptureResult with base64 encoded image
 */
export async function captureElement(
  element: HTMLElement,
  quality: number = 0.8
): Promise<CaptureResult> {
  const html2canvas = await getHtml2Canvas();
  const canvas = await html2canvas(element, {
    useCORS: true,
    allowTaint: true,
    logging: false,
    backgroundColor: "#ffffff",
  });

  const dataUrl = canvas.toDataURL("image/jpeg", quality);
  const base64 = dataUrl.split(",")[1];

  return {
    base64,
    dataUrl,
    mimeType: "image/jpeg",
    width: canvas.width,
    height: canvas.height,
  };
}

/**
 * Capture the current viewport
 * @param quality - JPEG quality (0-1), defaults to 0.8
 * @returns CaptureResult with base64 encoded image
 */
export async function captureViewport(
  quality: number = 0.8
): Promise<CaptureResult> {
  return captureRegion(
    {
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    },
    quality
  );
}

/**
 * Resize an image to fit within max dimensions while maintaining aspect ratio
 * This helps reduce payload size for API calls
 * @param base64 - Base64 encoded image
 * @param maxWidth - Maximum width
 * @param maxHeight - Maximum height
 * @param quality - JPEG quality
 * @returns Resized base64 image
 */
export async function resizeImage(
  base64: string,
  maxWidth: number = 1024,
  maxHeight: number = 1024,
  quality: number = 0.8
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      let { width, height } = img;

      // Calculate new dimensions maintaining aspect ratio
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width = Math.floor(width * ratio);
        height = Math.floor(height * ratio);
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);
      const resizedDataUrl = canvas.toDataURL("image/jpeg", quality);
      resolve(resizedDataUrl.split(",")[1]);
    };

    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = `data:image/jpeg;base64,${base64}`;
  });
}

/**
 * Get estimated file size of base64 encoded data
 * @param base64 - Base64 encoded string
 * @returns Size in bytes
 */
export function getBase64Size(base64: string): number {
  // Base64 encoding increases size by ~33%
  return Math.ceil((base64.length * 3) / 4);
}

/**
 * Format file size for display
 * @param bytes - Size in bytes
 * @returns Formatted string (e.g., "1.5 MB")
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
