import { useQueryParams } from "../../hooks/query-params/useQueryParams";
import { getMembers } from "../../services/members/members.service";
import { createContext, useEffect, useState, type ReactNode } from "react";
import { type MembersContextType } from "./types";
import { type MemberEntity } from "../../services/members/types";

export const MembersContext = createContext<MembersContextType | undefined>(
  undefined
);

export const MembersProvider = ({ children }: { children: ReactNode }) => {
  const [members, setMembers] = useState<MemberEntity[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { getParam } = useQueryParams();
  const project = getParam("project")!;

  useEffect(() => {
    setLoading(true);
  }, [project]);

  const fetchMembers = async () => {
    try {
      const membersList = await getMembers(project);
      setError(null);
      setMembers(membersList);
    } catch (error) {
      setError("getMembers endpoint failed");
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      fetchMembers();
    }
  }, [loading]);

  return (
    <MembersContext.Provider
      value={
        { project, members, setMembers, loading, error } as MembersContextType
      }
    >
      {children}
    </MembersContext.Provider>
  );
};
