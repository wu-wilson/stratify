import { useMemo, useState } from "react";
import { type ActionIcons, type Column, type Row } from "../types";
import Table from "../Table";
import styles from "./SearchTable.module.scss";

const SearchTable = ({
  columns,
  rows,
  fallback = "-",
  actionIcons = [],
}: {
  columns: Column[];
  rows: Row[];
  fallback?: string;
  actionIcons?: ActionIcons[];
}) => {
  const [search, setSearch] = useState<string>("");

  const filtered = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim();

    return rows.filter((row) =>
      columns.some(({ key }) => {
        const cell = row[key];

        return (
          cell !== undefined &&
          cell !== null &&
          String(cell).toLowerCase().includes(normalizedSearch)
        );
      })
    );
  }, [search, rows]);

  return (
    <div className={styles.container}>
      <input
        className={styles.search}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        placeholder="Search"
      />
      <Table
        columns={columns}
        rows={filtered}
        fallback={fallback}
        actionIcons={actionIcons}
      />
    </div>
  );
};

export default SearchTable;
