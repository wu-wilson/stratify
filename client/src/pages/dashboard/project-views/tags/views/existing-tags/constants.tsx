import { type Column } from "../../../../../../components/table/types";
import { type TagEntity } from "../../../../../../services/tags/types";
import styles from "./ExistingTags.module.scss";

export const COLUMNS: Column<
  TagEntity & { row: number; assigned_tasks: number }
>[] = [
  { key: "row", label: "#" },
  { key: "name", label: "Name" },
  {
    key: "color",
    label: "Color",
    render: (value: string | number) => (
      <div className={styles.color}>
        <div
          style={{ backgroundColor: value as string }}
          className={styles.preview}
        />
        {value}
      </div>
    ),
  },
  { key: "created_by", label: "Created By" },
  { key: "created_on", label: "Created On" },
  { key: "assigned_tasks", label: "# Tasks" },
];
