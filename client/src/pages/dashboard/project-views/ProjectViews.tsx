import { useEffect } from "react";
import { tabs } from "./constants";
import { useQueryParams } from "../../../hooks/query-params/useQueryParams";
import Tabs from "../../../components/tabs/Tabs";
import Overview from "./overview/Overview";
import People from "./people/People";
import Statuses from "./statuses/Statuses";
import styles from "./ProjectViews.module.scss";
import { SnackbarProvider } from "../../../contexts/snackbar/SnackbarProvider";

const ProjectViews = () => {
  const { getParam, setParam } = useQueryParams();

  const tab = getParam("tab") ?? tabs[0].label;

  useEffect(() => {
    setParam({ tab: tab });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <Tabs
          tabWidth="7rem"
          tabs={tabs}
          selectedTab={tab}
          onClick={(tab) => setParam({ tab: tab.label })}
        />
      </div>
      {tab === "Overview" && <Overview />}
      {tab === "Statuses" && (
        <SnackbarProvider>
          <Statuses />
        </SnackbarProvider>
      )}
      {tab === "People" && <People />}
    </div>
  );
};

export default ProjectViews;
