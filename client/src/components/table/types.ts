import type { IconType } from "react-icons";

export type Row = {
  [key: string]: string | number | boolean | undefined | null;
};

export type Column<T extends Row> = {
  key: Extract<keyof T, string>;
  label: string;
};

export type ActionIcons = {
  icon: IconType;
  onClick: (row: Row) => void;
  render: (row: Row) => boolean;
};
