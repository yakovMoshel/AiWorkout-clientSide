import { useState } from "react";
import { useChat } from "../hooks/useChat";
import { ChatHeader } from "../components/organisms/ChatHeader";
import { ChatMessageList } from "../components/organisms/ChatMessageList";
import { ChatFooter } from "../components/organisms/ChatFooter";
import styles from "../../src/styles/AiChatPage.module.css";
import { useAuth } from "src/store/auth-context";

export const AiChatPage = () => {
  const { user } = useAuth();
  const [input, setInput] = useState("");

  const { messages, loading, error, usedMessages, remaining, sendMessage } = useChat({
    initialUsage: user?.aiUsage ?? 0,
  });

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  };

  return (
    <div className={styles.page}>
      <ChatHeader usedMessages={usedMessages} />
      <ChatMessageList messages={messages} loading={loading} error={error} />
      <ChatFooter
        input={input}
        onChange={setInput}
        onSend={handleSend}
        loading={loading}
        remaining={remaining}
      />
    </div>
  );
};