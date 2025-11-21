import { useEffect } from "react";
import { tabs } from "./constants";
import { useQueryParams } from "../../../hooks/query-params/useQueryParams";
import { SnackbarProvider } from "../../../contexts/snackbar/SnackbarProvider";
import { MembersProvider } from "../../../contexts/members/MembersProvider";
import { KanbanProvider } from "../../../contexts/kanban/KanbanProvider";
import { normalize } from "./util";
import Tabs from "../../../components/tabs/Tabs";
import People from "./people/People";
import Tags from "./tags/Tags";
import Board from "./board/Board";
import styles from "./ProjectViews.module.scss";

const ProjectViews = () => {
  const { getParam, setParam } = useQueryParams();

  const tabParam = getParam("tab");
  const tab = normalize(tabParam ?? tabs[0].label);

  useEffect(() => {
    if (!tabParam) {
      setParam({ tab });
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <Tabs
          tabWidth="6rem"
          tabs={tabs}
          selected={tab}
          onClick={(tab) => setParam({ tab: normalize(tab.label) })}
        />
      </div>
      <div className={styles.content}>
        <SnackbarProvider>
          <MembersProvider>
            <KanbanProvider>
              {tab === normalize(tabs[0].label) && <Board />}
              {tab === normalize(tabs[1].label) && <Tags />}
            </KanbanProvider>
            {tab === normalize(tabs[2].label) && <People />}
          </MembersProvider>
        </SnackbarProvider>
      </div>
    </div>
  );
};

export default ProjectViews;
