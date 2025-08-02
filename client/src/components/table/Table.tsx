import { useEffect, useMemo, useState } from "react";
import { MdOutlineFirstPage, MdOutlineLastPage } from "react-icons/md";
import { type ActionIcons, type Column, type Row } from "./types";
import styles from "./Table.module.scss";

const Table = <T extends Row>({
  columns,
  rows,
  fallback = "N/A",
  actionIcons = [],
  rowsPerPage = rows.length,
}: {
  columns: Column<T>[];
  rows: Row[];
  fallback?: string;
  actionIcons?: ActionIcons[];
  rowsPerPage?: number;
}) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(rows.length / rowsPerPage));

  const paginatedRows = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return rows.slice(start, start + rowsPerPage);
  }, [page, rowsPerPage, rows]);

  useEffect(() => {
    setPage(1);
  }, [rows]);

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map(({ key, label }) => (
              <th className={styles.dataCell} key={key}>
                {label}
              </th>
            ))}
            {actionIcons.map((_, i) => (
              <th className={styles.iconCell} key={i} />
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length < 1 ? (
            <tr>
              <td
                className={`${styles.dataCell} ${styles.noRecords}`}
                colSpan={columns.length}
              >
                No records were found
              </td>
            </tr>
          ) : (
            paginatedRows.map((row, i) => (
              <tr key={i}>
                {columns.map(({ key }) => (
                  <td className={styles.dataCell} key={key}>
                    {row[key] ?? fallback}
                  </td>
                ))}
                {actionIcons.map((actionIcon, i) => (
                  <td className={styles.iconCell} key={i}>
                    {actionIcon.render(row) && (
                      <actionIcon.icon
                        onClick={() => actionIcon.onClick(row)}
                        className={styles.icon}
                      />
                    )}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
      {rowsPerPage < rows.length && (
        <div className={styles.pagination}>
          Page {page} of {totalPages}
          <button
            className={styles.paginator}
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            <MdOutlineFirstPage className={styles.icon} />
          </button>
          <button
            className={styles.paginator}
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            <MdOutlineLastPage className={styles.icon} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;
