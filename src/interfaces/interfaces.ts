export interface FixtureItem {
    title: string;
    snippet: string;
    link: string;
  }
  
  export interface message {
    content: string | FixtureItem[];
    role: "user" | "assistant";
    id: string;
  }