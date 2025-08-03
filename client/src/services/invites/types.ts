export type InviteEntity = {
  token: string;
  project_id: string;
  created_by: string;
  created_on: string;
  max_uses: number | null;
  uses: number;
  paused: boolean;
};

export type CreateInvitePayload = {
  created_by: string;
  project_id: string;
  max_uses: number | null;
};

export type CreateInviteResponse = {
  message: string;
  invite: InviteEntity;
};

export type UpdateInviteStatusPayload = {
  project_id: string;
  paused: boolean;
};

export type UpdateInviteStatusResponse = {
  message: string;
  updated: InviteEntity;
};
