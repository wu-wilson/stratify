import { useEffect } from "react";
import { tabs } from "./constants";
import { useQueryParams } from "../../../hooks/query-params/useQueryParams";
import { SnackbarProvider } from "../../../contexts/snackbar/SnackbarProvider";
import { KanbanProvider } from "../../../contexts/kanban/KanbanProvider";
import Tabs from "../../../components/tabs/Tabs";
import Overview from "./overview/Overview";
import People from "./people/People";
import Tasks from "./tasks/Tasks";
import styles from "./ProjectViews.module.scss";

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
      <SnackbarProvider>
        {tab === "Overview" && <Overview />}
        {tab === "Tasks" && (
          <KanbanProvider>
            <Tasks />
          </KanbanProvider>
        )}
        {tab === "People" && <People />}
      </SnackbarProvider>
    </div>
  );
};

export default ProjectViews;
