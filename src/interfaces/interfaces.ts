// src/interfaces/interfaces.ts
export interface FixtureItem {
  title: string;
  snippet: string;
  link: string;
}

export interface BackendResponse {
  response: string;
  sources: { title: string; link: string }[];
}

export interface Message {
  content: string | FixtureItem[] | BackendResponse; // Updated to include BackendResponse
  role: "user" | "assistant";
  id: string;
}

export interface Conversation {
  id: string;
  title: string;
  timestamp: number;
  messages: Message[];
}

export interface ChatInputProps {
  onSubmit: (query: string) => Promise<void>;
  isLoading: boolean;
  isDeepSearch: boolean;
  onToggleDeepSearch: (checked: boolean) => void;
}