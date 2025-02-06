import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react"; // Assuming you have a Send icon
import { fetchLiveScores, fetchUpcomingFixtures } from "@/api/sportsdb"; // Import your sports API functions

interface ChatInputProps {
  onSubmit: (query: string) => Promise<void>;
  isLoading: boolean;
}

// Pre-made suggested actions
const suggestedActions = [
  {
    title: "What Arsenal fixtures",
    label: "are on this weekend?",
    action: "What matches are happening in the English Premier League?",
  },
  {
    title: "Can you tell me about",
    label: "SponsorForce's company?",
    action: "Can you tell me about SponsorForce's company?",
  },
];

export function ChatInput({ onSubmit, isLoading }: ChatInputProps) {
  const [input, setInput] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return; // Prevent empty submissions or multiple submissions while loading

    // Handle sports-related queries
    if (input.toLowerCase().includes("live scores")) {
      const liveScores = await fetchLiveScores();
      await onSubmit(liveScores); // Display live scores
      setInput(""); // Clear the input after submission
      setShowSuggestions(false); // Hide suggestions after submission
      return;
    }

    if (input.toLowerCase().includes("upcoming fixtures") || input.toLowerCase().includes("next matches")) {
      const teamName = input.toLowerCase().replace("upcoming fixtures for", "").replace("next matches for", "").trim();
      const fixtures = await fetchUpcomingFixtures(teamName);
      await onSubmit(fixtures); // Display upcoming fixtures
      setInput(""); // Clear the input after submission
      setShowSuggestions(false); // Hide suggestions after submission
      return;
    }

    // Handle general queries
    await onSubmit(input); // Call the onSubmit prop (which will call fetchChatbotResponse)
    setInput(""); // Clear the input after submission
    setShowSuggestions(false); // Hide suggestions after submission
  };

  const handleSuggestionClick = (action: string) => {
    onSubmit(action); // Submit the suggested action
    setShowSuggestions(false); // Hide suggestions after clicking
  };

  return (
    <div className="flex flex-col w-full gap-2">
      {/* Suggested Actions */}
      {showSuggestions && (
        <div className="grid grid-cols-2 gap-2 w-full max-w-full overflow-hidden">
          {suggestedActions.map((suggestedAction, index) => (
            <Button
              key={index}
              variant="ghost"
              onClick={() => handleSuggestionClick(suggestedAction.action)}
              className="text-left border rounded-xl px-4 py-3.5 text-sm flex flex-col w-full h-auto justify-start items-start overflow-hidden"
            >
              <span className="font-medium whitespace-normal break-words">
                {suggestedAction.title}
              </span>
              <span className="text-muted-foreground whitespace-normal break-words">
                {suggestedAction.label}
              </span>
            </Button>
          ))}
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex w-full gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading} // Disable input while loading
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Sending..." : <Send size={16} />}
        </Button>
      </form>
    </div>
  );
}