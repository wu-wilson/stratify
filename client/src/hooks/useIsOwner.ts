import { useMemo } from "react";
import { type User } from "firebase/auth";
import { type MemberEntity } from "../services/members/types";

export const useIsOwner = (
  user: User | null,
  members: MemberEntity[] | null
) => {
  return useMemo(() => {
    const id = user?.uid;
    if (!id) return false;

    const currUser = members?.find((member) => member.id === id);
    return currUser?.role === "owner";
  }, [user, members]);
};
