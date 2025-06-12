import { useState } from "react";
import { FaCopy } from "react-icons/fa";
import Tooltip from "../tooltip/Tooltip";
import styles from "./Copy.module.scss";

const Copy = ({ text, scale = 1 }: { text: string; scale?: number }) => {
  const [copied, setCopied] = useState(false);

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleMouseLeave = () => {
    if (copied) {
      setCopied(false);
    }
  };

  const fontSize = `${0.75 * scale}rem`;
  const iconSize = `${0.9 * scale}rem`;
  const spacing = `${0.3 * scale}rem`;

  return (
    <div className={styles.container} style={{ fontSize }}>
      {text}
      <Tooltip
        content={copied ? "Copied!" : "Copy UID"}
        placement="top"
        offset={10}
      >
        <FaCopy
          onClick={copyText}
          onMouseLeave={handleMouseLeave}
          className={styles.icon}
          style={{ marginLeft: spacing }}
          size={iconSize}
        />
      </Tooltip>
    </div>
  );
};

export default Copy;
