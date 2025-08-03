import { useEffect, useRef, useState, type ReactNode } from "react";
import { IoMdClose } from "react-icons/io";
import styles from "./Modal.module.scss";

const Modal = ({
  close,
  children,
}: {
  close: () => void;
  children: ReactNode;
}) => {
  const [opening, setOpening] = useState<boolean>(false);
  const [closing, setClosing] = useState<boolean>(false);

  useEffect(() => {
    setOpening(true);
  }, []);

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setClosing(true);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleTransitionEnd = () => {
    if (closing) {
      close();
    }
  };

  return (
    <div
      className={[
        styles.container,
        opening && styles.open,
        closing && styles.close,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        className={[
          styles.card,
          opening && styles.open,
          closing && styles.close,
        ]
          .filter(Boolean)
          .join(" ")}
        ref={cardRef}
        onTransitionEnd={handleTransitionEnd}
      >
        <button className={styles.closeBtn} onClick={() => setClosing(true)}>
          <IoMdClose className={styles.icon} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
