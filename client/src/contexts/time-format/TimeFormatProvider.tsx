import {
  createContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { type TimeFormatContextType, type TimeFormat } from "./type";

export const TimeFormatContext = createContext<
  TimeFormatContextType | undefined
>(undefined);

export const TimeFormatProvider = ({ children }: { children: ReactNode }) => {
  const [format, setFormat] = useState<TimeFormat>(
    (localStorage.getItem("time-format") as TimeFormat) ?? "12hr"
  );

  const formatString = useMemo(() => {
    return `MMM D, YYYY ${format === "24hr" ? "H:mm" : "h:mm A"}`;
  }, [format]);

  useEffect(() => {
    localStorage.setItem("time-format", format);
  }, [format]);

  return (
    <TimeFormatContext.Provider value={{ format, formatString, setFormat }}>
      {children}
    </TimeFormatContext.Provider>
  );
};
