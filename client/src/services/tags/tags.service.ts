import { BASE_URL } from "./constants";
import {
  type CreateTagPayload,
  type CreateTagResponse,
  type DeleteTagResponse,
  type TagEntity,
  type UpdateTagPayload,
  type UpdateTagResponse,
} from "./types";
import axios from "axios";

export const getTags = async (projectId: string, token: string) => {
  const response = await axios.get<TagEntity[]>(BASE_URL, {
    params: { project_id: projectId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createTag = async (payload: CreateTagPayload, token: string) => {
  const response = await axios.post<CreateTagResponse>(
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

export const deleteTag = async (
  tagId: string,
  projectId: string,
  token: string
) => {
  const response = await axios.delete<DeleteTagResponse>(
    `${BASE_URL}/delete/${tagId}`,
    {
      params: {
        project_id: projectId,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const updateTag = async (payload: UpdateTagPayload, token: string) => {
  const response = await axios.patch<UpdateTagResponse>(
    `${BASE_URL}/update`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
