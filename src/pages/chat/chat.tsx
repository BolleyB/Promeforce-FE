// src/components/Chat.tsx

import { useState } from "react";
import { PreviewMessage, ThinkingMessage, SearchResultsMessage } from "@/components/custom/message";
import { useScrollToBottom } from "@/components/custom/use-scroll-to-bottom";
import { Overview } from "@/components/custom/overview";
import { Header } from "@/components/custom/header";
import { v4 as uuidv4 } from "uuid";
import fetchChatbotResponse from "@/api/chatbot"; // Your function for general queries
import { ChatInput } from "@/components/custom/chatinput";
// If you have sports functions, import them (or remove if not used)
// import { fetchLiveScores, fetchUpcomingFixtures, fetchLeagueMatches } from "@/api/sportsdb";

interface SearchResult {
  title: string;
  snippet: string;
  link: string;
}

interface Message {
  content: string | SearchResult[];
  role: "user" | "assistant";
  id: string;
  type?: "text" | "searchResults";
}

export function Chat() {
  const [messagesContainerRef, messagesEndRef] = useScrollToBottom<HTMLDivElement>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (query: string) => {
    if (!query.trim() || isLoading) return;

    setIsLoading(true);

    // Add user's message
    const userMessageId = uuidv4();
    setMessages((prev) => [
      ...prev,
      { content: query, role: "user", id: userMessageId, type: "text" }
    ]);

    try {
      let chatbotResponse: string | SearchResult[];

      // Example sports query handling – adjust or remove if you use a different API
      const queryLower = query.toLowerCase();
      if (
        queryLower.includes("live scores") ||
        queryLower.includes("fixture") ||
        queryLower.includes("match") ||
        queryLower.includes("score") ||
        queryLower.includes("result")
      ) {
        // Here you can call your sports search function if desired.
        // For now, we'll use the general fetchChatbotResponse to simulate a search response.
        chatbotResponse = await fetchChatbotResponse(query);
      } else {
        // Handle general queries
        chatbotResponse = await fetchChatbotResponse(query);
      }

      // Add chatbot's response to the chat
      const chatbotMessageId = uuidv4();
      setMessages((prev) => [
        ...prev,
        {
          content: chatbotResponse,
          role: "assistant",
          id: chatbotMessageId,
          type: Array.isArray(chatbotResponse) ? "searchResults" : "text"
        }
      ]);
    } catch (error) {
      console.error("Error fetching response:", error);
      const errorMessageId = uuidv4();
      setMessages((prev) => [
        ...prev,
        {
          content: "An error occurred while fetching the response.",
          role: "assistant",
          id: errorMessageId,
          type: "text"
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-w-0 h-dvh bg-background">
      <Header />
      <div
        className="flex flex-col min-w-0 gap-6 flex-1 overflow-y-scroll pt-4"
        ref={messagesContainerRef}
      >
        {messages.length === 0 && <Overview />}
        {messages.map((message) =>
          message.type === "searchResults" ? (
            <SearchResultsMessage
              key={message.id}
              results={message.content as SearchResult[]}
            />
          ) : (
            <PreviewMessage
              key={message.id}
              message={{ ...message, content: message.content as string }}
            />
          )
        )}
        {isLoading && <ThinkingMessage />}
        <div ref={messagesEndRef} className="shrink-0 min-w-[24px] min-h-[24px]" />
      </div>
      <div className="flex mx-auto px-4 bg-background pb-4 md:pb-6 gap-2 w-full md:max-w-3xl">
        <ChatInput onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
}
