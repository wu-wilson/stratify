import { createContext, useEffect, useState, type ReactNode } from "react";
import { type TimeFormatContextType, type TimeFormat } from "./type";

export const TimeFormatContext = createContext<
  TimeFormatContextType | undefined
>(undefined);

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
