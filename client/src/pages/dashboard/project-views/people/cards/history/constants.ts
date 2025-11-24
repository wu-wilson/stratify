import { type Column } from "../../../../../../components/table/types";
import { type History } from "../../../../../../services/history/types";

export const COLUMNS: Column[] = [
  { key: "row", label: "#" },
  { key: "performed_by", label: "Performed By" },
  { key: "action_type", label: "Action" },
  { key: "performed_on", label: "Performed On" },
  { key: "occurred_at", label: "Timestamp" },
];

export const ACTION_TYPE_LABELS: Record<History, string> = {
  joined_project: "Joined the Team",
  left_project: "Left the Team",
  removed_from_project: "Removed Member",
  promoted_to_owner: "Promoted to Owner",
  created_invite: "Created an Invite Link",
  paused_invite: "Disabled Joins",
  unpaused_invite: "Enabled Joins",
};
