import { type Dispatch, type SetStateAction } from "react";

export type SearchContextType = {
  setSearch: Dispatch<SetStateAction<string>>;
  search: string;
};
