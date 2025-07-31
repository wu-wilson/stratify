import { useContext } from "react";
import { useProjects } from "./useProjects";
import { MembersContext } from "../contexts/members/MembersProvider";
import { type MembersContextType } from "../contexts/members/types";

export const useMembers = (): MembersContextType => {
  useProjects();
  const context = useContext(MembersContext);
  if (!context) {
    throw new Error("useMembers must be used within a MembersProvider");
  }
  return context;
};
