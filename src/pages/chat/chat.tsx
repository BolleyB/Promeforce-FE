import { useState } from "react";
import { PreviewMessage, ThinkingMessage } from "../../components/custom/message";
import { useScrollToBottom } from '@/components/custom/use-scroll-to-bottom';
import { Overview } from "@/components/custom/overview";
import { Header } from "@/components/custom/header";
import { v4 as uuidv4 } from 'uuid';
import fetchChatbotResponse from "@/api/chatbot"; // Import your fetchChatbotResponse function
import { ChatInput } from "@/components/custom/chatinput"; // Import the updated ChatInput component
import { fetchLiveScores, fetchUpcomingFixtures, fetchLeagueMatches } from "@/api/sportsdb"; // Import sports API functions

interface Message {
  content: string;
  role: "user" | "assistant";
  id: string;
}

export function Chat() {
  const [messagesContainerRef, messagesEndRef] = useScrollToBottom<HTMLDivElement>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (query: string) => {
    if (!query.trim() || isLoading) return; // Prevent empty submissions or multiple submissions while loading

    setIsLoading(true);

    // Add the user's message to the chat
    const userMessageId = uuidv4();
    setMessages((prev) => [...prev, { content: query, role: "user", id: userMessageId }]);

    try {
      let chatbotResponse: string;

      // Handle sports-related queries
      if (query.toLowerCase().includes("live scores")) {
        chatbotResponse = await fetchLiveScores();
      } else if (query.toLowerCase().includes("upcoming fixtures") || query.toLowerCase().includes("next matches")) {
        const teamName = query.toLowerCase().replace("upcoming fixtures for", "").replace("next matches for", "").trim();
        chatbotResponse = await fetchUpcomingFixtures(teamName);
      } else if (query.toLowerCase().includes("english premier league") || query.toLowerCase().includes("premier league")) {
        chatbotResponse = await fetchLeagueMatches("English Premier League");
      } else {
        // Handle general queries
        chatbotResponse = await fetchChatbotResponse(query);
      }

      // Add the chatbot's response to the chat
      const chatbotMessageId = uuidv4();
      setMessages((prev) => [...prev, { content: chatbotResponse, role: "assistant", id: chatbotMessageId }]);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      // Add an error message to the chat
      const errorMessageId = uuidv4();
      setMessages((prev) => [...prev, { content: "An error occurred while fetching the response.", role: "assistant", id: errorMessageId }]);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex flex-col min-w-0 h-dvh bg-background">
      <Header />
      <div className="flex flex-col min-w-0 gap-6 flex-1 overflow-y-scroll pt-4" ref={messagesContainerRef}>
        {messages.length === 0 && <Overview />}
        {messages.map((message) => (
          <PreviewMessage key={message.id} message={message} />
        ))}
        {isLoading && <ThinkingMessage />}
        <div ref={messagesEndRef} className="shrink-0 min-w-[24px] min-h-[24px]" />
      </div>
      <div className="flex mx-auto px-4 bg-background pb-4 md:pb-6 gap-2 w-full md:max-w-3xl">
        <ChatInput onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
}