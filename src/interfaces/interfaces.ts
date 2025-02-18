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