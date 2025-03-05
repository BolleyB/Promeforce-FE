// src/components/custom/suggested-questions.tsx
"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const questionSets = [
  [
    "What are the top Premier League headlines from the last 24 hours?",
    "List all football fixtures scheduled for today, March 4, 2025, with times and leagues.",
    "Which football teams are playing matches tonight, March 4, 2025, and at what times?"
  ],
  [
    "What are the current UEFA Champions League standings as of March 4, 2025, including points and top 10 teams?",
    "What’s the full NBA game schedule for tomorrow, March 5, 2025, with teams and tip-off times?",
    "What are the results of cricket matches completed in the last 7 days as of March 4, 2025?"
  ],
  [
    "List all tennis tournaments starting within the next 30 days from March 4, 2025, with dates and locations.",
    "What are the latest football transfer rumors reported in the last 48 hours as of March 4, 2025?",
    "Who won the most recent Formula 1 race before March 4, 2025, and on what date?"
  ]
];

interface SuggestedQuestionsProps {
  onSubmit: (question: string) => Promise<void>;
}

export function SuggestedQuestions({ onSubmit }: SuggestedQuestionsProps) {
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const cycleQuestions = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentSetIndex(prev => (prev + 1) % questionSets.length);
        setIsVisible(true);
      }, 500);
    }, 10000);

    return () => clearInterval(cycleQuestions);
  }, []);

  const handleClick = async (question: string) => {
    setLoadingStates(prev => ({ ...prev, [question]: true }));
    try {
      await onSubmit(question);
    } finally {
      setLoadingStates(prev => ({ ...prev, [question]: false }));
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key={currentSetIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8"
          >
            {questionSets[currentSetIndex].map((question) => (
              <button
                key={question}
                onClick={() => handleClick(question)}
                disabled={loadingStates[question]}
                className={`
                  text-left p-3 rounded-lg border hover:bg-accent transition-colors duration-200 text-sm
                  ${loadingStates[question] ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                {loadingStates[question] ? "Loading..." : question}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}