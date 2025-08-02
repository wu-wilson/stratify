import { MembersProvider } from "../../../../contexts/members/MembersProvider";
import Members from "./members/Members";
import Invite from "./invite/Invite";
import styles from "./People.module.scss";

const People = () => {
  return (
    <MembersProvider>
      <div className={styles.container}>
        <Members />
        <Invite />
      </div>
    </MembersProvider>
  );
};

export default People;
