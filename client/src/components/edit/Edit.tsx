import { useState } from "react";
import { type EmRemPx } from "../../types";
import { FaEdit } from "react-icons/fa";
import styles from "./Edit.module.scss";

const Edit = ({
  text,
  setText,
  fontSize = "0.75rem",
  iconSize = "1rem",
  spacing = "0.3rem",
}: {
  text: string;
  setText: (text: string) => void;
  fontSize?: EmRemPx;
  iconSize?: EmRemPx;
  spacing?: EmRemPx;
}) => {
  const [edit, setEdit] = useState<boolean>(false);

  return (
    <div className={styles.container} style={{ fontSize }}>
      {edit ? (
        <input
          autoFocus
          className={styles.input}
          style={{ fontSize }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={() => setEdit(false)}
        />
      ) : (
        <>
          <span className={styles.text}>{text}</span>
          <FaEdit
            className={styles["icon"]}
            style={{
              marginLeft: spacing,
              minWidth: iconSize,
              minHeight: iconSize,
            }}
            onClick={() => setEdit(!edit)}
          />
        </>
      )}
    </div>
  );
};

export default Edit;
