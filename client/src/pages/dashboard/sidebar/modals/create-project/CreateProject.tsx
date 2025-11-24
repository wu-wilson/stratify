import { useEffect, useState } from "react";
import { useElementHeight } from "../../../../../hooks/useElementHeight";
import { useAuth } from "../../../../../hooks/useAuth";
import { useProjects } from "../../../../../hooks/useProjects";
import { useQueryParams } from "../../../../../hooks/query-params/useQueryParams";
import { createProject } from "../../../../../services/projects/projects.service";
import { validateProjectName } from "./util";
import { type CreateProjectPayload } from "../../../../../services/projects/types";
import Spinner from "../../../../../components/spinner/Spinner";
import Error from "../../../../../components/error/Error";
import styles from "../../../../../components/modal/BaseModalContent.module.scss";
import { DESCRIPTION_PLACEHOLDER, NAME_PLACEHOLDER } from "./constants";

const CreateProject = ({ closeModal }: { closeModal: () => void }) => {
  const { ref, height } = useElementHeight<HTMLDivElement>();
  const { user } = useAuth();
  const { projects, setProjects } = useProjects();
  const { setParam } = useQueryParams();

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [requestError, setRequestError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const addProject = async () => {
    if (!user) return;
    try {
      const token = await user!.getIdToken();

      const payload: CreateProjectPayload = {
        name: name.trim(),
        description: description ?? undefined,
      };

      const newProject = await createProject(payload, token);
      setParam({ project: newProject.project.id });
      setProjects((prev) => [newProject.project, ...prev!]);

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
      setValidationError(null);
    } else {
      setValidationError(msg);
    }
  }, [name]);

  if (loading) {
    return (
      <div
        className={styles.container}
        style={{ height: height ? `${height}px` : undefined }}
      >
        <Spinner size={50} text="Creating project..." />
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
      <span className={styles.title}>New Project</span>
      <span className={styles.label}>Name</span>
      <input
        className={styles.input}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={NAME_PLACEHOLDER}
        autoFocus
      />
      {validationError && (
        <div className={styles.criticalInputMsg}>{validationError}</div>
      )}
      <span className={styles.label}>Description</span>
      <textarea
        className={styles.textarea}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder={DESCRIPTION_PLACEHOLDER}
      />
      <div className={styles.button}>
        <button onClick={() => setLoading(true)} disabled={!!validationError}>
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateProject;
