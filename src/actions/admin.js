import useSWR, { mutate } from "swr";
import { useMemo } from "react";

import { endpoints } from "../utils/axios";
import { useFetcher } from "../hooks/use-fetcher";

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  errorRetryCount: 0,
};

// ---------------------------------------------------------------------- //
// -------------------------------- users ------------------------------- //
// ---------------------------------------------------------------------- //

export function useGetUsers(user) {
  const url = user ? null : [endpoints.Users.list];

  const fetcher = useFetcher();

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions
  );
  const users = data?.users || [];
  const dropDownData = users.map((user) => ({
    value: user.bybit_subuid,
    label: user.bybit_username,
  }));
  const userList = users.map((user) => ({
    ...user,
    user_id: user.id,
  }));

  const memoizedValue = useMemo(
    () => ({
      users: userList,
      usersDropDownData: dropDownData || [],
      recordsLength: data?.count || 0,
      usersLoading: isLoading,
      usersError: error,
      usersValidating: isValidating,
      refetch: () => mutate(url),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetUser(userId) {
  const fetcher = useFetcher();
  const url = userId ? [endpoints.Users.details(userId)] : "";

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      user: data?.user || {},
      userLoading: isLoading,
      userError: error,
      userValidating: isValidating,
      refetch: () => mutate(url),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data?.user, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ---------------------------------------------------------------------- //
// -------------------------------- user-kyc ------------------------------- //
// ---------------------------------------------------------------------- //

export function useGetUsersKYC() {
  const url = endpoints.usersKYC.list;

  const fetcher = useFetcher();

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions
  );
  const kycList = data?.kyc_list.map((kyc) => ({
    ...kyc,
    kyc_id: kyc.id,
  }));

  const memoizedValue = useMemo(
    () => ({
      usersKYC: kycList || [],
      recordsLength: data?.count || 0,
      usersKYCLoading: isLoading,
      usersKYCError: error,
      usersKYCValidating: isValidating,
      refetch: () => mutate(url),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ---------------------------------------------------------------------- //

export function useGetDocType() {
  const url = endpoints.docType;

  const fetcher = useFetcher();

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      docTypes: data || [],
      // recordsLength: data?.count || 0,
      docTypesLoading: isLoading,
      docTypesError: error,
      docTypesValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ---------------------------------------------------------------------- //

export function useGetKycStatus() {
  const url = endpoints.usersKYC.kycStatuses;

  const fetcher = useFetcher();

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      kycStatuses: data?.data?.kyc_statuses || [],
      // recordsLength: data?.count || 0,
      kycStatusesLoading: isLoading,
      kycStatusesError: error,
      kycStatusesValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ---------------------------------------------------------------------- //
// ----------------------------- Withdrawal ----------------------------- //
// ---------------------------------------------------------------------- //

export function useGetWithdrawRequests() {
  const url = endpoints.withdrawRequest.list;

  const fetcher = useFetcher();

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions
  );

  const withdrawList = data?.map((withdraw) => ({
    ...withdraw,
    withdraw_id: withdraw.id,
  }));

  const memoizedValue = useMemo(
    () => ({
      data: withdrawList || [],
      loading: isLoading,
      error: error,
      validating: isValidating,
      refetch: () => mutate(url)
    }),
    [error, isLoading, isValidating, withdrawList]
  );

  return memoizedValue;
}
