import { BASE_URL } from "./constants";
import {
  type InviteEntity,
  type GetInviteMetadataResponse,
  type CreateInvitePayload,
  type CreateInviteResponse,
  type UpdateInviteStatusPayload,
  type UpdateInviteStatusResponse,
  type AcceptInvitePayload,
  type AcceptInviteResponse,
} from "./types";
import axios from "axios";

export const getInvite = async (projectId: string) => {
  const response = await axios.get<InviteEntity | null>(BASE_URL, {
    params: { project_id: projectId },
  });

  return response.data;
};

export const getInviteMetadata = async (token: string) => {
  const response = await axios.get<GetInviteMetadataResponse>(
    `${BASE_URL}/metadata`,
    {
      params: { token: token },
    }
  );
  return response.data;
};

export const createInvite = async (payload: CreateInvitePayload) => {
  const response = await axios.post<CreateInviteResponse>(
    `${BASE_URL}/create`,
    payload
  );
  return response.data;
};

export const updateInviteStatus = async (
  payload: UpdateInviteStatusPayload
) => {
  const response = await axios.patch<UpdateInviteStatusResponse>(
    `${BASE_URL}/update/status`,
    payload
  );
  return response.data;
};

export const acceptInvite = async (payload: AcceptInvitePayload) => {
  const response = await axios.post<AcceptInviteResponse>(
    `${BASE_URL}/accept`,
    payload
  );
  return response.data;
};
