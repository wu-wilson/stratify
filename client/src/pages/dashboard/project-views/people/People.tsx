import Members from "./members/Members";
import styles from "./People.module.scss";

const People = () => {
  return (
    <div className={styles.container}>
      <Members />
    </div>
  );
};

export default People;
