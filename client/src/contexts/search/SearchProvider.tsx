import { createContext, useState, type ReactNode } from "react";
import { type SearchContextType } from "./types";
import Search from "../../components/search/Search";

export const SearchContext = createContext<SearchContextType | undefined>(
  undefined
);

export const SearchProvider = ({
  children,
  placeholder = undefined,
}: {
  children: ReactNode;
  placeholder?: string;
}) => {
  const [search, setSearch] = useState<string>("");

  return (
    <SearchContext.Provider value={{ search, setSearch } as SearchContextType}>
      <Search search={search} setSearch={setSearch} placeholder={placeholder} />
      {children}
    </SearchContext.Provider>
  );
};
