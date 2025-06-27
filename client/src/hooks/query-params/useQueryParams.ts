import { useLocation, useNavigate } from "react-router-dom";
import { type QueryParam } from "./types";

export const useQueryParams = () => {
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const getParam = (key: QueryParam): string | null => {
    const params = new URLSearchParams(search);
    return params.get(key);
  };

  const setParam = (updates: Partial<Record<QueryParam, string>>) => {
    const params = new URLSearchParams(search);
    Object.entries(updates).forEach(([key, value]) => {
      params.set(key, value);
    });
    navigate(`${pathname}?${params.toString()}`, { replace: true });
  };

  return { getParam, setParam };
};
