import { type Dispatch, type ReactElement, type SetStateAction } from "react";

export type AutofillProps<T> = {
  options: T[];
  selected: T[];
  setSelected: Dispatch<SetStateAction<T[]>>;
  renderSelected: (item: T) => ReactElement<{ key: string | number }>;
  getLabel?: (option: T) => string;
  placeholder?: string;
};
