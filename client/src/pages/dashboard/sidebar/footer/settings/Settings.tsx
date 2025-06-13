import { useState } from "react";
import { pages } from "./util";
import { type SettingsPage } from "./Page/types";
import Page from "./Page/Page";
import styles from "./Settings.module.scss";

const Settings = () => {
  const [page, setPage] = useState<SettingsPage>(pages.get(1)!);

  const goToSubpage = (id: number) => {
    const subpage = pages.get(id);
    if (!subpage) {
      console.warn(`Subpage with id ${id} not found.`);
      return;
    }
    setPage(subpage);
  };

  const goBack = () => {
    const parentId = page.parent?.pageId;
    if (!parentId) {
      console.warn(`No parent for page ${page.id} was found.`);
      return;
    }
    const parentPage = pages.get(parentId);
    if (!parentPage) {
      console.warn(`Parent page with id ${parentId} not found.`);
      return;
    }
    setPage(parentPage);
  };

  return (
    <div className={styles.container}>
      {page && <Page page={page} goBack={goBack} goToSubpage={goToSubpage} />}
    </div>
  );
};

export default Settings;
