import { useMemo, useState } from "react";
import { useIsOwner } from "../../../../../../hooks/useIsOwner";
import { useKanban } from "../../../../../../hooks/useKanban";
import { useMembers } from "../../../../../../hooks/useMembers";
import { COLUMNS } from "./constants";
import { useTimeFormat } from "../../../../../../hooks/useTimeFormat";
import { getActionIcons } from "./util";
import { type TaskCountMap } from "./types";
import { type TagEntity } from "../../../../../../services/tags/types";
import SearchTable from "../../../../../../components/table/search-table/SearchTable";
import moment from "moment";
import Modal from "../../../../../../components/modal/Modal";
import CreateTag from "../../modals/create-tag/CreateTag";
import DeleteTag from "../../modals/delete-tag/DeleteTag";
import EditTag from "../../modals/edit-tag/EditTag";
import styles from "./ExistingTags.module.scss";

const ExistingTags = () => {
  const { kanban } = useKanban();
  const { members } = useMembers();
  const { formatString } = useTimeFormat();
  const isOwner = useIsOwner();

  const taskCounts = useMemo(
    () =>
      kanban!.taggings.reduce((acc: TaskCountMap, t) => {
        acc[t.tag_id] = (acc[t.tag_id] ?? 0) + 1;
        return acc;
      }, {}),
    [kanban]
  );

  const rows = useMemo(() => {
    const sortedTags = [...kanban!.tags].sort((a, b) =>
      moment(a.created_on).diff(moment(b.created_on))
    );

    return sortedTags.map((tag, index) => ({
      row: index + 1,
      ...tag,
      created_by:
        members!.find((m) => m.id === tag.created_by)?.name ?? "Unknown",
      created_on: moment(tag.created_on).format(formatString),
      assigned_tasks: taskCounts[tag.id] ?? 0,
    }));
  }, [kanban, members, formatString]);

  const [selectedTag, setSelectedTag] = useState<TagEntity | null>(null);
  const [modal, setModal] = useState<"remove" | "edit" | "create" | null>(null);
  const closeModal = () => {
    setSelectedTag(null);
    setModal(null);
  };

  return (
    <>
      {modal === "remove" && selectedTag && (
        <Modal close={closeModal}>
          <DeleteTag tag={selectedTag} closeModal={closeModal} />
        </Modal>
      )}
      {modal === "edit" && selectedTag && (
        <Modal close={closeModal}>
          <EditTag tag={selectedTag} closeModal={closeModal} />
        </Modal>
      )}
      {modal === "create" && (
        <Modal close={closeModal}>
          <CreateTag closeModal={closeModal} />
        </Modal>
      )}
      <SearchTable
        rows={rows}
        columns={COLUMNS}
        actionIcons={getActionIcons(setModal, setSelectedTag, isOwner)}
      />
      <button className={styles.addTag} onClick={() => setModal("create")}>
        Add Tag
      </button>
    </>
  );
};

export default ExistingTags;
