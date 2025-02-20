// src/components/custom/overview.tsx
import { motion } from 'framer-motion';
import { MessageCircle, BotIcon } from 'lucide-react';
import { SuggestedQuestions } from "./suggested-questions";

interface OverviewProps {
  onSubmit: (question: string) => Promise<void>; // Updated to Promise<void>
}

export const Overview = ({ onSubmit }: OverviewProps) => {
  return (
    <motion.div
      key="overview"
      className="max-w-3xl mx-auto md:mt-20"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: 0.75 }}
    >
      <div className="rounded-xl p-6 flex flex-col gap-8 leading-relaxed text-center max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-row justify-center gap-4 items-center"
        >
          <BotIcon size={44} />
          <span>+</span>
          <MessageCircle size={44} />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="mb-8">
            Welcome to <strong>Prome-Force</strong><br />
            Your Go-To AI-Assistant for<br />
            <strong>Sponsorship</strong> and <strong>Business</strong>.
          </p>
          
          <h3 className="text-lg font-medium mb-4">
            Get started with a question:
          </h3>
          
          <SuggestedQuestions onSubmit={onSubmit} />
        </motion.div>
      </div>
    </motion.div>
  );
};