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

export const getInvite = async (projectId: string, token: string) => {
  const response = await axios.get<InviteEntity | null>(BASE_URL, {
    params: { project_id: projectId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getInviteMetadata = async (
  inviteToken: string,
  bearerToken: string
) => {
  const response = await axios.get<GetInviteMetadataResponse>(
    `${BASE_URL}/metadata`,
    {
      params: { token: inviteToken },
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    }
  );
  return response.data;
};

export const createInvite = async (
  payload: CreateInvitePayload,
  token: string
) => {
  const response = await axios.post<CreateInviteResponse>(
    `${BASE_URL}/create`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const updateInviteStatus = async (
  payload: UpdateInviteStatusPayload,
  token: string
) => {
  const response = await axios.patch<UpdateInviteStatusResponse>(
    `${BASE_URL}/update/status`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const acceptInvite = async (
  payload: AcceptInvitePayload,
  token: string
) => {
  const response = await axios.post<AcceptInviteResponse>(
    `${BASE_URL}/accept`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
