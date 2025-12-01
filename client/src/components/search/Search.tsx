import { type Dispatch, type SetStateAction } from "react";
import styles from "./Search.module.scss";

const Search = ({
  search,
  setSearch,
  placeholder = "Search",
}: {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  placeholder?: string;
}) => {
  return (
    <input
      className={styles.search}
      value={search}
      onChange={(e) => {
        setSearch(e.target.value.toLowerCase());
      }}
      placeholder={placeholder}
    />
  );
};

export default Search;
