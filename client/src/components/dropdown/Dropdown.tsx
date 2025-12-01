import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { getTruncatedText } from "../../util";
import { useEffect, useMemo, useRef, useState } from "react";
import { type DropdownProps, type EnrichedOption } from "./types";
import styles from "./Dropdown.module.scss";

const Dropdown = <T,>({
  options,
  selected,
  setSelected,
  getLabel = (option: T) => String(option),
  placeholder = "Select an option",
  maxTextLength = null,
}: DropdownProps<T>) => {
  const ref = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const triggerLabel = selected
    ? getTruncatedText(
        getLabel(selected),
        maxTextLength ?? getLabel(selected).length
      )
    : placeholder;

  const enrichedOptions: EnrichedOption<T>[] = useMemo(() => {
    return options
      .map((o, i) => {
        return { id: i, label: getLabel(o), option: o };
      })
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [options, getLabel]);

  const selectOption = (option: T) => {
    setSelected(option);
    setOpen(false);
  };

  return (
    <div className={styles.container} ref={ref}>
      <div className={styles.trigger} onClick={() => setOpen(!open)}>
        <span className={!selected ? styles.placeholder : undefined}>
          {triggerLabel}
        </span>
        {open ? (
          <MdArrowDropUp className={styles.icon} />
        ) : (
          <MdArrowDropDown className={styles.icon} />
        )}
      </div>
      {open && (
        <div className={styles.menu}>
          {enrichedOptions
            .sort((a, b) => a.id - b.id)
            .map((o) => (
              <div
                key={o.id}
                className={styles.option}
                onClick={() => selectOption(o.option)}
              >
                {o.label}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
