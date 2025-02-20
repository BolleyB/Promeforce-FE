// src/api/chatbot.ts
export interface FixtureItem {
  title: string;
  snippet: string;
  link: string;
}

const fetchChatbotResponse = async (query: string, deepSearch: boolean = false, sessionId?: string): Promise<string | FixtureItem[]> => {
  try {
    const response = await fetch("https://promeforce-backend-production.up.railway.app/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Session-ID": sessionId || "", // Pass session ID in headers
      },
      body: JSON.stringify({ 
        query,
        top_k: 5,
        deep_search: deepSearch,
        session_id: sessionId, // Include session_id in body
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    const isFixtureItem = (item: any): item is FixtureItem => {
      return typeof item === 'object' && 
             'title' in item && 
             'snippet' in item && 
             'link' in item;
    };

    if (Array.isArray(data.response)) {
      if (data.response.every(isFixtureItem)) {
        return data.response;
      }
    }
    
    return data.response as string;
  } catch (error) {
    console.error("Error fetching chatbot response:", error);
    return "An error occurred while fetching the response.";
  }
};

export default fetchChatbotResponse;