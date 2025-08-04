import { BiError } from "react-icons/bi";
import { INVALID_INVITE_CONTENT_MAP } from "./constants";
import { type InviteInvalidationReason } from "./types";
import styles from "./InvalidInvite.module.scss";

const InvalidInvite = ({
  invalidationReason,
}: {
  invalidationReason: InviteInvalidationReason;
}) => {
  return (
    <div className={styles.container}>
      <span className={styles.title}>
        <BiError className={styles.icon} />
        {INVALID_INVITE_CONTENT_MAP[invalidationReason].title}
      </span>
      <span className={styles.subtext}>
        {INVALID_INVITE_CONTENT_MAP[invalidationReason].subtext}
      </span>
    </div>
  );
};

export default InvalidInvite;
