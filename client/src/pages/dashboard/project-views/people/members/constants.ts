import { type Column } from "../../../../../components/table/types";
import { type MemberEntity } from "../../../../../services/members/types";

export const COLUMNS: Column<MemberEntity & { row: number }>[] = [
  { key: "row", label: "#" },
  { key: "name", label: "Name" },
  { key: "role", label: "Role" },
  { key: "joined_on", label: "Joined" },
];
