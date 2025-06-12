import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarRightCollapse,
} from "react-icons/tb";
import Logo from "../../../../components/logo/Logo";
import styles from "./Header.module.scss";

const Header = ({
  expanded,
  setExpanded,
}: {
  expanded: boolean;
  setExpanded: (expand: boolean) => void;
}) => {
  return (
    <div
      className={`${styles.container} ${expanded ? null : styles.collapsed}`}
    >
      {expanded && <Logo />}
      {expanded ? (
        <TbLayoutSidebarLeftCollapse
          className={styles.icon}
          onClick={() => setExpanded(false)}
        />
      ) : (
        <TbLayoutSidebarRightCollapse
          className={styles.icon}
          onClick={() => setExpanded(true)}
        />
      )}
    </div>
  );
};

export default Header;
