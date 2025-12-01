import {
  GoogleGenAI,
  Modality,
  Type,
  type Session,
  type LiveServerMessage,
} from "@google/genai";
import { AudioRecorder, AudioPlayer } from "./audio-streamer";

export type TranscriptSource = "user" | "ai";

export interface TranscriptEvent {
  source: TranscriptSource;
  text: string;
  isFinal: boolean;
}

export class GeminiLiveClient {
  private session: Session | null = null;
  private audioRecorder: AudioRecorder | null = null;
  private audioPlayer: AudioPlayer | null = null;
  private apiKey: string;
  private onTextReceived: (text: string) => void;
  private onTranscript: ((event: TranscriptEvent) => void) | null = null;
  private onUrlReceived: (url: string) => void;
  private onVolumeChange: ((volume: number) => void) | null = null;
  private genAI: GoogleGenAI;
  private isConnected: boolean = false;
  private audioQueue: ArrayBuffer[] = [];

  constructor(
    apiKey: string,
    onTextReceived: (text: string) => void,
    onUrlReceived: (url: string) => void,
    onVolumeChange?: (volume: number) => void,
    onTranscript?: (event: TranscriptEvent) => void
  ) {
    this.apiKey = apiKey;
    this.onTextReceived = onTextReceived;
    this.onUrlReceived = onUrlReceived;
    this.onVolumeChange = onVolumeChange || null;
    this.onTranscript = onTranscript || null;

    this.genAI = new GoogleGenAI({ apiKey: this.apiKey });

    this.audioPlayer = new AudioPlayer(24000, (vol) => {
      this.onVolumeChange?.(vol);
    });
    this.audioRecorder = new AudioRecorder(this.sendAudio.bind(this), (vol) => {
      this.onVolumeChange?.(vol);
    });
  }

  async connect() {
    try {
      console.log("Connecting to Gemini Live API...");

      // Connect to the Live API with configuration and callbacks
      this.session = await this.genAI.live.connect({
        model: "gemini-2.0-flash-exp",
        config: {
          responseModalities: [Modality.AUDIO],
          outputAudioTranscription: {}, // Enable output audio transcription
          inputAudioTranscription: {}, // Enable input audio transcription
          generationConfig: {
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: {
                  voiceName: "Puck", // or "Charon", "Kore", "Fenrir", "Aoede"
                },
              },
            },
          },
          tools: [
            {
              functionDeclarations: [
                {
                  name: "search_celcomdigi_plans",
                  description:
                    "Search for CelcomDigi prepaid, postpaid, and fibre plans. Use this to answer user questions about plans, pricing, and features.",
                  parameters: {
                    type: Type.OBJECT,
                    properties: {
                      query: {
                        type: Type.STRING,
                        description:
                          "The user's search query about plans or services.",
                      },
                    },
                    required: ["query"],
                  },
                },
              ],
            },
          ],
        },
        callbacks: {
          onopen: () => {
            console.log("Connected to Gemini Live API");
            this.isConnected = true;
          },
          onmessage: (message: LiveServerMessage) => {
            this.handleMessage(message);
          },
          onerror: (error: ErrorEvent) => {
            console.error("WebSocket error:", error);
            this.isConnected = false;
          },
          onclose: (event: CloseEvent) => {
            console.log("Connection closed:", event.reason);
            this.isConnected = false;
          },
        },
      });

