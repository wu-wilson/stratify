import { COLUMNS } from "./constants";
import { useMemo, useState } from "react";
import { useMembers } from "../../../../../hooks/useMembers";
import { useHistory } from "../../../../../hooks/useHistory";
import { useIsOwner } from "../../../../../hooks/useIsOwner";
import { getActionIcons } from "./util";
import { useTimeFormat } from "../../../../../hooks/useTimeFormat";
import { type MemberEntity } from "../../../../../services/members/types";
import Spinner from "../../../../../components/spinner/Spinner";
import Error from "../../../../../components/error/Error";
import Modal from "../../../../../components/modal/Modal";
import Remove from "./modals/remove/Remove";
import Owner from "./modals/owner/Owner";
import SearchTable from "../../../../../components/table/search-table/SearchTable";
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

  const [selectedMember, setSelectedMember] = useState<MemberEntity | null>(
    null
  );
  const [modal, setModal] = useState<"remove" | "owner" | null>(null);
  const closeModal = () => {
    setSelectedMember(null);
    setModal(null);
  };

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
      {modal === "remove" && selectedMember && (
        <Modal close={closeModal}>
          <Remove member={selectedMember} closeModal={closeModal} />
        </Modal>
      )}
      {modal === "owner" && selectedMember && (
        <Modal close={closeModal}>
          <Owner member={selectedMember} closeModal={closeModal} />
        </Modal>
      )}
      <SearchTable
        rows={rows}
        columns={COLUMNS}
        actionIcons={getActionIcons(setModal, setSelectedMember, isOwner)}
      />
    </div>
  );
};

export default Members;
