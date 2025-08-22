import { useContext } from "react";
import { SnackbarContext } from "../contexts/snackbar/SnackbarProvider";
import { type SnackbarContextType } from "../contexts/snackbar/types";

export const useSnackbar = (): SnackbarContextType => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};
