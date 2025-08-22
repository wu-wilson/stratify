import { type SnackbarType } from "../../components/snackbar/types";

export type SnackbarMessage = {
  id: string;
  type: SnackbarType;
  message: string;
};

export type SnackbarContextType = {
  pushMessage: (message: Omit<SnackbarMessage, "id">) => void;
};
