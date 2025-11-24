import { HistoryProvider } from "../../../../contexts/history/HistoryProvider";
import { createModalContext } from "../../../../contexts/modal/useModal";
import { type ModalOptions } from "./types";
import Modals from "./modals/Modals";
import Members from "./cards/members/Members";
import Invite from "./cards/invite/Invite";
import History from "./cards/history/History";
import styles from "./People.module.scss";

export const { ModalProvider, useModal } = createModalContext<ModalOptions>();

const People = () => {
  return (
    <div className={styles.container}>
      <HistoryProvider>
        <ModalProvider>
          <Modals />
          <div className={styles.row}>
            <Members />
            <Invite />
          </div>
          <div className={styles.row}>
            <History />
          </div>
        </ModalProvider>
      </HistoryProvider>
    </div>
  );
};

export default People;
