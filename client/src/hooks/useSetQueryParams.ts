import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useSetQueryParam = (key: string, value: string) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    if (searchParams.get(key) !== value) {
      searchParams.set(key, value);

      navigate(`${location.pathname}?${searchParams.toString()}`, {
        replace: true,
      });
    }
  }, [key, value, location.pathname, location.search, navigate]);
};
