export interface FixtureItem {
  title: string;
  snippet: string;
  link: string;
}

const fetchChatbotResponse = async (query: string): Promise<string | FixtureItem[]> => {
  try {
    const response = await fetch("https://promeforce-backend-production.up.railway.app/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Add explicit type guard
    const isFixtureItem = (item: any): item is FixtureItem => {
      return typeof item === 'object' && 
             'title' in item && 
             'snippet' in item && 
             'link' in item;
    };

    if (Array.isArray(data.response) && data.response.every(isFixtureItem)) {
      return data.response;
    }
    
    return data.response as string;
  } catch (error) {
    console.error("Error fetching chatbot response:", error);
    return "An error occurred while fetching the response.";
  }
};

export default fetchChatbotResponse;