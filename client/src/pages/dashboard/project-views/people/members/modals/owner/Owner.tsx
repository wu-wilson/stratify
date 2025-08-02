import { useEffect, useState } from "react";
import { updateRole } from "../../../../../../../services/members/members.service";
import { useElementHeight } from "../../../../../../../hooks/useElementHeight";
import { CONFIRM_STRING } from "./constants";
import { useMembers } from "../../../../../../../hooks/useMembers";
import {
  type MemberEntity,
  type UpdateRolePayload,
} from "../../../../../../../services/members/types";
import Spinner from "../../../../../../../components/spinner/Spinner";
import Error from "../../../../../../../components/error/Error";
import styles from "./Owner.module.scss";

const Owner = ({
  member,
  closeModal,
}: {
  member: MemberEntity;
  closeModal: () => void;
}) => {
  const { ref, height } = useElementHeight<HTMLDivElement>();
  const { members, setMembers, project } = useMembers();

  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [requestError, setRequestError] = useState<string | null>(null);

  const makeOwner = async () => {
    try {
      const makeOwnerPayload: UpdateRolePayload = {
        member_id: member.id,
        project_id: project,
        role: "owner",
      };

      await updateRole(makeOwnerPayload);
      setMembers(
        members!.map((m) => (m.id === member.id ? { ...m, role: "owner" } : m))
      );
      closeModal();
    } catch (err) {
      setRequestError("deleteMember endpoint failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      makeOwner();
    }
  }, [loading]);

  if (loading) {
    return (
      <div
        className={styles.container}
        style={{ height: height ? `${height}px` : undefined }}
      >
        <Spinner size={50} text={"Making owner..."} />
      </div>
    );
  }

  if (requestError) {
    return (
      <div
        className={styles.container}
        style={{ height: height ? `${height}px` : undefined }}
      >
        <Error errorMsg={requestError} />
      </div>
    );
  }

  return (
    <div className={styles.container} ref={ref}>
      <span className={styles.title}>Make Owner</span>
      <span
        className={styles.subtext}
      >{`Please confirm that you want to add ${member.name} as a project owner`}</span>
      <input
        className={styles.input}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        placeholder={CONFIRM_STRING}
        autoFocus
      />
      <div className={styles.inputMsg}>Type {CONFIRM_STRING} to confirm</div>
      <div className={styles.update}>
        <button
          onClick={() => setLoading(true)}
          disabled={input !== CONFIRM_STRING}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default Owner;
