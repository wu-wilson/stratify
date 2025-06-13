import { pages } from "./config";
import { type SettingsPage } from "./Page/types";

export const getPage = (id: number): SettingsPage => {
  const page = pages.find((p) => p.id === id);
  if (!page) {
    throw new Error(`Page with id ${id} not found`);
  }
  return page;
};

export const getParentProp = <
  K extends keyof NonNullable<SettingsPage["parent"]>
>(
  page: SettingsPage,
  type: K
): NonNullable<SettingsPage["parent"]>[K] => {
  const parent = page.parent;
  if (!parent) {
    throw new Error(`Parent not found for page with id ${page.id}`);
  }
  return parent[type];
};
