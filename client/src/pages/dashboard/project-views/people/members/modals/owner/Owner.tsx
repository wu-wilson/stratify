import { useEffect, useState } from "react";
import { useHistory } from "../../../../../../../hooks/useHistory";
import { updateRole } from "../../../../../../../services/members/members.service";
import { useElementHeight } from "../../../../../../../hooks/useElementHeight";
import { CONFIRM_STRING, SUBTITLE } from "./constants";
import { useMembers } from "../../../../../../../hooks/useMembers";
import { useQueryParams } from "../../../../../../../hooks/query-params/useQueryParams";
import { useAuth } from "../../../../../../../hooks/useAuth";
import {
  type MemberEntity,
  type UpdateRolePayload,
} from "../../../../../../../services/members/types";
import Spinner from "../../../../../../../components/spinner/Spinner";
import Error from "../../../../../../../components/error/Error";
import styles from "../../../../../../../components/modal/BaseModalContent.module.scss";

const Owner = ({
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

  const makeOwner = async () => {
    try {
      const project = getParam("project")!;

      const payload: UpdateRolePayload = {
        member_id: member.id,
        project_id: project,
        role: "owner",
        updated_by: user!.uid,
      };

      const updated = await updateRole(payload);
      setMembers(
        members!.map((m) => (m.id === member.id ? { ...m, role: "owner" } : m))
      );

      pushToHistory({
        performed_by: displayName ?? user!.uid,
        action_type: "promoted_to_owner",
        performed_on: member.name,
        occurred_at: updated.updated_on,
      });

      closeModal();
    } catch (err) {
      setError("updateRole endpoint failed");
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
        <Spinner size={50} text="Making owner..." />
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
      <span className={styles.title}>Make Owner</span>
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
          Update
        </button>
      </div>
    </div>
  );
};

export default Owner;
