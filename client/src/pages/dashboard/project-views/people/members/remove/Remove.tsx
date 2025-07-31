import { useEffect, useRef, useState } from "react";
import { deleteMember } from "../../../../../../services/members/members.service";
import { CONFIRM_STRING } from "./constants";
import { useMembers } from "../../../../../../hooks/useMembers";
import {
  type DeleteMemberPayload,
  type MemberEntity,
} from "../../../../../../services/members/types";
import Spinner from "../../../../../../components/spinner/Spinner";
import Error from "../../../../../../components/error/Error";
import styles from "./Remove.module.scss";

const Remove = ({
  member,
  closeModal,
}: {
  member: MemberEntity;
  closeModal: () => void;
}) => {
  const [height, setHeight] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const height = ref.current.offsetHeight;
      setHeight(height);
    }
  }, []);

  const { members, setMembers, project } = useMembers();

  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [requestError, setRequestError] = useState<string | null>(null);

  const removeMember = async () => {
    try {
      const deleteMemberPayload: DeleteMemberPayload = {
        member_id: member.id,
        project_id: project,
      };

      await deleteMember(deleteMemberPayload);
      setMembers(members!.filter((m) => m.id !== member.id));
      closeModal();
    } catch (err) {
      setRequestError("deleteMember endpoint failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      removeMember();
    }
  }, [loading]);

  if (loading) {
    return (
      <div
        className={styles.container}
        style={{ height: height ? `${height}px` : undefined }}
      >
        <Spinner size={50} text={"Removing member..."} />
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
      <span className={styles.title}>Remove Member</span>
      <span
        className={styles.subtext}
      >{`Please confirm that you want to remove ${member.name} from this project`}</span>
      <input
        className={styles.input}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        placeholder={CONFIRM_STRING}
        autoFocus
      />
      <div className={styles.inputMsg}>Type "{CONFIRM_STRING}" to confirm</div>
      <div className={styles.remove}>
        <button
          onClick={() => setLoading(true)}
          disabled={input !== CONFIRM_STRING}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default Remove;
