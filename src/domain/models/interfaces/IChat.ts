export interface IMessage {
  role: "user" | "assistant";
  content: string;
}

export interface IChatResponse {
  reply: string;
}

export interface IChatError {
  error: string;
}