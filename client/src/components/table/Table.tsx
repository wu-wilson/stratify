import { useEffect, useMemo, useState } from "react";
import { MdOutlineFirstPage, MdOutlineLastPage } from "react-icons/md";
import { type ActionIcons, type Column, type Row } from "./types";
import styles from "./Table.module.scss";
import Dropdown from "../dropdown/Dropdown";

const Table = ({
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
  const rowsPerPageOptions = [10, 20, 30, rows.length];
  const [rowsPerPage, setRowsPerPage] = useState<number>(rowsPerPageOptions[0]);

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
              <th
                className={`${styles.dataCell} ${styles.columnHeader}`}
                key={key}
              >
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
                {columns.map(({ key, render }) => (
                  <td className={styles.dataCell} key={key}>
                    {render ? render(row[key]) : row[key] ?? fallback}
                  </td>
                ))}
                {actionIcons.map((actionIcon, i) => (
                  <td className={styles.iconCell} key={i}>
                    {(actionIcon.render ? actionIcon.render(row) : true) && (
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
      <div className={styles.pagination}>
        Rows Per Page:
        <div className={styles.dropdown}>
          <Dropdown
            options={rowsPerPageOptions}
            selected={rowsPerPage}
            setSelected={setRowsPerPage}
            getLabel={(option: number) =>
              option === rows.length ? "All" : String(option)
            }
          />
        </div>
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
    </div>
  );
};

export default Table;
