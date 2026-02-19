import { useState, useCallback } from "react";
import { sendChatMessage } from "../services/Chatservice";
import { IMessage } from "src/domain/models/interfaces/Ichat";

const AI_LIMIT = 10;

interface UseChatProps {
  initialUsage: number;
}

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
      setMessages((prev) => [...prev, userMsg]);
      setLoading(true);
      setError(null);

      try {
        const data = await sendChatMessage(trimmed);
        const aiMsg: IMessage = { role: "assistant", content: data.reply };
        setMessages((prev) => [...prev, aiMsg]);
        setUsedMessages((prev) => prev + 1);
      } catch (err: any) {
        const status = err?.response?.status;
        const message = err?.response?.data?.error;

        if (status === 403) {
          setUsedMessages(AI_LIMIT);
          setError(message ?? "הגעת למגבלת ההודעות.");
        } else {
          setError(message ?? "שגיאה בלתי צפויה, נסה שוב.");
        }
      } finally {
        setLoading(false);
      }
    },
    [loading, remaining]
  );

  return { messages, loading, error, usedMessages, remaining, sendMessage };
};