import { AudioRecorder, AudioPlayer } from "./audio-streamer";

type ToolCall = {
  functionCalls: {
    name: string;
    id: string;
    args: any;
  }[];
};

type ServerMessage = {
  serverContent?: {
    modelTurn?: {
      parts: {
        text?: string;
        inlineData?: {
          mimeType: string;
          data: string;
        };
      }[];
    };
    turnComplete?: boolean;
  };
  toolCall?: ToolCall;
};

export class GeminiLiveClient {
  private ws: WebSocket | null = null;
  private audioRecorder: AudioRecorder | null = null;
  private audioPlayer: AudioPlayer | null = null;
  private apiKey: string;
  private onTextReceived: (text: string) => void;
  private onUrlReceived: (url: string) => void;

  private onVolumeChange: ((volume: number) => void) | null = null;

  constructor(
    apiKey: string,
    onTextReceived: (text: string) => void,
    onUrlReceived: (url: string) => void,
    onVolumeChange?: (volume: number) => void
  ) {
    this.apiKey = apiKey;
    this.onTextReceived = onTextReceived;
    this.onUrlReceived = onUrlReceived;
    this.onVolumeChange = onVolumeChange || null;

    this.audioPlayer = new AudioPlayer(24000, (vol) => {
      this.onVolumeChange?.(vol);
    });
    this.audioRecorder = new AudioRecorder(this.sendAudio.bind(this), (vol) => {
      this.onVolumeChange?.(vol);
    });
  }

  async connect() {
    const url = `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent?key=${this.apiKey}`;
    this.ws = new WebSocket(url);

    this.ws.onopen = () => {
      console.log("Connected to Gemini Live");
      this.sendSetup();
      this.audioRecorder?.start();
    };

    this.ws.onmessage = async (event) => {
      let data;
      if (event.data instanceof Blob) {
        data = JSON.parse(await event.data.text());
      } else {
        data = JSON.parse(event.data as string);
      }
      this.handleMessage(data);
    };

    this.ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    this.ws.onclose = () => {
      console.log("Disconnected from Gemini Live");
      this.stop();
    };
  }

  stop() {
    this.audioRecorder?.stop();
    this.audioPlayer?.stop();
    this.ws?.close();
  }

  private sendSetup() {
    const setupMessage = {
      setup: {
        model: "models/gemini-2.0-flash-exp",
        generationConfig: {
          responseModalities: ["AUDIO"],
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
                  type: "OBJECT",
                  properties: {
                    query: {
                      type: "STRING",
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
    };
    this.ws?.send(JSON.stringify(setupMessage));
  }

  private sendAudio(pcmData: ArrayBuffer) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      const base64Audio = this.arrayBufferToBase64(pcmData);
      const message = {
        realtimeInput: {
          mediaChunks: [
            {
              mimeType: "audio/pcm;rate=24000",
              data: base64Audio,
            },
          ],
        },
      };
      this.ws.send(JSON.stringify(message));
    }
  }

  private async handleMessage(message: ServerMessage) {
    if (message.serverContent) {
      const parts = message.serverContent.modelTurn?.parts || [];
      for (const part of parts) {
        if (part.text) {
          this.onTextReceived(part.text);
        }
        if (part.inlineData && part.inlineData.mimeType.startsWith("audio/")) {
          const audioData = this.base64ToArrayBuffer(part.inlineData.data);
          this.audioPlayer?.play(audioData);
        }
      }
    }

    if (message.toolCall) {
      const functionCalls = message.toolCall.functionCalls;
      for (const call of functionCalls) {
        if (call.name === "search_celcomdigi_plans") {
          const result = await this.executeSearch(call.args.query);
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
    const message = {
      toolResponse: {
        functionResponses: [
          {
            id: id,
            name: "search_celcomdigi_plans",
            response: {
              result: result,
            },
          },
        ],
      },
    };
    this.ws?.send(JSON.stringify(message));
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
