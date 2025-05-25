import { useNavigate } from "react-router-dom";
import { FiLayers } from "react-icons/fi";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../../context/theme/ThemeProvider";
import Toggle from "../toggle/Toggle";
import styles from "./Navbar.module.scss";

type Page = {
  label: string;
  path: string;
};

const Navbar = () => {
  const theme = useTheme();
  const toggleTheme = () => {
    if (theme) {
      theme.setDarkMode(!theme.darkMode);
    }
  };

  const navigate = useNavigate();

  const pages: Page[] = [
    { label: "Projects", path: "/projects" },
    { label: "Updates", path: "/updates" },
    { label: "About", path: "/about" },
  ];

  return (
    <div className={styles["container"]}>
      <div className={styles["content"]}>
        <div className={styles["left"]}>
          <FiLayers className={styles["logo"]} />
          Stratify
        </div>
        <div className={styles["center"]}>
          {pages.map((page: Page) => (
            <span
              key={page.path}
              className={styles["nav-item"]}
              onClick={() => navigate(page.path)}
            >
              {page.label}
            </span>
          ))}
        </div>
        <div className={styles["right"]}>
          <Toggle
            checked={theme.darkMode}
            onToggle={toggleTheme}
            icons={{ checked: FaMoon, unchecked: FaSun }}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
