import { useContext } from "react";
import { HistoryContext } from "../contexts/history/HistoryProvider";
import { type HistoryContextType } from "../contexts/history/types";

export const useHistory = (): HistoryContextType => {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error("useHistory must be used within a HistoryProvider");
  }
  return context;
};
