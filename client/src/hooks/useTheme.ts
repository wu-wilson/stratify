import { useContext } from "react";
import { ThemeContext } from "../contexts/theme/ThemeProvider";
import { type ThemeContextType } from "../contexts/theme/types";

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
