import { type HistoryEntity } from "../../services/history/types";

type BaseHistoryContext = {
  pushToHistory: (entry: HistoryEntity) => void;
  error: string | null;
};

export type HistoryContextType =
  | (BaseHistoryContext & {
      loading: true;
      history: null;
    })
  | (BaseHistoryContext & {
      loading: false;
      history: HistoryEntity[];
    });
