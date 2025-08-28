import { BASE_URL } from "./constants";
import { type TagEntity } from "./types";
import axios from "axios";

export const getTags = async (projectId: string) => {
  const response = await axios.get<TagEntity[]>(BASE_URL, {
    params: { project_id: projectId },
  });
  return response.data;
};
