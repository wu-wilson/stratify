import { BASE_URL } from "./constants";
import { type HistoryEntity } from "./types";
import axios from "axios";

export const getHistory = async (projectId: string, token: string) => {
  const response = await axios.get<HistoryEntity[]>(BASE_URL, {
    params: { project_id: projectId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
