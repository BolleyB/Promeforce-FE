export interface SearchResult {
  title: string;
  snippet: string;
  link: string;
}

export type ChatbotResponse = string | SearchResult[];

const fetchChatbotResponse = async (query: string): Promise<ChatbotResponse> => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_CHATBOT_URL || "https://promeforce-backend-production.up.railway.app/query", {
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
    return data.response; // Ensure your backend returns the correct format.
  } catch (error) {
    console.error("Error fetching chatbot response:", error);
    return "An error occurred while fetching the response.";
  }
};

export default fetchChatbotResponse;
