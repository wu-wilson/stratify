import { DISPLAY_NAME } from "../name/constants";
import { type User } from "firebase/auth";

export const getDisplayName = (user: User | null): string => {
  const name = user?.displayName ?? DISPLAY_NAME;
  return name.length > 17 ? `${name.slice(0, 17)}...` : name;
};
