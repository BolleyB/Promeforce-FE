import { useState } from "react";
import { PreviewMessage, ThinkingMessage } from "../../components/custom/message";
import { useScrollToBottom } from '@/components/custom/use-scroll-to-bottom';
import { Overview } from "@/components/custom/overview";
import { Header } from "@/components/custom/header";
import { v4 as uuidv4 } from 'uuid';
import fetchChatbotResponse from "@/api/chatbot";
import { ChatInput } from "@/components/custom/chatinput";
import { FixtureItem, message } from "@/interfaces/interfaces";

export function Chat() {
  const [messagesContainerRef, messagesEndRef] = useScrollToBottom<HTMLDivElement>();
  const [messages, setMessages] = useState<message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (query: string) => {
    if (!query.trim() || isLoading) return;

    setIsLoading(true);
    const userMessageId = uuidv4();
    setMessages((prev) => [...prev, { content: query, role: "user", id: userMessageId }]);

    try {
      const response = await fetchChatbotResponse(query);
      
      const chatbotMessageId = uuidv4();
      setMessages((prev) => [...prev, {
        content: response,
        role: "assistant",
        id: chatbotMessageId
      }]);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      const errorMessageId = uuidv4();
      setMessages((prev) => [...prev, { 
        content: "An error occurred while fetching the response.", 
        role: "assistant", 
        id: errorMessageId 
      }]);
    } finally {
      setIsLoading(false);
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