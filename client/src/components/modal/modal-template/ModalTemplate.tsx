import { HexColorPicker } from "react-colorful";
import { type Template } from "./types";
import Dropdown from "../../dropdown/Dropdown";
import Autofill from "../../autofill/Autofill";
import styles from "./ModalTemplate.module.scss";

const ModalTemplate = <D, A extends { id: string }>({
  template,
}: {
  template: Template<D, A>[];
}) => {
  const buttons = template.filter((c) => c.type === "button");

  return (
    <div className={styles.container}>
      {template.map((t, i) => {
        switch (t.type) {
          case "title":
          case "subtitle":
          case "highlight":
            return (
              <div key={`${t.type}-${i}`} className={styles[t.type]}>
                {t.value}
              </div>
            );
          case "navigate-back":
            return (
              <span className={styles.back} onClick={t.onClick}>
                &lt; {t.label}
              </span>
            );
          case "input":
            return (
              <div key={`input-${i}`} className={styles.group}>
                {t.label && <span className={styles.label}>{t.label}</span>}
                <input
                  className={styles.input}
                  value={t.value}
                  onChange={(e) => {
                    t.setValue(e.target.value);
                  }}
                  placeholder={t.placeholder}
                  autoFocus={t.autoFocus}
                />
                {t.criticalMsg && (
                  <div className={styles.criticalMsg}>{t.criticalMsg}</div>
                )}
              </div>
            );
          case "textarea":
            return (
              <div key={`textarea-${i}`} className={styles.group}>
                <span className={styles.label}>{t.label}</span>
                <textarea
                  className={styles.textarea}
                  value={t.value}
                  onChange={(e) => {
                    t.setValue(e.target.value);
                  }}
                  placeholder={t.placeholder}
                  autoFocus={t.autoFocus}
                />
                {t.criticalMsg && (
                  <div className={styles.criticalMsg}>{t.criticalMsg}</div>
                )}
              </div>
            );
          case "color-picker":
            return (
              <div
                key={`color-picker-${i}`}
                className={`${styles.group} ${styles.colorPicker}`}
              >
                <span className={styles.label}>Color</span>
                <HexColorPicker color={t.color} onChange={t.setColor} />
              </div>
            );
          case "dropdown":
            return (
              <div key={`dropdown-${i}`} className={styles.group}>
                <span className={styles.label}>{t.label}</span>
                <Dropdown
                  options={t.options}
                  selected={t.selected}
                  setSelected={t.setSelected}
                  getLabel={t.getLabel}
                  placeholder={t.placeholder}
                  maxTextLength={t.maxTextLength}
                />
              </div>
            );
          case "autofill":
            if (t.render === false) {
              return;
            }
            return (
              <div key={`autofill-${i}`} className={styles.group}>
                <span className={styles.label}>{t.label}</span>
                <Autofill
                  options={t.options}
                  selected={t.selected}
                  setSelected={t.setSelected}
                  renderSelected={t.renderSelected}
                  getLabel={t.getLabel}
                  placeholder={t.placeholder}
                />
              </div>
            );
          case "button":
            return null;
        }
      })}
      {buttons.length > 0 && (
        <div className={styles.buttons}>
          {buttons.map((b, i) => (
            <button key={`button-${i}`} onClick={b.onClick}>
              {b.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModalTemplate;
