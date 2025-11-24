import { useKanban } from "../../../../hooks/useKanban";
import { useMembers } from "../../../../hooks/useMembers";
import { createModalContext } from "../../../../contexts/modal/useModal";
import { type ModalOptions } from "./types";
import Spinner from "../../../../components/spinner/Spinner";
import Error from "../../../../components/error/Error";
import ExistingTags from "./views/existing-tags/ExistingTags";
import NoTags from "./views/no-tags/NoTags";
import Modals from "./modals/Modals";
import styles from "./Tags.module.scss";

export const { ModalProvider, useModal } = createModalContext<ModalOptions>();

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
      <ModalProvider>
        <Modals />
        {kanban.tags.length > 0 ? <ExistingTags /> : <NoTags />}
      </ModalProvider>
    </div>
  );
};

export default Tags;
