import { MembersProvider } from "../../../../contexts/members/MembersProvider";
import Members from "./members/Members";
import styles from "./People.module.scss";

const People = () => {
  return (
    <MembersProvider>
      <div className={`${styles.container} ${styles.grid}`}>
        <Members />
      </div>
    </MembersProvider>
  );
};

export default People;
