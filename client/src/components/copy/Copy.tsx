import { useEffect, useRef, useState } from "react";
import { type EmRemPx } from "../../types";
import { FaCopy } from "react-icons/fa";
import styles from "./Copy.module.scss";
import { getTruncatedText } from "../../util";

const Copy = ({
  text,
  fontSize = "0.75rem",
  iconSize = "1rem",
  spacing = "0.5rem",
  maxTextLength = null,
}: {
  text: string;
  fontSize?: EmRemPx;
  iconSize?: EmRemPx;
  spacing?: EmRemPx;
  maxTextLength?: number | null;
}) => {
  const [jump, setJump] = useState(false);
  const iconRef = useRef<HTMLDivElement | null>(null);

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setJump(true);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  useEffect(() => {
    const handleAnimationEnd = () => {
      setJump(false);
    };

    if (iconRef.current && jump) {
      iconRef.current.addEventListener("animationend", handleAnimationEnd);
    }

    return () => {
      if (iconRef.current) {
        iconRef.current.removeEventListener("animationend", handleAnimationEnd);
      }
    };
  }, [jump]);

  const truncatedText = getTruncatedText(text, maxTextLength ?? text.length);

  return (
    <div className={styles.container} style={{ fontSize }}>
      {truncatedText}
      <div
        ref={iconRef}
        className={`${styles.icon} ${jump ? styles.jump : null}`}
        style={{ marginLeft: spacing }}
        onClick={copyText}
      >
        <FaCopy size={iconSize} />
      </div>
    </div>
  );
};

export default Copy;
