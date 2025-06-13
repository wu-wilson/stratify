import { useState } from "react";
import { getPage, getParentProp } from "./util";
import { type Page } from "./types";
import styles from "./Settings.module.scss";

const Settings = () => {
  const [page, setPage] = useState<Page>(getPage(1));

  const goToSubpage = (id: number) => {
    const subpage = getPage(id);
    setPage(subpage);
  };

  const goBack = () => {
    const parentId = getParentProp(page, "pageId");
    const parentPage = getPage(parentId);
    setPage(parentPage);
  };

  return <div className={styles.container}>{page.id}</div>;
};

export default Settings;
