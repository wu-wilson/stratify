import { useEffect, useState } from "react";
import { useAuth } from "../../../../../hooks/useAuth";
import { useProjects } from "../../../../../hooks/useProjects";
import { useQueryParams } from "../../../../../hooks/query-params/useQueryParams";
import { createProject } from "../../../../../services/projects/projects.service";
import { validateProjectName } from "./util";
import { DESCRIPTION_PLACEHOLDER, NAME_PLACEHOLDER } from "./constants";
import { type CreateProjectPayload } from "../../../../../services/projects/types";
import { type RequestTemplate } from "../../../../../components/modal/modal-template/modal-request-template/types";
import ModalRequestTemplate from "../../../../../components/modal/modal-template/modal-request-template/ModalRequestTemplate";

const CreateProject = ({ closeModal }: { closeModal: () => void }) => {
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
    const { valid, msg } = validateProjectName(name, projects!);
    if (valid) {
      setValidationError(null);
    } else {
      setValidationError(msg);
    }
  }, [name]);

  const template: RequestTemplate[] = [
    { type: "title", value: "New Project" },
    {
      type: "input",
      label: "Name",
      value: name,
      setValue: setName,
      placeholder: NAME_PLACEHOLDER,
      criticalMsg: validationError,
      autoFocus: true,
    },
    {
      type: "textarea",
      label: "Description",
      value: description,
      setValue: setDescription,
      placeholder: DESCRIPTION_PLACEHOLDER,
      criticalMsg: null,
    },
  ];

  return (
    <ModalRequestTemplate
      template={template}
      loading={loading}
      setLoading={setLoading}
      loadingMsg={"Creating project..."}
      error={requestError}
      request={addProject}
      button={{ label: "Create", disabled: !!validationError }}
    />
  );
};

export default CreateProject;
