import { useMemo } from "react";
import { useIsOwner } from "../../../../../../hooks/useIsOwner";
import { useKanban } from "../../../../../../hooks/useKanban";
import { useMembers } from "../../../../../../hooks/useMembers";
import { useModal } from "../../Tags.tsx";
import { COLUMNS } from "./constants.tsx";
import { useTimeFormat } from "../../../../../../hooks/useTimeFormat";
import { getActionIcons } from "./util";
import { type TaskCountMap } from "./types";
import SearchTable from "../../../../../../components/table/search-table/SearchTable";
import moment from "moment";
import styles from "./ExistingTags.module.scss";

const ExistingTags = () => {
  const { kanban } = useKanban();
  const { members } = useMembers();
  const { formatString } = useTimeFormat();
  const { setModal } = useModal();

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

  return (
    <>
      <SearchTable
        rows={rows}
        columns={COLUMNS}
        actionIcons={getActionIcons(setModal, isOwner)}
      />
      <button
        className={styles.addTag}
        onClick={() => setModal({ type: "createTag" })}
      >
        Add Tag
      </button>
    </>
  );
};

export default ExistingTags;
