export type TimeFormat = "24hr" | "12hr";

export type TimeFormatContextType = {
  format: TimeFormat;
  formatString: string;
  setFormat: (format: TimeFormat) => void;
};
