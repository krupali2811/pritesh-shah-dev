import { fetcher as fetcherFunction } from "../utils/axios";

import useAuth from "./useAuth";

export const useFetcher = () => {
  const { logout } = useAuth();

  const fetcher = async (args) => {
    return await fetcherFunction(args, logout);
  };

  return fetcher;
};
