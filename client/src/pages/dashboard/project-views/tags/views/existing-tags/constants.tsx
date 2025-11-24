import { type Column } from "../../../../../../components/table/types";
import styles from "./ExistingTags.module.scss";

export const COLUMNS: Column[] = [
  { key: "row", label: "#" },
  { key: "name", label: "Name" },
  {
    key: "color",
    label: "Color",
    render: (hex) => (
      <div className={styles.color}>
        <div
          style={{ backgroundColor: hex as string }}
          className={styles.preview}
        />
        {hex}
      </div>
    ),
  },
  { key: "created_by", label: "Created By" },
  { key: "created_on", label: "Created On" },
  { key: "assigned_tasks", label: "# Tasks" },
];
