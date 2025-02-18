export interface FixtureItem {
    title: string;
    snippet: string;
    link: string;
  }
  
  export interface Message {
    content: string | FixtureItem[];
    role: "user" | "assistant";
    id: string;
  }

  export interface Conversation {
    id: string;
    title: string;
    timestamp: number;
    messages: Message[];
  }