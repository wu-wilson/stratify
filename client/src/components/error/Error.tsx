import { TbFaceIdError } from "react-icons/tb";
import styles from "./Error.module.scss";

const Error = ({ msgs }: { msgs?: string[] }) => {
  return (
    <div className={styles["card"]}>
      <span className={styles["title"]}>
        Oopsie! <TbFaceIdError className={styles["icon"]} />
      </span>
      <span className={styles["subtext"]}>
        Something went wrong. Refresh the page or come back later.
      </span>
      {msgs &&
        msgs.map((msg) => (
          <span key={msg} className={styles["error"]}>
            Error: {msg}
          </span>
        ))}
    </div>
  );
};

export default Error;
