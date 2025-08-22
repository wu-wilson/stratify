import { type Dispatch, type SetStateAction } from "react";

export type ThemeContextType = {
  darkMode: boolean | null;
  setDarkMode: Dispatch<SetStateAction<boolean | null>>;
  auto: boolean;
  setAuto: Dispatch<SetStateAction<boolean>>;
};
