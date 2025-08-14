import { MembersProvider } from "../../../../contexts/members/MembersProvider";
import { HistoryProvider } from "../../../../contexts/history/HistoryProvider";
import Members from "./members/Members";
import Invite from "./invite/Invite";
import History from "./history/History";
import styles from "./People.module.scss";

const People = () => {
  return (
    <div className={styles.container}>
      <MembersProvider>
        <HistoryProvider>
          <Members />
          <Invite />
          <History />
        </HistoryProvider>
      </MembersProvider>
    </div>
  );
};

export default People;
