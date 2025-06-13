import type { ReactNode } from "react";

type Row = {
  id: number;
  label: string;
  content: ReactNode;
  subpage?: number;
};

type Section = {
  id: number;
  rows: Row[];
  onSave?: () => void;
};

export type Page = {
  id: number;
  parent?: { pageId: number; sectionId: number; rowId: number };
  sections: Section[];
};
