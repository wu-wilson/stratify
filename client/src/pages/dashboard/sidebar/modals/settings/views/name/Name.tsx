import { useEffect, useState } from "react";
import { useAuth } from "../../../../../../../hooks/useAuth";
import { updateProfile } from "firebase/auth";
import { validateDisplayName } from "./util";
import { DISPLAY_NAME, NAME_PLACEHOLDER } from "./constants";
import { type View } from "../../types";
import { type Dispatch, type SetStateAction } from "react";
import { type RequestTemplate } from "../../../../../../../components/modal/modal-template/modal-request-template/types";
import ModalRequestTemplate from "../../../../../../../components/modal/modal-template/modal-request-template/ModalRequestTemplate";

const Name = ({ setView }: { setView: Dispatch<SetStateAction<View>> }) => {
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
    const { valid, msg } = validateDisplayName(name, displayName ?? "");
    if (valid) {
      setValidationError(null);
    } else {
      setValidationError(msg);
    }
  }, [name]);

  const template: RequestTemplate[] = [
    { type: "title", value: "Display Name" },
    {
      type: "navigate-back",
      label: "Settings",
      onClick: () => setView("root"),
    },
    {
      type: "input",
      label: "Display Name",
      value: name,
      setValue: setName,
      placeholder: NAME_PLACEHOLDER,
      criticalMsg: validationError,
      autoFocus: true,
    },
  ];

  return (
    <ModalRequestTemplate
      template={template}
      loading={loading}
      setLoading={setLoading}
      loadingMsg={"Updating name..."}
      error={requestError}
      request={updateName}
      button={{ label: "Save", disabled: !!validationError }}
    />
  );
};

export default Name;
