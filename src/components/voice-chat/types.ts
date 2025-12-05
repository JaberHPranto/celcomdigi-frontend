export const HISTORY_CHIPS = [
  "What is the cheapest prepaid plan with unlimited calls?",
  "Does the SpeedSTREAM plan include Netflix?",
  "Can you tell me about the Home Fibre plan? ",
  "What roaming options do I have for my postpaid plan?",
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

export interface AssistantMessageContent {
  category: string;
  similarity: number;
  url?: string;
  targetUrl?: string;
  bestSection?: string | null;
  sectionIds?: string[];
  contentPlainText?: string;
  aiAnswer?: string;
}

export interface Message {
  role: "user" | "assistant";
  content: string | AssistantMessageContent;
}
