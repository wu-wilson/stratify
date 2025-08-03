import { useEffect, useState, type ChangeEvent } from "react";
import { useQueryParams } from "../../../../../../hooks/query-params/useQueryParams";
import { useAuth } from "../../../../../../hooks/useAuth";
import { useElementHeight } from "../../../../../../hooks/useElementHeight";
import { createInvite } from "../../../../../../services/invites/invites.service";
import {
  type CreateInvitePayload,
  type InviteEntity,
} from "../../../../../../services/invites/types";
import Spinner from "../../../../../../components/spinner/Spinner";
import Error from "../../../../../../components/error/Error";
import styles from "./GenerateInvite.module.scss";

const GenerateInvite = ({
  setInvite,
}: {
  setInvite: (invite: InviteEntity | null) => void;
}) => {
  const { getParam } = useQueryParams();
  const { user } = useAuth();
  const { ref, height } = useElementHeight<HTMLDivElement>();

  const [maxUses, setMaxUses] = useState<string>("20");
  const [validationError, setValidationError] = useState<string | null>(null);
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) {
      setMaxUses(val);
    }
    if (val.trim() === "") {
      setValidationError("Field cannot be empty");
    } else {
      setValidationError(null);
    }
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [requestError, setRequestError] = useState<string | null>(null);

  const generateInvite = async () => {
    const project = getParam("project")!;

    try {
      const createInvitePayload: CreateInvitePayload = {
        created_by: user!.uid,
        project_id: project,
        max_uses: parseInt(maxUses, 10),
      };

      const { invite } = await createInvite(createInvitePayload);
      setInvite(invite);
    } catch (err) {
      setRequestError("createInvite endpoint failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      generateInvite();
    }
  }, [loading]);

  if (loading) {
    return (
      <div
        className={styles.container}
        style={{ height: height ? `${height}px` : undefined }}
      >
        <Spinner size={50} text={"Generating link..."} />
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
      <span className={styles.title}>Generate Invite</span>
      <label className={styles.label}>Max # of Uses</label>
      <input
        className={styles.input}
        value={maxUses}
        onChange={onInputChange}
        autoFocus
      />
      <div className={styles.inputError}>{validationError}</div>
      <div className={styles.generate}>
        <button onClick={() => setLoading(true)} disabled={maxUses === ""}>
          Generate
        </button>
      </div>
    </div>
  );
};

export default GenerateInvite;
