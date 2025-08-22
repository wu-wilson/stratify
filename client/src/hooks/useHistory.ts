import { useContext } from "react";
import { useProjects } from "./useProjects";
import { HistoryContext } from "../contexts/history/HistoryProvider";
import { type HistoryContextType } from "../contexts/history/types";

export const useHistory = (): HistoryContextType => {
  useProjects();
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error("useHistory must be used within a HistoryProvider");
  }
  return context;
};
