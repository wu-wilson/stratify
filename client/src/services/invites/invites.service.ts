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

export const createInvite = async (
  createInvitePayload: CreateInvitePayload
) => {
  const response = await axios.post<CreateInviteResponse>(
    `${BASE_URL}/create`,
    createInvitePayload
  );
  return response.data;
};

export const updateInviteStatus = async (
  updateInviteStatusPayload: UpdateInviteStatusPayload
) => {
  const response = await axios.patch<UpdateInviteStatusResponse>(
    `${BASE_URL}/update/status`,
    updateInviteStatusPayload
  );
  return response.data;
};

export const acceptInvite = async (
  acceptInvitePayload: AcceptInvitePayload
) => {
  const response = await axios.post<AcceptInviteResponse>(
    `${BASE_URL}/accept`,
    acceptInvitePayload
  );
  return response.data;
};
