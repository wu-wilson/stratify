import { useHistory } from "../../../../../../hooks/useHistory";
import { useTimeFormat } from "../../../../../../hooks/useTimeFormat";
import { ACTION_TYPE_LABELS, COLUMNS } from "./constants";
import { useMemo } from "react";
import Spinner from "../../../../../../components/spinner/Spinner";
import Error from "../../../../../../components/error/Error";
import SearchTable from "../../../../../../components/table/search-table/SearchTable";
import moment from "moment";
import styles from "./History.module.scss";

const History = () => {
  const { history, loading, error } = useHistory();
  const { formatString } = useTimeFormat();

  const rows = useMemo(() => {
    return loading
      ? []
      : history.map((h, index) => ({
          row: index + 1,
          ...h,
          action_type: ACTION_TYPE_LABELS[h.action_type],
          occurred_at: moment(h.occurred_at).format(formatString),
        }));
  }, [history, formatString]);

  if (loading) {
    return (
      <div className={styles.container}>
        <Spinner size={50} text={"Fetching history..."} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <Error errorMsg={error} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>Membership History</div>
      <SearchTable rows={rows} columns={COLUMNS} />
    </div>
  );
};

export default History;
