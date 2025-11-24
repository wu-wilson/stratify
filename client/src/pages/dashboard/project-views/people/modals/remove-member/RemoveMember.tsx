import { useEffect, useState } from "react";
import { deleteMember } from "../../../../../../services/members/members.service";
import { useElementHeight } from "../../../../../../hooks/useElementHeight";
import { useAuth } from "../../../../../../hooks/useAuth";
import { useHistory } from "../../../../../../hooks/useHistory";
import { useQueryParams } from "../../../../../../hooks/query-params/useQueryParams";
import { CONFIRM_STRING, SUBTITLE } from "./constants";
import { useMembers } from "../../../../../../hooks/useMembers";
import {
  type DeleteMemberParams,
  type MemberEntity,
} from "../../../../../../services/members/types";
import Spinner from "../../../../../../components/spinner/Spinner";
import Error from "../../../../../../components/error/Error";
import styles from "../../../../../../components/modal/BaseModalContent.module.scss";

const RemoveMember = ({
  member,
  closeModal,
}: {
  member: MemberEntity;
  closeModal: () => void;
}) => {
  const { pushToHistory } = useHistory();
  const { getParam } = useQueryParams();
  const { user, displayName } = useAuth();
  const { ref, height } = useElementHeight<HTMLDivElement>();
  const { members, setMembers } = useMembers();

  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const removeMember = async () => {
    try {
      const project = getParam("project")!;
      const token = await user!.getIdToken();

      const params: DeleteMemberParams = {
        member_id: member.id,
        project_id: project,
        deleted_by: user!.uid,
      };

      const removedMember = await deleteMember(params, token);
      setMembers(members!.filter((m) => m.id !== member.id));

      pushToHistory({
        performed_by: displayName ?? user!.uid,
        action_type: "removed_from_project",
        performed_on: member.name,
        occurred_at: removedMember.deleted_on,
      });

      closeModal();
    } catch (err) {
      setError("deleteMember endpoint failed");
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
        <Spinner size={50} text="Removing member..." />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={styles.container}
        style={{ height: height ? `${height}px` : undefined }}
      >
        <Error errorMsg={error} />
      </div>
    );
  }

  return (
    <div className={styles.container} ref={ref}>
      <span className={styles.title}>Remove Member</span>
      <span className={styles.subtitle}>{SUBTITLE}</span>
      <span className={styles.highlightedMsg}>{member.name}</span>
      <input
        className={styles.input}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        placeholder={CONFIRM_STRING}
        autoFocus
      />
      <div className={styles.criticalInputMsg}>
        Type {CONFIRM_STRING} to confirm
      </div>
      <div className={styles.button}>
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

export default RemoveMember;
