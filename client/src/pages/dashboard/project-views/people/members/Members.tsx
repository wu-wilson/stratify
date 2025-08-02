import { COLUMNS } from "./constants";
import { MdDelete } from "react-icons/md";
import { FaUserGear } from "react-icons/fa6";
import { useMemo, useState } from "react";
import { useAuth } from "../../../../../hooks/useAuth";
import { useMembers } from "../../../../../hooks/useMembers";
import { type MemberEntity } from "../../../../../services/members/types";
import Spinner from "../../../../../components/spinner/Spinner";
import Error from "../../../../../components/error/Error";
import Modal from "../../../../../components/modal/Modal";
import Remove from "./modals/remove/Remove";
import Owner from "./modals/owner/Owner";
import SearchTable from "../../../../../components/table/search/SearchTable";
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
      <div className={styles.header}>Members</div>
      <SearchTable
        rows={rows}
        columns={COLUMNS}
        actionIcons={
          isOwner
            ? [
                {
                  icon: FaUserGear,
                  onClick: (row) => {
                    setSelectedMember(row as MemberEntity);
                    setModal("owner");
                  },
                  variant: "info",
                  render: (row) => (row as MemberEntity).role !== "owner",
                },
                {
                  icon: MdDelete,
                  onClick: (row) => {
                    setSelectedMember(row as MemberEntity);
                    setModal("remove");
                  },
                  variant: "danger",
                  render: (row) => (row as MemberEntity).role !== "owner",
                },
              ]
            : []
        }
        rowsPerPage={4}
      />
    </div>
  );
};

export default Members;
