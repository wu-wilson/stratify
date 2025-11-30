import { type TagEntity } from "../../services/tags/types";
import { IoMdClose, IoMdPricetags } from "react-icons/io";
import styles from "./Tag.module.scss";

const Tag = ({
  tag,
  deletable = false,
  onDelete = () => {},
}: {
  tag: TagEntity;
  deletable?: boolean;
  onDelete?: (tag: TagEntity) => void;
}) => {
  return (
    <div className={styles.container}>
      <IoMdPricetags className={styles.icon} style={{ color: tag.color }} />
      <span className={styles.name}>{tag.name}</span>
      {deletable && (
        <IoMdClose className={styles.delete} onClick={() => onDelete(tag)} />
      )}
    </div>
  );
};

export default Tag;
