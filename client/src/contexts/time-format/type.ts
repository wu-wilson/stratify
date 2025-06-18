export type TimeFormat = "24hr" | "12hr";

export type TimeFormatContextType = {
  format: TimeFormat;
  setFormat: (format: TimeFormat) => void;
};
