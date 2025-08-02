import { COLUMNS } from "./constants";
import { useMemo, useState } from "react";
import { useAuth } from "../../../../../hooks/useAuth";
import { useMembers } from "../../../../../hooks/useMembers";
import { getActionIcons } from "./util";
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
  const { members, loading, error } = useMembers();

  const rows = useMemo(
    () =>
      loading
        ? []
        : members.map((member, index) => ({
            row: index + 1,
            ...member,
            joined_on: moment(member.joined_on).format("MMMM D, YYYY"),
          })),
    [members]
  );

  const [selectedMember, setSelectedMember] = useState<MemberEntity | null>(
    null
  );
  const [modal, setModal] = useState<"remove" | "owner" | null>(null);
  const closeModal = () => {
    setSelectedMember(null);
    setModal(null);
  };

  const { user } = useAuth();
  const isOwner = useMemo(() => {
    const id = user?.uid;
    if (!id) {
      return false;
    }
    const currUser = members?.find((member) => member.id === id);
    return currUser?.role === "owner";
  }, [user, members]);

  if (loading) {
    return (
      <div className={styles.container}>
        <Spinner size={50} text={"Fetching members..."} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <Error errorMsg={error} />
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
        rowsPerPage={4}
      />
    </div>
  );
};

export default Members;
