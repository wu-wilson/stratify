import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { type TimeContextType, type TimeFormat } from "./type";

const TimeContext = createContext<TimeContextType | undefined>(undefined);

export const TimeProvider = ({ children }: { children: ReactNode }) => {
  const [format, setFormat] = useState<TimeFormat>("12hr");

  useEffect(() => {
    const stored = localStorage.getItem("time-format");
    if (stored === "24hr" || stored === "12hr") {
      setFormat(stored);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("time-format", format);
  }, [format]);

  return (
    <TimeContext.Provider value={{ format, setFormat }}>
      {children}
    </TimeContext.Provider>
  );
};

export const useTime = (): TimeContextType => {
  const context = useContext(TimeContext);
  if (!context) {
    throw new Error("useTime must be used within a TimeProvider");
  }
  return context;
};
