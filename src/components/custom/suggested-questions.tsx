// components/custom/suggested-questions.tsx
"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const questionSets = [
  [
    "What's the latest Premier League news?",
    "Show me today's football fixtures",
    "Which teams are playing tonight?"
  ],
  [
    "Who's leading the Champions League?",
    "What's the NBA schedule for tomorrow?",
    "Any recent cricket match results?"
  ],
  [
    "Show me upcoming tennis tournaments",
    "What are the latest transfer rumors?",
    "Who won the last Formula 1 race?"
  ]
];

interface SuggestedQuestionsProps {
  onSubmit: (question: string) => void;
}

export function SuggestedQuestions({ onSubmit }: SuggestedQuestionsProps) {
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

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

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key={currentSetIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8"
          >
            {questionSets[currentSetIndex].map((question) => (
              <button
                key={question}
                onClick={() => onSubmit(question)}
                className="text-left p-3 rounded-lg border hover:bg-accent transition-colors duration-200 text-sm"
              >
                {question}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}