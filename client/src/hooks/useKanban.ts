import { useContext } from "react";
import { useProjects } from "./useProjects";
import { KanbanContext } from "../contexts/kanban/KanbanProvider";
import { type KanbanContextType } from "../contexts/kanban/types";

export const useKanban = (): KanbanContextType => {
  useProjects();
  const context = useContext(KanbanContext);
  if (!context) {
    throw new Error("useKanban must be used within a KanbanProvider");
  }
  return context;
};
