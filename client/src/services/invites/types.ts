import { type MemberEntity } from "../members/types";
import { type ProjectEntity } from "../projects/types";

export type InviteEntity = {
  token: string;
  project_id: string;
  created_on: string;
  max_uses: number;
  uses: number;
  paused: boolean;
};

export type GetInviteMetadataResponse = {
  invite: InviteEntity;
  project: ProjectEntity & {
    members: string[];
  };
};

export type CreateInvitePayload = {
  project_id: string;
  max_uses: number;
  created_by: string;
  paused: boolean;
};

export type CreateInviteResponse = {
  message: string;
  invite: InviteEntity;
};

export type UpdateInviteStatusPayload = {
  project_id: string;
  paused: boolean;
  updated_by: string;
};

export type UpdateInviteStatusResponse = {
  message: string;
  updated: InviteEntity;
  updated_on: string;
};

export type AcceptInvitePayload = {
  member_id: string;
  project_id: string;
  token: string;
};

export type AcceptInviteResponse = {
  message: string;
  added: MemberEntity;
};
