import { useEffect, useRef, useState } from "react";
import { validateProjectName } from "./util";
import { useAuth } from "../../../../../contexts/auth/AuthProvider";
import { type ProjectEntity } from "../../../../../services/projects/types";
import Error from "../../../../../components/error/Error";
import Spinner from "../../../../../components/spinner/Spinner";
import styles from "./AddProject.module.scss";

const AddProject = ({
  projects,
  setProjects,
}: {
  projects: ProjectEntity[];
  setProjects: (projects: ProjectEntity[]) => void;
}) => {
  const { user } = useAuth();

  const [height, setHeight] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const height = ref.current.offsetHeight;
      setHeight(height);
    }
  }, []);

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [requestError, setRequestError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [adding, setAdding] = useState<boolean>(false);
  const [disableAdd, setDisableAdd] = useState<boolean>(true);

  const addProject = async () => {
    if (!user) return;
    try {
      console.log(`adding project: ${name}`);
    } catch (err) {
      setRequestError("Update profile endpoint failed");
    } finally {
      setAdding(false);
    }
  };

  useEffect(() => {
    if (adding) {
      addProject();
    }
  }, [adding]);

  useEffect(() => {
    const { valid, msg } = validateProjectName(name, projects);
    if (valid) {
      setDisableAdd(false);
    } else {
      setDisableAdd(true);
    }
    setValidationError(msg);
  }, [name]);

  if (adding) {
    return (
      <div className={styles.container}>
        <Spinner size={50} text={"Adding..."} />
      </div>
    );
  }

  if (requestError) {
    return (
      <div className={styles.container}>
        <Error errorMsg={requestError} />
      </div>
    );
  }

  return (
    <div className={styles.container} ref={ref}>
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
      <div className={styles.add}>
        <button onClick={() => setAdding(true)} disabled={disableAdd}>
          Create
        </button>
      </div>
    </div>
  );
};

export default AddProject;
