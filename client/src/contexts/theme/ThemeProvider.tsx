import { type ThemeContextType } from "./types";
import { isNightTime } from "./util";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState<boolean | null>(null);
  const [auto, setAuto] = useState<boolean>(false);

  useEffect(() => {
    const storedAuto = localStorage.getItem("set-auto") === "true";
    if (storedAuto) {
      setAuto(true);
    } else {
      const storedDark = localStorage.getItem("dark-mode") === "true";
      setDarkMode(storedDark);
    }
  }, []);

  useEffect(() => {
    if (darkMode !== null) {
      localStorage.setItem("dark-mode", JSON.stringify(darkMode));
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("set-auto", JSON.stringify(auto));

    if (auto) {
      const isNight = isNightTime();
      setDarkMode(isNight);

      const interval = setInterval(() => {
        const isNight = isNightTime();
        setDarkMode(isNight);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [auto]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode, auto, setAuto }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
