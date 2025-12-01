import { type Dispatch, type SetStateAction } from "react";

export type EnrichedOption<T> = {
  id: number;
  label: string;
  option: T;
};

export type DropdownProps<T> = {
  options: T[];
  selected: T;
  setSelected: Dispatch<SetStateAction<T>>;
  getLabel?: (option: T) => string;
  placeholder?: string;
  maxTextLength?: number | null;
};
