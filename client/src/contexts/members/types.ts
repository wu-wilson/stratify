import { type Dispatch, type SetStateAction } from "react";
import { type MemberEntity } from "../../services/members/types";

type BaseMembersContext = {
  setMembers: Dispatch<SetStateAction<MemberEntity[] | null>>;
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
