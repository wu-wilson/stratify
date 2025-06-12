import { HashLoader } from "react-spinners";
import { useTheme } from "../../contexts/theme/ThemeProvider";
import { getCSSVar } from "../../styles/util";
import styles from "./Spinner.module.scss";

const Spinner = ({ size, text }: { size: number; text?: string }) => {
  const { darkMode } = useTheme();

  const color = getCSSVar(
    darkMode ? "--dark-mode-font-color" : "--light-mode-font-color"
  );

  return (
    <div className={styles.container}>
      <HashLoader size={size} color={color} />
      {text && <span className={styles.text}>{text}</span>}
    </div>
  );
};

export default Spinner;
