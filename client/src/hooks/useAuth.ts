import { useContext } from "react";
import { useTheme } from "./useTheme";
import { AuthContext } from "../contexts/auth/AuthProvider";
import { type UserContextType } from "../contexts/auth/types";

export const useAuth = (): UserContextType => {
  useTheme();
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};
