import { BASE_URL } from "./constants";
import { type TaggingEntity } from "./types";
import axios from "axios";

export const getTaggings = async (projectId: string, token: string) => {
  const response = await axios.get<TaggingEntity[]>(BASE_URL, {
    params: { project_id: projectId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
