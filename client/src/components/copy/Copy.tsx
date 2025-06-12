import { useEffect, useRef, useState } from "react";
import { FaCopy } from "react-icons/fa";
import styles from "./Copy.module.scss";

const Copy = ({ text, scale = 1 }: { text: string; scale?: number }) => {
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

  const fontSize = `${0.75 * scale}rem`;
  const iconSize = `${0.9 * scale}rem`;
  const spacing = `${0.3 * scale}rem`;

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
