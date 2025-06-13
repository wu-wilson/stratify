import { useState } from "react";
import { getPage, getParentProp } from "./util";
import { type SettingsPage } from "./Page/types";
import Page from "./Page/Page";
import styles from "./Settings.module.scss";

const Settings = () => {
  const [page, setPage] = useState<SettingsPage>(getPage(1));

  const goToSubpage = (id: number) => {
    const subpage = getPage(id);
    setPage(subpage);
  };

  const goBack = () => {
    const parentId = getParentProp(page, "pageId");
    const parentPage = getPage(parentId);
    setPage(parentPage);
  };

  return (
    <div className={styles.container}>
      {page && <Page page={page} goBack={goBack} goToSubpage={goToSubpage} />}
    </div>
  );
};

export default Settings;
