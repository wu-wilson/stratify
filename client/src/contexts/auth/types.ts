import type { User } from "firebase/auth";

export type UserContextType = {
  user: User | null;
  loading: boolean;
};
