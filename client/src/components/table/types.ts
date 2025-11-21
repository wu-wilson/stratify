import { type ReactNode } from "react";
import { type IconType } from "react-icons";

export type Row = {
  [key: string]: string | number | boolean | undefined | null;
};

export type Column = {
  key: keyof Row;
  label: string;
  render?: (value: Row[keyof Row]) => ReactNode;
};

export type ActionIcons = {
  icon: IconType;
  onClick: (row: Row) => void;
  render?: (row: Row) => boolean;
};
