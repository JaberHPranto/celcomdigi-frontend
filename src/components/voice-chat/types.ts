export const HISTORY_CHIPS = [
  "What prepaid datasim plan available?",
  "What 5G plans are available?",
  "How much does roaming cost?",
  "Can you tell me about the Home Fibre plan? ",
];

export interface VoiceInterfaceProps {
  onSwitchToChat: () => void;
  onClose: () => void;
  isListening: boolean;
  onToggleListening: () => void;
  onStartCapture: () => void;
  onClearCapture: () => void;
  capturedImage: string | null;
  error: string | null;
  volume?: number;
  caption?: string;
  userCaption?: string;
  aiCaption?: string;
  toolAction?: { action: string; data: any } | null;
}

export interface ChatInterfaceProps {
  onBack: () => void;
  onClose: () => void;
}

export interface Message {
  role: "user" | "assistant";
  content: any;
}
