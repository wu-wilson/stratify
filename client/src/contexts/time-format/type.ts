import { type Dispatch, type SetStateAction } from "react";

export type TimeFormat = "24hr" | "12hr";

export type TimeFormatContextType = {
  format: TimeFormat;
  formatString: string;
  setFormat: Dispatch<SetStateAction<TimeFormat>>;
};
