import { type Row, type SettingsPage } from "./types";
import { pages } from "../config";
import styles from "./Page.module.scss";

const Page = ({
  page,
  goBack,
  goToSubpage,
}: {
  page: SettingsPage;
  goBack: () => void;
  goToSubpage: (id: number) => void;
}) => {
  const handleClick = (row: Row) => {
    if (!row.subpage) return;
    goToSubpage(row.subpage);
  };
  return (
    <div className={styles.container}>
      <span className={styles["title"]} onClick={goBack}>
        {/* {page.id === 1
          ? "Settings"
          : page.parent
          ? `< ${
              pages
                .get(page.parent.pageId)!
                .sections.find((s) => s.id === page.parent!.sectionId)
                ?.rows.find((r) => r.id === page.parent!.rowId)!.label
            }`
          : null} */}
      </span>
      {page.sections.map((section) => (
        <div key={section.id}>
          {section.rows.map((row) => (
            <div key={row.id} onClick={() => handleClick(row)}>
              {row.label}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Page;
