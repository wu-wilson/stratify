import type { ReactNode } from "react";

export type Row = {
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

export type SettingsPage = {
  id: number;
  parent?: { pageId: number; sectionId: number; rowId: number };
  sections: Section[];
};
