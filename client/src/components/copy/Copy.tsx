import { useEffect, useRef, useState } from "react";
import { FaCopy } from "react-icons/fa";
import styles from "./Copy.module.scss";

const Copy = ({
  text,
  fontSize = "0.75rem",
  iconSize = "0.9rem",
  spacing = "0.3rem",
}: {
  text: string;
  fontSize?: string;
  iconSize?: string;
  spacing?: string;
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

  return (
    <div className={styles.container} style={{ fontSize }}>
      {text}
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
