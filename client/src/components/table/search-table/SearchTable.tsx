import { useMemo, useState } from "react";
import { type ActionIcons, type Column, type Row } from "../types";
import Search from "../../search/Search";
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
      <Search search={search} setSearch={setSearch} />
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
