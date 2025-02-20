// src/components/custom/message.tsx
import { motion } from "framer-motion";
import { cx } from "classix";
import { SparklesIcon } from "./icons";
import { Markdown } from "./markdown";
import { Message, FixtureItem, BackendResponse } from "../../interfaces/interfaces"; // Import BackendResponse
import { MessageActions } from "@/components/custom/actions";

export const PreviewMessage = ({ message }: { message: Message }) => {
  // Type guard for FixtureItem array
  const isFixtureItemArray = (content: Message["content"]): content is FixtureItem[] => {
    return Array.isArray(content) && content.every(item => 
      typeof item === 'object' && 
      'title' in item && 
      'snippet' in item && 
      'link' in item
    );
  };

  // Type guard for BackendResponse
  const isBackendResponse = (content: Message["content"]): content is BackendResponse => {
    return typeof content === 'object' && 
           content !== null && 
           'response' in content && 
           typeof (content as any).response === 'string' && 
           'sources' in content && 
           Array.isArray((content as any).sources);
  };

  return (
    <motion.div
      className="w-full mx-auto max-w-3xl px-4 group/message"
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      data-role={message.role}
    >
      <div
        className={cx(
          "group-data-[role=user]/message:bg-zinc-700 dark:group-data-[role=user]/message:bg-muted",
          "group-data-[role=user]/message:text-white flex gap-4 group-data-[role=user]/message:px-3",
          "w-full group-data-[role=user]/message:w-fit group-data-[role=user]/message:ml-auto",
          "group-data-[role=user]/message:max-w-2xl group-data-[role=user]/message:py-2 rounded-xl"
        )}
      >
        {message.role === "assistant" && (
          <div className="size-8 flex items-center rounded-full justify-center ring-1 shrink-0 ring-border">
            <SparklesIcon size={14} />
          </div>
        )}

        <div className="flex flex-col w-full">
          <div className="flex flex-col gap-4 text-left">
            {typeof message.content === 'string' ? (
              <Markdown>{message.content}</Markdown>
            ) : isFixtureItemArray(message.content) ? (
              message.content.map((item: FixtureItem, index: number) => (
                <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="space-y-2 block"
                  >
                    <h3 className="font-semibold text-blue-600 dark:text-blue-400">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {item.snippet}
                    </p>
                    <span className="text-sm text-blue-500 hover:underline dark:text-blue-400">
                      View Details →
                    </span>
                  </a>
                </div>
              ))
            ) : isBackendResponse(message.content) ? (
              <div>
                <Markdown>{message.content.response}</Markdown>
                {message.content.sources.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold">Sources:</h4>
                    <ul className="list-disc pl-5">
                      {message.content.sources.map((source: { title: string; link: string }, index: number) => (
                        <li key={index}>
                          <a
                            href={source.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            {source.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <Markdown>Invalid response format</Markdown>
            )}
          </div>

          {message.role === "assistant" && <MessageActions message={message} />}
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
      <div
        className={cx(
          "flex gap-4 group-data-[role=user]/message:px-3 w-full",
          "group-data-[role=user]/message:w-fit group-data-[role=user]/message:ml-auto",
          "group-data-[role=user]/message:max-w-2xl group-data-[role=user]/message:py-2 rounded-xl",
          "group-data-[role=user]/message:bg-muted"
        )}
      >
        <div className="size-8 flex items-center rounded-full justify-center ring-1 shrink-0 ring-border">
          <SparklesIcon size={14} />
        </div>
        <span>Thinking...</span>
      </div>
    </motion.div>
  );
};