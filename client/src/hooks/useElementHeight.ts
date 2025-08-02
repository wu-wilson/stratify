import { useEffect, useRef, useState } from "react";

export const useElementHeight = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.offsetHeight);
    }
  }, []);

  return { ref, height };
};