      // Start audio recording after connection is fully established and session is assigned
      this.audioRecorder?.start();
      this.flushAudioQueue();
    } catch (error) {
      console.error("Failed to connect to Gemini Live:", error);
      throw error;
    }
  }

  private async handleMessage(message: LiveServerMessage) {
    // Handle server content (text and audio)
    if (message.serverContent) {
      // Handle output transcription (what Gemini says)
      if (message.serverContent.outputTranscription) {
        const transcriptText =
          message.serverContent.outputTranscription.text || "";
        if (transcriptText) {
          this.onTextReceived(transcriptText);
          this.onTranscript?.({
            source: "ai",
            text: transcriptText,
            isFinal: false,
          });
        }
      }

      // Handle input transcription (what user says)
      if (message.serverContent.inputTranscription) {
        const inputText = message.serverContent.inputTranscription.text || "";
        if (inputText) {
          console.log("User said:", inputText);
          this.onTranscript?.({
            source: "user",
            text: inputText,
            isFinal: false,
          });
        }
      }

      // Handle turn complete - speech is finished
      if (message.serverContent.turnComplete) {
        console.log("Turn complete");
        this.onTranscript?.({
          source: "ai",
          text: "",
          isFinal: true,
        });
      }

      // Handle model turn with parts
      if (message.serverContent.modelTurn) {
        for (const part of message.serverContent.modelTurn.parts || []) {
          // Handle audio response
          if (
            part.inlineData &&
            part.inlineData.mimeType?.startsWith("audio/") &&
            part.inlineData.data
          ) {
            const audioData = this.base64ToArrayBuffer(part.inlineData.data);
            this.audioPlayer?.play(audioData);
          }
        }
      }

      // Handle interruptions
      if (message.serverContent.interrupted) {
        console.log("Generation was interrupted");
        this.audioPlayer?.stop();
      }
    }

    // Handle tool calls
    if (message.toolCall) {
      const functionCalls = message.toolCall.functionCalls || [];
      for (const call of functionCalls) {
        if (call.name === "search_celcomdigi_plans" && call.args && call.id) {
          const query = (call.args as any).query;
          if (typeof query === "string") {
            const result = await this.executeSearch(query);
            this.sendToolResponse(call.id, result);

            // Check for URL in result and trigger navigation
            if (
              result.results &&
              result.results.length > 0 &&
              result.results[0].url
            ) {
              this.onUrlReceived(result.results[0].url);
            }
          }
        }
      }
    }
  }

  stop() {
    this.isConnected = false;
    this.audioQueue = [];
    this.audioRecorder?.stop();
    this.audioPlayer?.stop();
    if (this.session) {
      this.session.close();
      this.session = null;
    }
  }

  private sendAudio(pcmData: ArrayBuffer) {
    // Queue audio if not connected yet or session is not ready
    if (!this.isConnected || !this.session) {
      this.audioQueue.push(pcmData);
      // Keep queue reasonable size (max 50 chunks)
      if (this.audioQueue.length > 50) {
        this.audioQueue.shift();
      }
      return;
    }

    try {
      const base64Audio = this.arrayBufferToBase64(pcmData);
      // Send realtime audio input
      this.session.sendRealtimeInput({
        audio: {
          data: base64Audio,
          mimeType: "audio/pcm;rate=24000",
        },
      });
    } catch (error: any) {
      console.error("Error sending audio:", error);

      // Handle WebSocket closed error
      if (error.message?.includes("CLOSING or CLOSED")) {
        console.warn("WebSocket connection lost, stopping recorder");
        this.isConnected = false;
        this.audioRecorder?.stop();
      } else {
        // Re-queue failed audio for other errors
        this.audioQueue.push(pcmData);
      }
    }
  }

  private flushAudioQueue() {
    if (this.audioQueue.length > 0) {
      console.log(`Flushing ${this.audioQueue.length} queued audio chunks`);
      const queue = [...this.audioQueue];
      this.audioQueue = [];

      // Send queued audio with slight delay between chunks
      queue.forEach((pcmData, index) => {
        setTimeout(() => {
          this.sendAudio(pcmData);
        }, index * 10); // 10ms delay between chunks
      });
    }
  }

  private async executeSearch(query: string) {
    try {
      const response = await fetch("/api/chat/retrieval", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      return await response.json();
    } catch (error) {
      console.error("Search failed:", error);
      return { error: "Failed to search" };
    }
  }

  private sendToolResponse(id: string, result: any) {
    if (this.session) {
      try {
        this.session.sendToolResponse({
          functionResponses: [
            {
              id: id,
              name: "search_celcomdigi_plans",
              response: {
                result: result,
              },
            },
          ],
        });
      } catch (error) {
        console.error("Error sending tool response:", error);
      }
    }
  }

  private arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  private base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }
}
