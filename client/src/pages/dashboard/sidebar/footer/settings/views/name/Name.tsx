import { useEffect, useState } from "react";
import { useAuth } from "../../../../../../../hooks/useAuth";
import { updateProfile } from "firebase/auth";
import { validateDisplayName } from "./util";
import { DISPLAY_NAME } from "./constants";
import { type View } from "../../types";
import Error from "../../../../../../../components/error/Error";
import Spinner from "../../../../../../../components/spinner/Spinner";
import styles from "./Name.module.scss";

const Name = ({ setView }: { setView: (view: View) => void }) => {
  const { user, displayName, setDisplayName } = useAuth();

  const [name, setName] = useState<string>(displayName ?? DISPLAY_NAME);
  const [requestError, setRequestError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const updateName = async () => {
    if (!user) return;
    try {
      await updateProfile(user, { displayName: name });
      setDisplayName(name);
      setView("root");
    } catch (err) {
      setRequestError("Firebase update profile endpoint failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      updateName();
    }
  }, [loading]);

  useEffect(() => {
    const { valid, msg } = validateDisplayName(name, displayName ?? "");
    if (valid) {
      setValidationError(null);
    } else {
      setValidationError(msg);
    }
  }, [name]);

  if (loading) {
    return <Spinner size={50} text="Updating..." />;
  }

  if (requestError) {
    return <Error errorMsg={requestError} />;
  }

  return (
    <>
      <span className={styles.title}>Display Name</span>
      <span className={styles.back} onClick={() => setView("root")}>
        &lt; Settings
      </span>
      <input
        className={styles.input}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Display name"
        autoFocus
      />
      <div className={styles.inputError}>{validationError}</div>
      <div className={styles.save}>
        <button onClick={() => setLoading(true)} disabled={!!validationError}>
          Save
        </button>
      </div>
    </>
  );
};

export default Name;
