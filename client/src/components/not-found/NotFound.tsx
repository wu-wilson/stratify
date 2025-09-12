import { TbFolderOpen } from "react-icons/tb";
import styles from "./NotFound.module.scss";
import { type ActionableButton } from "./types";

const NotFound = ({
  title,
  subtext,
  button,
}: {
  title: string;
  subtext: string;
  button?: ActionableButton;
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <TbFolderOpen className={styles.icon} /> {title}
      </div>
      <span className={styles.subtext}>{subtext}</span>
      {button && (
        <button className={styles.button} onClick={button.onClick}>
          {button.label}
        </button>
      )}
    </div>
  );
};

export default NotFound;
