// src/components/custom/chat.tsx
"use client";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Header } from "@/components/custom/header";
import { Overview } from "@/components/custom/overview";
import { ChatInput } from "@/components/custom/chatinput";
import { PreviewMessage, ThinkingMessage } from "@/components/custom/message";
import { useScrollToBottom } from "@/components/custom/use-scroll-to-bottom";
import { Button } from "@/components/ui/button";
import { Message, Conversation } from "@/interfaces/interfaces";
import fetchChatbotResponse from "@/api/chatbot";
import { Plus, Trash2, Menu, X } from "lucide-react"; // Removed ReactMarkdown

export function Chat() {
  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeepSearch, setIsDeepSearch] = useState<boolean>(false);
  const [sessionId] = useState<string>(uuidv4());
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(true);
  const [messages, setMessages] = useState<Message[]>([]);

  const [conversationState, setConversationState] = useState<{
    activeConversationId: string;
    conversations: Conversation[];
  }>({
    activeConversationId: "",
    conversations: [],
  });

  useEffect(() => {
    const saved = localStorage.getItem("conversations") || "";
    if (saved) {
      setConversationState((prev) => ({
        ...prev,
        conversations: JSON.parse(saved) as Conversation[],
      }));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "conversations",
      JSON.stringify(conversationState.conversations),
    );
  }, [conversationState.conversations]);

  useEffect(() => {
    setMessages(
      conversationState.conversations.find(
        (c) => c.id === conversationState.activeConversationId,
      )?.messages || [],
    );
  }, [conversationState]);

  const createNewConversation = () => {
    const newConversation: Conversation = {
      id: uuidv4(),
      title: "New Chat",
      timestamp: Date.now(),
      messages: [],
    };

    console.log("Creating a new conversation", {
      newConversation,
    });
    setConversationState((prev) => ({
      ...prev,
      activeConversationId: newConversation.id,
      conversations: [newConversation, ...prev.conversations],
    }));
  };

  const deleteConversation = (conversationId: string) => {
    setConversationState((prev) => ({
      ...prev,
      conversations: prev.conversations.filter((c) => c.id !== conversationId),
      activeConversationId:
        conversationState.activeConversationId === conversationId
          ? ""
          : prev.activeConversationId,
    }));
  };

  const updateConversationMessages = (
    newMessages: Message[],
    conversationId: string,
  ) => {
    setConversationState((prev) => ({
      ...prev,
      conversations: prev.conversations.map((conv) => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            messages: newMessages,
            title:
              typeof newMessages?.[0].content === "string"
                ? newMessages[0].content.substring(0, 50)
                : "New Chat",
          };
        }
        return conv;
      }),
    }));
  };

  const handleSubmit = async (query: string) => {
    if (!query.trim() || isLoading) return;

    let currentActiveId = conversationState.activeConversationId;

    if (!conversationState.activeConversationId) {
      const newConversation: Conversation = {
        id: uuidv4(),
        title: "New Chat",
        timestamp: Date.now(),
        messages: [],
      };

      currentActiveId = newConversation.id;

      // Update state with new conversation
      setConversationState((prev) => ({
        activeConversationId: currentActiveId,
        conversations: [newConversation, ...prev.conversations],
      }));
    }

    setIsLoading(true);
    const userMessageId = uuidv4();
    const newMessages: Message[] = [
      ...messages,
      {
        content: query,
        role: "user",
        id: userMessageId,
      },
    ];

    updateConversationMessages(newMessages, currentActiveId);

    try {
      const response = await fetchChatbotResponse(
        query,
        isDeepSearch,
        sessionId,
      );

      const chatbotMessageId = uuidv4();
      const updatedMessages: Message[] = [
        ...newMessages,
        {
          content: response,
          role: "assistant",
          id: chatbotMessageId,
        },
      ];
      updateConversationMessages(updatedMessages, currentActiveId);
    } catch (error) {
      console.error("Error:", error);
      const errorMessageId = uuidv4();
      const errorMessages: Message[] = [
        ...newMessages,
        {
          content: "An error occurred while fetching the response.",
          role: "assistant",
          id: errorMessageId,
        },
      ];
      updateConversationMessages(errorMessages, currentActiveId);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  return (
    <div className="flex h-dvh bg-background">
      {/* Conversation History Sidebar */}
      <div
        className={`border-r flex flex-col flex-shrink-0 transition-all duration-300 ${
          isSidebarVisible ? "w-64" : "w-0"
        } overflow-hidden`}
      >
        <div className="p-2 border-b">
          <Button onClick={createNewConversation} className="w-full">
            <Plus size={16} className="mr-2" />
            New Chat
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversationState.conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`flex items-center justify-between p-2 hover:bg-accent cursor-pointer ${
                conversationState.activeConversationId === conversation.id
                  ? "bg-accent"
                  : ""
              }`}
              onClick={() => {
                setConversationState((prev) => ({
                  ...prev,
                  activeConversationId: conversation.id,
                }));
              }}
            >
              <span className="truncate text-sm">{conversation.title}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 hover:bg-red-100/50"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteConversation(conversation.id);
                }}
              >
                <Trash2 size={14} className="text-red-500" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex items-center p-2 border-b">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="mr-2"
          >
            {isSidebarVisible ? <X size={20} /> : <Menu size={20} />}
          </Button>
          <Header />
        </div>
        <div
          className="flex flex-col min-w-0 gap-6 flex-1 overflow-y-scroll pt-4"
          ref={messagesContainerRef}
        >
          {messages.length === 0 ? (
            <Overview onSubmit={handleSubmit} />
          ) : (
            <>
              {messages.map((message) => (
                <PreviewMessage key={message.id} message={message} />
              ))}
              {isLoading && <ThinkingMessage />}
            </>
          )}
          <div
            ref={messagesEndRef}
            className="shrink-0 min-w-[24px] min-h-[24px]"
          />
        </div>
        <div className="flex mx-auto px-4 bg-background pb-4 md:pb-6 gap-2 w-full md:max-w-3xl items-center">
          <ChatInput
            onSubmit={handleSubmit}
            isLoading={isLoading}
            isDeepSearch={isDeepSearch}
            onToggleDeepSearch={setIsDeepSearch}
          />
        </div>
      </div>
    </div>
  );
}
