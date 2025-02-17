// src/components/custom/message.tsx

import { motion } from "framer-motion";
import { cx } from "classix";
import { SparklesIcon } from "./icons";
import { Markdown } from "./markdown";
import { MessageActions } from "@/components/custom/actions";
import Link from "next/link";

// Define a local ChatMessage interface to avoid naming conflicts
export interface ChatMessage {
  content: string | any[];
  role: "user" | "assistant";
  id: string;
}

interface MessageProps {
  message: ChatMessage;
}

export const PreviewMessage = ({ message }: MessageProps) => {
  const isSearchResults = Array.isArray(message.content);

  return (
    <motion.div
      className="w-full mx-auto max-w-3xl px-4 group/message"
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      data-role={message.role}
    >
      <div
        className={cx(
          "flex gap-4 px-3 py-2 rounded-xl",
          message.role === "user"
            ? "bg-zinc-700 text-white ml-auto max-w-2xl"
            : "bg-muted"
        )}
      >
        {message.role === "assistant" && (
          <div className="w-8 h-8 flex items-center justify-center rounded-full ring-1 ring-border shrink-0">
            <SparklesIcon size={14} />
          </div>
        )}
        <div className="flex flex-col w-full">
          {message.content && (
            <div className="flex flex-col gap-4 text-left">
              {isSearchResults ? (
                <div className="space-y-4">
                  {(message.content as any[]).map((result, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 bg-white dark:bg-zinc-800"
                    >
                      <Link
                        href={result.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        <h3 className="font-semibold text-lg">{result.title}</h3>
                      </Link>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                        {result.snippet}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <Markdown>{message.content as string}</Markdown>
              )}
            </div>
          )}

          {message.role === "assistant" && (
            <MessageActions message={message as ChatMessage} />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const ThinkingMessage = () => {
  const role = "assistant";
  return (
    <motion.div
      className="w-full mx-auto max-w-3xl px-4 group/message"
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
      data-role={role}
    >
      <div className="flex gap-4 px-3 py-2 rounded-xl bg-muted">
        <div className="w-8 h-8 flex items-center justify-center rounded-full ring-1 ring-border shrink-0">
          <SparklesIcon size={14} />
        </div>
      </div>
    </motion.div>
  );
};

export const SearchResultsMessage = ({ results }: { results: any[] }) => {
  return (
    <motion.div
      className="w-full mx-auto max-w-3xl px-4 group/message"
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      data-role="assistant"
    >
      <div className="flex gap-4 px-3 py-2 rounded-xl bg-muted">
        <div className="w-8 h-8 flex items-center justify-center rounded-full ring-1 ring-border shrink-0">
          <SparklesIcon size={14} />
        </div>
        <div className="flex flex-col w-full">
          <div className="space-y-4">
            {results.map((result, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 bg-white dark:bg-zinc-800"
              >
                <Link
                  href={result.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <h3 className="font-semibold text-lg">{result.title}</h3>
                </Link>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  {result.snippet}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
