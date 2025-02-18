import { motion } from "framer-motion";
import { cx } from "classix";
import { SparklesIcon } from "./icons";
import { Markdown } from "./markdown";
import { message, FixtureItem } from "../../interfaces/interfaces";
import { MessageActions } from "@/components/custom/actions";

export const PreviewMessage = ({ message }: { message: message }) => {
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
            ) : Array.isArray(message.content) ? (
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
      </div>
    </motion.div>
  );
};