import { useEffect, useMemo, useRef, useState } from "react";
import { type AutofillProps } from "./types";
import { type EnrichedOption } from "../dropdown/types";
import styles from "./Autofill.module.scss";

const Autofill = <T extends { id: string }>({
  options,
  selected,
  setSelected,
  renderSelected,
  getLabel = (option: T) => String(option),
  placeholder = "Search",
}: AutofillProps<T>) => {
  const ref = useRef<HTMLDivElement>(null);

  const [search, setSearch] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const enrichedOptions: EnrichedOption<T>[] = useMemo(() => {
    return options
      .map((o, i) => {
        return { id: i, label: getLabel(o), option: o };
      })
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [options, getLabel]);

  const filteredOptions: EnrichedOption<T>[] = useMemo(() => {
    return enrichedOptions.filter((o) =>
      o.label.toLowerCase().includes(search.toLowerCase())
    );
  }, [enrichedOptions, search]);

  const onClickOption = (option: T) => {
    if (!selected.find((item) => item.id === option.id)) {
      setSelected((prev) => [...prev, option]);
    }
    setOpen(false);
  };

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

  return (
    <div className={styles.container} ref={ref}>
      <input
        className={styles.search}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        onFocus={() => setOpen(true)}
        placeholder={placeholder}
      />
      {open && (
        <div className={styles.menu}>
          {filteredOptions
            .sort((a, b) => a.id - b.id)
            .map((o) => (
              <div
                key={o.id}
                className={styles.option}
                onClick={() => onClickOption(o.option)}
              >
                {o.label}
              </div>
            ))}
        </div>
      )}
      {selected.length > 0 && (
        <div className={styles.selected}>
          {selected.map((item) => renderSelected(item))}
        </div>
      )}
    </div>
  );
};

export default Autofill;
