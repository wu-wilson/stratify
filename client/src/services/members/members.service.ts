import { BASE_URL } from "./constants";
import {
  type DeleteMemberPayload,
  type DeleteMemberResponse,
  type MemberEntity,
} from "./types";
import axios from "axios";

export const getMembers = async (projectId: string) => {
  const response = await axios.get<MemberEntity[]>(BASE_URL, {
    params: { project_id: projectId },
  });

  return response.data;
};

export const deleteMember = async (
  deleteMemberPayload: DeleteMemberPayload
) => {
  const response = await axios.delete<DeleteMemberResponse>(
    `${BASE_URL}/delete`,
    { data: deleteMemberPayload }
  );

  return response.data;
};
