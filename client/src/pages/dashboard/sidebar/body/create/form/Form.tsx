import { useEffect, useState } from "react";
import { validateProjectName } from "./util";
import { useAuth } from "../../../../../../hooks/useAuth";
import { useProjects } from "../../../../../../hooks/useProjects";
import { useQueryParams } from "../../../../../../hooks/query-params/useQueryParams";
import { createProject } from "../../../../../../services/projects/projects.service";
import { type CreateProjectPayload } from "../../../../../../services/projects/types";
import Spinner from "../../../../../../components/spinner/Spinner";
import Error from "../../../../../../components/error/Error";
import styles from "./Form.module.scss";

const Form = ({ closeModal }: { closeModal: () => void }) => {
  const { user } = useAuth();
  const { projects, setProjects } = useProjects();
  const { setParam } = useQueryParams();

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [requestError, setRequestError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [disableCreate, setDisableCreate] = useState<boolean>(true);

  const addProject = async () => {
    if (!user) return;
    try {
      const createProjectPayload: CreateProjectPayload = {
        owner_id: user.uid,
        name: name.trim(),
        description: description ?? undefined,
      };
      const newProject = await createProject(createProjectPayload);
      setParam({ project: newProject.id });
      setProjects([newProject, ...projects!]);
      closeModal();
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
    const { valid, msg } = validateProjectName(name, projects!);
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
