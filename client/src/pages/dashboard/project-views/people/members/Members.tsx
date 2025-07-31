import { COLUMNS } from "./constants";
import { MdDelete } from "react-icons/md";
import { useMemo, useState } from "react";
import { useAuth } from "../../../../../hooks/useAuth";
import { useMembers } from "../../../../../hooks/useMembers";
import { type MemberEntity } from "../../../../../services/members/types";
import Spinner from "../../../../../components/spinner/Spinner";
import Error from "../../../../../components/error/Error";
import Modal from "../../../../../components/modal/Modal";
import Remove from "./remove/Remove";
import SearchTable from "../../../../../components/table/search/SearchTable";
import moment from "moment";
import styles from "./Members.module.scss";

const Members = () => {
  const { members, loading, error } = useMembers();

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

  const rows = useMemo(
    () =>
      members.map((member, index) => ({
        row: index + 1,
        ...member,
        joined_on: moment(member.joined_on).format("MMMM D, YYYY"),
      })),
    [members]
  );

  const [memberToRemove, setMemberToRemove] = useState<MemberEntity | null>(
    null
  );
  const openRemove = useMemo(() => Boolean(memberToRemove), [memberToRemove]);
  const setOpenRemove = (open: boolean) => {
    if (!open) {
      setMemberToRemove(null);
    }
  };

  const { user } = useAuth();
  const canRemove = useMemo(() => {
    const id = user?.uid;
    if (!id) {
      return false;
    }
    const currUser = members.find((member) => member.id === id);
    return currUser?.role === "owner";
  }, [user, members]);

  return (
    <div className={styles.container}>
      {openRemove && memberToRemove && (
        <Modal setOpen={setOpenRemove}>
          <Remove
            member={memberToRemove}
            closeModal={() => setOpenRemove(false)}
          />
        </Modal>
      )}
      <div className={styles.header}>Members</div>
      <SearchTable
        rows={rows}
        columns={COLUMNS}
        actionIcons={
          canRemove
            ? [
                {
                  icon: MdDelete,
                  onClick: (row) => {
                    setMemberToRemove(row as MemberEntity);
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
