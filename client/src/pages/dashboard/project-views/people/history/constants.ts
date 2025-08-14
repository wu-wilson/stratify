import { type Column } from "../../../../../components/table/types";
import {
  type HistoryEntity,
  type History,
} from "../../../../../services/history/types";

export const COLUMNS: Column<HistoryEntity & { row: number }>[] = [
  { key: "row", label: "#" },
  { key: "performed_by", label: "Actor" },
  { key: "action_type", label: "Action" },
  { key: "performed_on", label: "Target" },
  { key: "occurred_at", label: "Timestamp" },
];

export const ACTION_TYPE_LABELS: Record<History, string> = {
  joined_project: "Joined Team",
  left_project: "Left Team",
  removed_from_project: "Removed Member",
  promoted_to_owner: "Promoted to Owner",
  created_invite: "Created Invite",
  paused_invite: "Disabled Joins",
  unpaused_invite: "Enabled Joins",
};
