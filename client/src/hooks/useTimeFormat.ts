import { useContext } from "react";
import { TimeFormatContext } from "../contexts/time-format/TimeFormatProvider";
import { type TimeFormatContextType } from "../contexts/time-format/type";

export const useTimeFormat = (): TimeFormatContextType => {
  const context = useContext(TimeFormatContext);
  if (!context) {
    throw new Error("useTime must be used within a TimeProvider");
  }
  return context;
};
