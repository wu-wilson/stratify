import { type Column } from "../../../../../../components/table/types";
import { type TagEntity } from "../../../../../../services/tags/types";

export const COLUMNS: Column<
  TagEntity & { row: number; assigned_tasks: number }
>[] = [
  { key: "row", label: "#" },
  { key: "name", label: "Name" },
  { key: "color", label: "Color" },
  { key: "created_by", label: "Created By" },
  { key: "created_on", label: "Created On" },
  { key: "assigned_tasks", label: "# Tasks" },
];
