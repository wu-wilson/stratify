import { HistoryProvider } from "../../../../contexts/history/HistoryProvider";
import Members from "./members/Members";
import Invite from "./invite/Invite";
import History from "./history/History";
import styles from "./People.module.scss";

const People = () => {
  return (
    <div className={styles.container}>
      <HistoryProvider>
        <Members />
        <Invite />
        <History />
      </HistoryProvider>
    </div>
  );
};

export default People;
