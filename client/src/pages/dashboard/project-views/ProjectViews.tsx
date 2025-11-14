import { useEffect } from "react";
import { tabs } from "./constants";
import { useQueryParams } from "../../../hooks/query-params/useQueryParams";
import { SnackbarProvider } from "../../../contexts/snackbar/SnackbarProvider";
import { MembersProvider } from "../../../contexts/members/MembersProvider";
import { KanbanProvider } from "../../../contexts/kanban/KanbanProvider";
import Tabs from "../../../components/tabs/Tabs";
import People from "./people/People";
import Board from "./board/Board";
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
      <div className={styles.content}>
        <SnackbarProvider>
          <MembersProvider>
            {tab === "Board" && (
              <KanbanProvider>
                <Board />
              </KanbanProvider>
            )}
            {tab === "People" && <People />}
          </MembersProvider>
        </SnackbarProvider>
      </div>
    </div>
  );
};

export default ProjectViews;
