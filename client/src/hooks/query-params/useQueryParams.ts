import { useLocation, useNavigate } from "react-router-dom";
import { type QueryParam } from "./types";

export const useQueryParams = () => {
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const getParam = (key: QueryParam): string | null => {
    const params = new URLSearchParams(search);
    return params.get(key);
  };

  const setParam = (key: QueryParam, value: string) => {
    const params = new URLSearchParams(search);
    params.set(key, value);
    navigate(`${pathname}?${params.toString()}`, { replace: true });
  };

  return { getParam, setParam };
};
