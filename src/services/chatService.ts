import { IChatResponse, IMessage } from "../domain/models/interfaces/IChat";
import api from "../utils/api";

export const sendChatMessage = async (
  message: string,
  history: IMessage[]
): Promise<IChatResponse> => {
  const { data } = await api.post<IChatResponse>("/ai/chat", {
    message,
    history,
  });
  return data;
};
