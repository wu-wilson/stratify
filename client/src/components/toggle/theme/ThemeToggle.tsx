import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../../../hooks/useTheme";
import Toggle from "../Toggle";

const ThemeToggle = ({
  id,
  disabled = false,
}: {
  id: string;
  disabled?: boolean;
}) => {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <Toggle
      id={`theme-toggle-${id}`}
      checked={darkMode ? darkMode : false}
      setChecked={setDarkMode}
      icons={{ checked: FaMoon, unchecked: FaSun }}
      disabled={disabled}
    />
  );
};

export default ThemeToggle;
