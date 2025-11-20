import { useQueryParams } from "../../hooks/query-params/useQueryParams";
import { getMembers } from "../../services/members/members.service";
import { useAuth } from "../../hooks/useAuth";
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

  const { user, displayName } = useAuth();
  const { getParam } = useQueryParams();

  const project = getParam("project")!;

  useEffect(() => {
    setLoading(true);
  }, [project]);

  const fetchMembers = async () => {
    try {
      const token = await user!.getIdToken();
      const membersList = await getMembers(project, token);
      setError(null);
      setMembers(membersList);
    } catch (error) {
      setError("getMembers endpoint failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      fetchMembers();
    }
  }, [loading]);

  useEffect(() => {
    setLoading(true);
  }, [displayName]);

  return (
    <MembersContext.Provider
      value={{ members, setMembers, loading, error } as MembersContextType}
    >
      {children}
    </MembersContext.Provider>
  );
};
