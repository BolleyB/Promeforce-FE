const fetchChatbotResponse = async (query: string): Promise<string> => {
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

    const data: { response: string } = await response.json();
    return data.response;
  } catch (error) {
    console.error("Error fetching chatbot response:", error);
    return "An error occurred while fetching the response.";
  }
};

export default fetchChatbotResponse;
