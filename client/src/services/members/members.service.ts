import { BASE_URL } from "./constants";
import {
  type MemberEntity,
  type DeleteMemberParams,
  type DeleteMemberResponse,
  type UpdateRolePayload,
  type UpdateRoleResponse,
} from "./types";
import axios from "axios";

export const getMembers = async (projectId: string) => {
  const response = await axios.get<MemberEntity[]>(BASE_URL, {
    params: { project_id: projectId },
  });
  return response.data;
};

export const deleteMember = async (params: DeleteMemberParams) => {
  const { project_id, member_id, deleted_by } = params;

  const response = await axios.delete<DeleteMemberResponse>(
    `${BASE_URL}/delete/${member_id}`,
    { params: { project_id, deleted_by } }
  );

  return response.data;
};

export const updateRole = async (payload: UpdateRolePayload) => {
  const response = await axios.patch<UpdateRoleResponse>(
    `${BASE_URL}/update/role`,
    payload
  );
  return response.data;
};
