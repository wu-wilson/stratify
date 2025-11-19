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

export const getTags = async (projectId: string) => {
  const response = await axios.get<TagEntity[]>(BASE_URL, {
    params: { project_id: projectId },
  });
  return response.data;
};

export const createTag = async (payload: CreateTagPayload) => {
  const response = await axios.post<CreateTagResponse>(
    `${BASE_URL}/create`,
    payload
  );
  return response.data;
};

export const deleteTag = async (tagId: string) => {
  const response = await axios.delete<DeleteTagResponse>(
    `${BASE_URL}/delete/${tagId}`
  );
  return response.data;
};

export const updateTag = async (payload: UpdateTagPayload) => {
  const response = await axios.patch<UpdateTagResponse>(
    `${BASE_URL}/update`,
    payload
  );
  return response.data;
};
