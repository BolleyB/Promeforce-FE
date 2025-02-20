// src/components/custom/chatinput.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send, Search } from "lucide-react";
import { fetchLiveScores, fetchUpcomingFixtures } from "@/api/sportsdb";

export interface ChatInputProps {
  onSubmit: (query: string) => Promise<void>;
  isLoading: boolean;
  isDeepSearch: boolean;
  onToggleDeepSearch: (checked: boolean) => void;
}

export function ChatInput({ onSubmit, isLoading, isDeepSearch, onToggleDeepSearch }: ChatInputProps) {
  const [input, setInput] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    if (input.toLowerCase().includes("live scores")) {
      const liveScores = await fetchLiveScores();
      await onSubmit(liveScores);
      setInput("");
      return;
    }

    if (input.toLowerCase().includes("upcoming fixtures") || input.toLowerCase().includes("next matches")) {
      const teamName = input.toLowerCase().replace("upcoming fixtures for", "").replace("next matches for", "").trim();
      const fixtures = await fetchUpcomingFixtures(teamName);
      await onSubmit(fixtures);
      setInput("");
      return;
    }

    await onSubmit(input);
    setInput("");
  };

  return (
    <div className="flex w-full gap-2">
      <form onSubmit={handleSubmit} className="flex w-full gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="w-full p-2 pr-28 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
            <Button
              id="deep-search"
              onClick={() => onToggleDeepSearch(!isDeepSearch)}
              className={`
                h-6 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1
                ${isDeepSearch ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
              `}
            >
              <Search size={12} className="inline-block" />
              <span>DeepSearch</span>
            </Button>
          </div>
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Sending..." : <Send size={16} />}
        </Button>
      </form>
    </div>
  );
}