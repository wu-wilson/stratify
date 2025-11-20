import { BASE_URL } from "./constants";
import {
  type MemberEntity,
  type DeleteMemberParams,
  type DeleteMemberResponse,
  type UpdateRolePayload,
  type UpdateRoleResponse,
} from "./types";
import axios from "axios";

export const getMembers = async (projectId: string, token: string) => {
  const response = await axios.get<MemberEntity[]>(BASE_URL, {
    params: { project_id: projectId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteMember = async (
  params: DeleteMemberParams,
  token: string
) => {
  const { project_id, member_id, deleted_by } = params;

  const response = await axios.delete<DeleteMemberResponse>(
    `${BASE_URL}/delete/${member_id}`,
    {
      params: { project_id, deleted_by },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const updateRole = async (payload: UpdateRolePayload, token: string) => {
  const response = await axios.patch<UpdateRoleResponse>(
    `${BASE_URL}/update/role`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
