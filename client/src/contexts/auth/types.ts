import { type User } from "firebase/auth";
import { type Dispatch, type SetStateAction } from "react";

export type UserContextType = {
  user: User | null;
  loading: boolean;
  displayName: string | null;
  setDisplayName: Dispatch<SetStateAction<string | null>>;
};
