export type History =
  | "joined_project"
  | "left_project"
  | "removed_from_project"
  | "promoted_to_owner"
  | "created_invite"
  | "paused_invite"
  | "unpaused_invite";

export type HistoryEntity = {
  performed_by: string;
  action_type: History;
  performed_on: string | null;
  occurred_at: string;
};
