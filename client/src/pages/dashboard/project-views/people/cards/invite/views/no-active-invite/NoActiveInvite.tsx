import { type Dispatch, type SetStateAction } from "react";
import { BUTTON_LABEL, SUBTEXT, TITLE } from "./constants";
import { useModal } from "../../../../People";
import { type InviteEntity } from "../../../../../../../../services/invites/types";
import NotFound from "../../../../../../../../components/not-found/NotFound";
import styles from "./NoActiveInvite.module.scss";

const NoActiveInvite = ({
  setInvite,
}: {
  setInvite: Dispatch<SetStateAction<InviteEntity | null>>;
}) => {
  const { setModal } = useModal();

  return (
    <div className={styles.container}>
      <div className={styles.header}>Invite People to the Team</div>
      <div className={styles.content}>
        <NotFound
          title={TITLE}
          subtext={SUBTEXT}
          button={{
            label: BUTTON_LABEL,
            onClick: () => {
              setModal({ type: "createInvite", invite: null, setInvite });
            },
          }}
        />
      </div>
    </div>
  );
};

export default NoActiveInvite;
