import { useKanban } from "../../../../hooks/useKanban";
import Spinner from "../../../../components/spinner/Spinner";
import Error from "../../../../components/error/Error";
import styles from "./Tasks.module.scss";

const Tasks = () => {
  const { loading, error } = useKanban();

  if (loading) {
    return (
      <div className={styles.container}>
        <Spinner size={50} text={"Fetching tasks..."} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <Error errorMsg={"getTasks endpoint failed"} />
      </div>
    );
  }

  return <div className={styles.container}>Tasks</div>;
};

export default Tasks;
