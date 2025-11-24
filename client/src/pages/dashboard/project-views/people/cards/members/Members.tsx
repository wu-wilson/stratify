import { COLUMNS } from "./constants";
import { useMemo } from "react";
import { useMembers } from "../../../../../../hooks/useMembers";
import { useHistory } from "../../../../../../hooks/useHistory";
import { useIsOwner } from "../../../../../../hooks/useIsOwner";
import { useModal } from "../../People";
import { getActionIcons } from "./util";
import { useTimeFormat } from "../../../../../../hooks/useTimeFormat";
import Spinner from "../../../../../../components/spinner/Spinner";
import Error from "../../../../../../components/error/Error";
import SearchTable from "../../../../../../components/table/search-table/SearchTable";
import moment from "moment";
import styles from "./Members.module.scss";

const Members = () => {
  const {
    members,
    loading: membersLoading,
    error: membersError,
  } = useMembers();
  const { loading: historyLoading, error: historyError } = useHistory();
  const { formatString } = useTimeFormat();
  const { setModal } = useModal();

  const isOwner = useIsOwner();

  const rows = useMemo(
    () =>
      membersLoading
        ? []
        : members.map((member, index) => ({
            row: index + 1,
            ...member,
            joined_on: moment(member.joined_on).format(formatString),
          })),
    [members, formatString]
  );

  if (membersLoading || historyLoading) {
    return (
      <div className={styles.container}>
        <Spinner size={50} text={"Fetching members..."} />
      </div>
    );
  }

  const errorMsg = membersError || historyError;
  if (errorMsg) {
    return (
      <div className={styles.container}>
        <Error errorMsg={errorMsg} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>Team Members</div>
      <SearchTable
        rows={rows}
        columns={COLUMNS}
        actionIcons={getActionIcons(setModal, isOwner)}
      />
    </div>
  );
};

export default Members;
