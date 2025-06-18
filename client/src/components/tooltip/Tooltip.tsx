import type { Placement } from "./types";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { useTheme } from "../../contexts/theme/ThemeProvider";
import { calculateTooltipPosition } from "./util";
import styles from "./Tooltip.module.scss";

const Tooltip = ({
  content,
  children,
  offset = 0,
  placement = "right",
  hoverDelay = 1000,
  condition = true,
}: {
  content: ReactNode;
  children: ReactNode;
  offset?: number;
  placement?: Placement;
  hoverDelay?: number;
  condition?: boolean;
}) => {
  const { darkMode } = useTheme();

  const [visible, setVisible] = useState<boolean>(false);
  const [position, setPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });

  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const delayTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updatePosition = () => {
    if (triggerRef.current && tooltipRef.current) {
      const trigger = triggerRef.current.getBoundingClientRect();
      const tooltip = tooltipRef.current.getBoundingClientRect();

      const position = calculateTooltipPosition(
        trigger,
        tooltip,
        offset,
        placement
      );
      setPosition(position);
    }
  };

  useLayoutEffect(() => {
    updatePosition();

    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, []);

  const handleMouseEnter = () => {
    updatePosition();
    delayTimer.current = setTimeout(() => {
      setVisible(true);
    }, hoverDelay);
  };

  const handleMouseLeave = () => {
    if (delayTimer.current) {
      clearTimeout(delayTimer.current);
    }
    setVisible(false);
  };

  useEffect(() => {
    return () => {
      if (delayTimer.current) {
        clearTimeout(delayTimer.current);
      }
    };
  }, []);

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={styles.trigger}
      >
        {children}
      </div>
      {condition &&
        createPortal(
          <div className={darkMode ? "dark-mode" : "light-mode"}>
            <div
              ref={tooltipRef}
              className={`${styles.container} ${styles[placement]} ${
                visible ? styles.visible : null
              }`}
              style={{
                top: `${position.top}px`,
                left: `${position.left}px`,
              }}
            >
              {content}
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default Tooltip;
