import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { type TimeFormatContextType, type TimeFormat } from "./type";

const TimeFormatContext = createContext<TimeFormatContextType | undefined>(
  undefined
);

export const TimeFormatProvider = ({ children }: { children: ReactNode }) => {
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
    <TimeFormatContext.Provider value={{ format, setFormat }}>
      {children}
    </TimeFormatContext.Provider>
  );
};

export const useTime = (): TimeFormatContextType => {
  const context = useContext(TimeFormatContext);
  if (!context) {
    throw new Error("useTime must be used within a TimeProvider");
  }
  return context;
};
