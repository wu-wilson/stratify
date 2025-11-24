import { type Dispatch, type SetStateAction } from "react";
import { type InviteEntity } from "../../../../services/invites/types";
import { type MemberEntity } from "../../../../services/members/types";

export type ModalOptions =
  | {
      type: "removeMember";
      member: MemberEntity;
    }
  | {
      type: "makeOwner";
      member: MemberEntity;
    }
  | {
      type: "createInvite";
      invite: InviteEntity | null;
      setInvite: Dispatch<SetStateAction<InviteEntity | null>>;
    };
