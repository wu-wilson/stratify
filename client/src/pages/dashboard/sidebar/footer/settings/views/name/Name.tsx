import { useEffect, useState } from "react";
import { useAuth } from "../../../../../../../contexts/auth/AuthProvider";
import { updateProfile } from "firebase/auth";
import { type View } from "../../types";
import Error from "../../../../../../../components/error/Error";
import Spinner from "../../../../../../../components/spinner/Spinner";
import styles from "./Name.module.scss";

const Name = ({ setView }: { setView: (view: View) => void }) => {
  const { user } = useAuth();

  const [name, setName] = useState<string>(user?.displayName ?? "");
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState<boolean>(false);

  const updateName = async () => {
    if (!user) return;
    try {
      await updateProfile(user, { displayName: name });
      setError(null);
    } catch (err) {
      setError("Failed to update display name.");
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    if (updating) {
      updateName();
    }
  }, [updating]);

  if (updating) {
    return <Spinner size={50} text={"Updating..."} />;
  }

  if (error) {
    return <Error errorMsg={error} />;
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
      <div className={styles.save}>
        <button onClick={() => setUpdating(true)}>Save</button>
      </div>
    </>
  );
};

export default Name;
