import { MembersProvider } from "../../../../contexts/members/MembersProvider";
import { HistoryProvider } from "../../../../contexts/history/HistoryProvider";
import Members from "./members/Members";
import Invite from "./invite/Invite";
import History from "./history/History";
import styles from "./People.module.scss";

const People = () => {
  return (
    <MembersProvider>
      <HistoryProvider>
        <div className={styles.container}>
          <Members />
          <Invite />
          <History />
        </div>
      </HistoryProvider>
    </MembersProvider>
  );
};

export default People;
