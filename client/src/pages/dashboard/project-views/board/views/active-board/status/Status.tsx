import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { type StatusEntity } from "../../../../../../../services/statuses/types";
import styles from "./Status.module.scss";

const Status = ({ status }: { status: StatusEntity }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: status.id });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={styles.container}
    >
      {status.name}
    </div>
  );
};

export default Status;
