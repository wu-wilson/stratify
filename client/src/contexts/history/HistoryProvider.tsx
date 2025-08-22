import { useQueryParams } from "../../hooks/query-params/useQueryParams";
import { useAuth } from "../../hooks/useAuth";
import { getHistory } from "../../services/history/history.service";
import { createContext, useEffect, useState, type ReactNode } from "react";
import { type HistoryContextType } from "./types";
import { type HistoryEntity } from "../../services/history/types";

export const HistoryContext = createContext<HistoryContextType | undefined>(
  undefined
);

export const HistoryProvider = ({ children }: { children: ReactNode }) => {
  const [history, setHistory] = useState<HistoryEntity[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { getParam } = useQueryParams();
  const project = getParam("project")!;

  useEffect(() => {
    setLoading(true);
  }, [project]);

  const fetchHistory = async () => {
    try {
      const history = await getHistory(project);
      setError(null);
      setHistory(history);
    } catch (error) {
      setError("getHistory endpoint failed");
      setHistory([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      fetchHistory();
    }
  }, [loading]);

  const { displayName } = useAuth();

  useEffect(() => {
    setLoading(true);
  }, [displayName]);

  const pushToHistory = (entry: HistoryEntity) => {
    if (history) {
      setHistory((prev) => [entry, ...prev!]);
    }
  };

  return (
    <HistoryContext.Provider
      value={{ history, pushToHistory, error, loading } as HistoryContextType}
    >
      {children}
    </HistoryContext.Provider>
  );
};
