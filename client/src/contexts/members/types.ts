import { type MemberEntity } from "../../services/members/types";

type BaseMembersContext = {
  project: string;
  setMembers: (members: MemberEntity[] | null) => void;
  error: string | null;
};

export type MembersContextType =
  | (BaseMembersContext & {
      loading: true;
      members: null;
    })
  | (BaseMembersContext & {
      loading: false;
      members: MemberEntity[];
    });
