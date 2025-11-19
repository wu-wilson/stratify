import { useAuth } from "./useAuth";
import { useMembers } from "./useMembers";

export const useIsOwner = () => {
  const { user } = useAuth();
  const { members } = useMembers();

  const id = user?.uid;
  if (!id) return false;

  const currUser = members?.find((member) => member.id === id);
  return currUser?.role === "owner";
};
