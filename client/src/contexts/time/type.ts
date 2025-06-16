export type TimeFormat = "24hr" | "12hr";

export type TimeContextType = {
  format: TimeFormat;
  setFormat: (format: TimeFormat) => void;
};
