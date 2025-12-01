import { useContext } from "react";
import { SearchContext } from "../contexts/search/SearchProvider";
import { type SearchContextType } from "../contexts/search/types";

export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within an SearchContextProvider");
  }
  return context;
};
