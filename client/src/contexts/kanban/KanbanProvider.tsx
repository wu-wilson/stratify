import { useQueryParams } from "../../hooks/query-params/useQueryParams";
import { getStatuses } from "../../services/statuses/statuses.service";
import { getTaggings } from "../../services/taggings/taggings.service";
import { getTags } from "../../services/tags/tags.service";
import { getTasks } from "../../services/tasks/tasks.service";
import { callWithCustomError } from "./util";
import { createContext, useEffect, useState, type ReactNode } from "react";
import { type KanbanContextType, type KanbanState } from "./types";

export const KanbanContext = createContext<KanbanContextType | undefined>(
  undefined
);

export const KanbanProvider = ({ children }: { children: ReactNode }) => {
  const [kanban, setKanban] = useState<KanbanState[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { getParam } = useQueryParams();
  const project = getParam("project")!;

  useEffect(() => {
    setLoading(true);
  }, [project]);

  const fetchKanban = async () => {
    try {
      const [statuses, taggings, tags, tasks] = await Promise.all([
        callWithCustomError(
          getStatuses(project),
          "getStatuses endpoint failed"
        ),
        callWithCustomError(
          getTaggings(project),
          "getTaggings endpoint failed"
        ),
        callWithCustomError(getTags(project), "getTags endpoint failed"),
        callWithCustomError(getTasks(project), "getTasks endpoint failed"),
      ]);
      setError(null);
      setKanban([{ statuses, taggings, tags, tasks }]);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      fetchKanban();
    }
  }, [loading]);

  return (
    <KanbanContext.Provider
      value={{ kanban, setKanban, loading, error } as KanbanContextType}
    >
      {children}
    </KanbanContext.Provider>
  );
};
