import { useKanban } from "../../../../hooks/useKanban";
import { useMembers } from "../../../../hooks/useMembers";
import Spinner from "../../../../components/spinner/Spinner";
import Error from "../../../../components/error/Error";
import ExistingTags from "./views/existing-tags/ExistingTags";
import NoTags from "./views/no-tags/NoTags";
import styles from "./Tags.module.scss";

const Tags = () => {
  const { loading: kanbanLoading, error: kanbanError, kanban } = useKanban();
  const { loading: membersLoading, error: membersError } = useMembers();

  if (kanbanLoading || membersLoading) {
    return (
      <div className={styles.container}>
        <Spinner size={50} text={"Fetching tags..."} />
      </div>
    );
  }

  const errorMsg = kanbanError || membersError;
  if (errorMsg) {
    return (
      <div className={styles.container}>
        <Error errorMsg={errorMsg} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {kanban.tags.length > 0 ? <ExistingTags /> : <NoTags />}
    </div>
  );
};

export default Tags;
