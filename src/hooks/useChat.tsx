import { useState, useCallback } from "react";
import { sendChatMessage } from "../services/chatService";
import { IMessage } from "src/domain/models/interfaces/IChat";
import { UseChatProps } from "../domain/models/interfaces/IUseChatProps";

const AI_LIMIT = 10;

export const useChat = ({ initialUsage }: UseChatProps) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usedMessages, setUsedMessages] = useState(initialUsage);

  const remaining = AI_LIMIT - usedMessages;

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading || remaining <= 0) return;

      const userMsg: IMessage = { role: "user", content: trimmed };

      setMessages((prev) => {
        const updated = [...prev, userMsg];

        (async () => {
          setLoading(true);
          setError(null);
          try {
            const data = await sendChatMessage(trimmed, prev);
            const aiMsg: IMessage = { role: "assistant", content: data.reply };
            setMessages((current) => [...current, aiMsg]);
            setUsedMessages((count) => count + 1);
          } catch (err: any) {
            const status = err?.response?.status;
            const message = err?.response?.data?.error;
            if (status === 403) {
              setUsedMessages(AI_LIMIT);
              setError(message ?? "You've reached the message limit.");
            } else {
              setError(message ?? "Unexpected error, please try again.");
            }
          } finally {
            setLoading(false);
          }
        })();

        return updated;
      });
    },
    [loading, remaining]
  );

  return { messages, loading, error, usedMessages, remaining, sendMessage };
};
