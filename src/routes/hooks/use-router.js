import { useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export function useRouter() {
  const navigate = useNavigate();
  const location = useLocation();

  const router = useMemo(
    () => ({
      back: () => navigate(-1),
      forward: () => navigate(1),
      refresh: () => navigate(0),
      push: (href, options = {}) => {
        const { state, query } = options;
        let path = href;

        if (query && Object.keys(query).length > 0) {
          const queryString = new URLSearchParams(query).toString();
          path += `?${queryString}`;
        }

        navigate(path, { state });
      },
      replace: (href, options = {}) => {
        const { state, query } = options;
        let path = href;

        if (query && Object.keys(query).length > 0) {
          const queryString = new URLSearchParams(query).toString();
          path += `?${queryString}`;
        }

        navigate(path, { state, replace: true });
      },
      query: Object.fromEntries(new URLSearchParams(location.search)), // Get query params as an object
      state: location.state || {}, // Get state data
      pathname: location.pathname, // Get current route path
    }),
    [navigate, location]
  );

  return router;
}
