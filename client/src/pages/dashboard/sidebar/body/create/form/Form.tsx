import { useEffect, useState } from "react";
import { validateProjectName } from "./util";
import { useAuth } from "../../../../../../contexts/auth/AuthProvider";
import { type ProjectEntity } from "../../../../../../services/projects/types";
import Spinner from "../../../../../../components/spinner/Spinner";
import Error from "../../../../../../components/error/Error";
import styles from "./Form.module.scss";

const Form = ({
  projects,
  setProjects,
}: {
  projects: ProjectEntity[];
  setProjects: (projects: ProjectEntity[]) => void;
}) => {
  const { user } = useAuth();

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [requestError, setRequestError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [disableCreate, setDisableCreate] = useState<boolean>(true);

  const addProject = async () => {
    if (!user) return;
    try {
      console.log(`created project: ${name}`);
    } catch (err) {
      setRequestError("createProject endpoint failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      addProject();
    }
  }, [loading]);

  useEffect(() => {
    const { valid, msg } = validateProjectName(name, projects);
    if (valid) {
      setDisableCreate(false);
    } else {
      setDisableCreate(true);
    }
    setValidationError(msg);
  }, [name]);

  if (loading) {
    return <Spinner size={50} text={"Creating..."} />;
  }

  if (requestError) {
    return <Error errorMsg={requestError} />;
  }

  return (
    <>
      <span className={styles.title}>New Project</span>
      <input
        className={styles.input}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        autoFocus
      />
      <div className={styles.inputError}>{validationError}</div>
      <textarea
        className={styles.textarea}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        autoFocus
      />
      <div className={styles.create}>
        <button onClick={() => setLoading(true)} disabled={disableCreate}>
          Create
        </button>
      </div>
    </>
  );
};

export default Form;
