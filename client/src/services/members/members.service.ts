import { BASE_URL } from "./constants";
import { type MemberEntity } from "./types";
import axios from "axios";

export const getMembers = async (projectId: number) => {
  const response = await axios.get<MemberEntity[]>(BASE_URL, {
    params: { project_id: projectId },
  });
  return response.data;
};
