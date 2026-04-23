import { IMessage } from "./IChat";

export interface ChatMessageListProps {
  messages: IMessage[];
  loading: boolean;
  error: string | null;
}
