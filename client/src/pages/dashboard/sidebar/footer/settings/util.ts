import { pages } from "./config";
import { type Page } from "./types";

export const getPage = (id: number): Page => {
  const page = pages.find((p) => p.id === id);
  if (!page) {
    throw new Error(`Page with id ${id} not found`);
  }
  return page;
};

export const getParentProp = <K extends keyof NonNullable<Page["parent"]>>(
  page: Page,
  type: K
): NonNullable<Page["parent"]>[K] => {
  const parent = page.parent;
  if (!parent) {
    throw new Error(`Parent not found for page with id ${page.id}`);
  }
  return parent[type];
};
