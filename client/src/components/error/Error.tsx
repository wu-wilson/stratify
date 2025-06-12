import { TbFaceIdError } from "react-icons/tb";
import { SUBTEXT } from "./util";
import styles from "./Error.module.scss";

const Error = ({
  subtext = SUBTEXT,
  errorMsg,
}: {
  subtext?: string;
  errorMsg?: string;
}) => {
  return (
    <div className={styles.container}>
      <span className={styles.title}>
        Oopsie! <TbFaceIdError className={styles.icon} />
      </span>
      <span className={styles.subtext}>{subtext}</span>
      {errorMsg && <span className={styles.error}>({errorMsg})</span>}
    </div>
  );
};

export default Error;
