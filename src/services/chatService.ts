import { IChatResponse } from "../domain/models/interfaces/IChat";
import api from "../utils/api";

export const sendChatMessage = async (message: string): Promise<IChatResponse> => {
  const { data } = await api.post<IChatResponse>("/ai/chat", { message });
  return data;
};
