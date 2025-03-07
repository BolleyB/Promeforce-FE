// src/components/custom/suggested-questions.tsx
"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const questionSets = [
  // Set 1: Event-Based Activation Ideas
  [
    "What are the latest event-based activation ideas for sponsorship deals from the last 30 days?",
    "List all innovative stadium activation ideas for sponsorship deals scheduled for this month’s events?",
    "Which sponsorship activation ideas are trending for live sports events currently?"
  ],
  // Set 2: Digital and Social Media Activation Ideas
  [
    "What are the current digital activation ideas for sponsorship deals, including platforms?",
    "What’s the full list of mobile-based activation ideas for sponsorship deals launched in the last 7 days?",
    "What are the results of social media campaigns as sponsorship activations completed in the last 14 days?"
  ],
  // Set 3: Creative Collaboration and Mixed Activation Ideas
  [
    "What are the latest collaborative activation ideas for sponsorship deals within the next 30 days?",
    "What are the latest transfer rumors impacting sponsorship activations reported in the last 48 hours?",
    "Who provided the most recent sponsorship activation ideas, and what were they?"
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