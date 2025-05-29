import type { AuthProvider } from "firebase/auth";
import type { IconType } from "react-icons";

export type Provider = {
  label: string;
  icon: IconType;
  provider: AuthProvider;
  class: string;
};
