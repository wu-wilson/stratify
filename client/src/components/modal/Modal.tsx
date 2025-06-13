import { useEffect, useRef, useState, type ReactNode } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import styles from "./Modal.module.scss";

const Modal = ({
  setOpen,
  children,
}: {
  setOpen: (open: boolean) => void;
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
      setOpen(false);
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
        <IoMdCloseCircle
          className={styles.icon}
          onClick={() => setClosing(true)}
        />
        {children}
      </div>
    </div>
  );
};

export default Modal;
