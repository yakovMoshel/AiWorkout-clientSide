import { IChatResponse } from "src/domain/models/interfaces/Ichat";
import api from "src/utils/api";

export const sendChatMessage = async (message: string): Promise<IChatResponse> => {
  const { data } = await api.post<IChatResponse>("/ai/chat", { message });
  return data;
};