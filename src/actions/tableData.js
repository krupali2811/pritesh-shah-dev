import useSWR, { mutate } from "swr";
import { useMemo } from "react";

import { endpoints } from "../utils/axios";
import { useFetcher } from "../hooks/use-fetcher";

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  errorRetryCount: 0,
};

// ---------------------------------------------------------------------- //
// -------------------------------- trade ------------------------------- //
// ---------------------------------------------------------------------- //

export function useGetCurrentOrders(query) {
  const url = query ? [endpoints.trade.currentOrders, { params: query }] : null;
  const fetcher = useFetcher();

  const {
    data,
    isLoading = false,
    error = null,
    isValidating = false,
  } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      data: data?.result?.list || [],
      loading: isLoading,
      currentOrdersError: error,
      currentOrdersValidating: isValidating,
    }),
    [data, isLoading, error, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetOrderHistory(query) {
  const url = query ? [endpoints.trade.orderHistory, { params: query }] : null;

  const fetcher = useFetcher();

  const {
    data,
    isLoading = false,
    error = null,
    isValidating = false,
  } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      data: data?.result?.list || [],
      loading: isLoading,
      orderHistoryError: error,
      orderHistoryValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetTradeHistory(query) {
  const url = query ? [endpoints.trade.tradeHistory, { params: query }] : null;

  const fetcher = useFetcher();

  const {
    data,
    isLoading = false,
    error = null,
    isValidating = false,
  } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      data: data?.result?.list || [],
      loading: isLoading,
      tradeHistoryError: error,
      tradeHistoryValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
// ----------------------------------------------------------------------

export function useGetSubscriptionRedemption(query) {
  const url = query
    ? [endpoints.trade.subscriptionRedemption, { params: query }]
    : "";

  const fetcher = useFetcher();

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      data: data?.result?.list || [],
      loading: isLoading,
      tradeHistoryError: error,
      tradeHistoryValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ---------------------------------------------------------------------- //
// --------------------------- funding-history -------------------------- //
// ---------------------------------------------------------------------- //

export function useGetMaxWalletUser(query) {
  const url = query
    ? [endpoints.fundingHistory.deposit, { params: query }]
    : "";

  const fetcher = useFetcher();

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      data: data?.wallets || [],
      loading: isLoading,
      tradeHistoryError: error,
      tradeHistoryValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ---------------------------------------------------------------------- //

export function useGetMaxOrdersUser(query) {
  const url = query ? [endpoints.fundingHistory.orders, { params: query }] : "";

  const fetcher = useFetcher();

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      data: data?.traders || [],
      loading: isLoading,
      tradeHistoryError: error,
      tradeHistoryValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ---------------------------------------------------------------------- //
// ---------------------------- Transactions ---------------------------- //
// ---------------------------------------------------------------------- //

export function useGetTransactions(query) {
  const url = query
    ? [endpoints.wallet.transactions, { params: query }]
    : endpoints.wallet.transactions;

  const fetcher = useFetcher();

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      data: data?.result?.list || [],
      loading: isLoading,
      transactionsError: error,
      transactionsValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ---------------------------------------------------------------------- //

export function useGetRecentWithdrawals(query, flag = false) {
  const url = query
    ? [endpoints.wallet.recentWithdrawals, { params: query }]
    : endpoints.wallet.recentWithdrawals;

  const fetcher = useFetcher();

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions
  );

  // Ensure we always get an array
  const output = flag
    ? Array.isArray(data?.result?.rows)
      ? data.result.rows
      : []
    : Array.isArray(data)
    ? data
    : [];

  // Normalize withdrawal objects with consistent withdrawal_id
  const recentWithdrawals = output.map((withdrawal) => ({
    ...withdrawal,
    withdrawal_id: flag ? withdrawal.withdrawId : withdrawal.id,
  }));

  const memoizedValue = useMemo(
    () => ({
      data: recentWithdrawals,
      loading: isLoading,
      transactionsError: error,
      transactionsValidating: isValidating,
      refetch: () => mutate(url),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ---------------------------------------------------------------------- //

export function useGetRecentDeposits(query) {
  const url = query
    ? [endpoints.wallet.recentDeposits, { params: query }]
    : endpoints.wallet.recentDeposits;

  const fetcher = useFetcher();

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions
  );
  // console.log(data?.result?.rows)

  const memoizedValue = useMemo(
    () => ({
      data: data?.result?.rows || [],
      loading: isLoading,
      transactionsError: error,
      transactionsValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ---------------------------------------------------------------------- //
// ------------------------------- Markets ------------------------------ //
// ---------------------------------------------------------------------- //

export function useGetSymbols(query, mode = null) {
  const url = query ? [endpoints.markets, { params: query }] : "";
  const fetcher = useFetcher();

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions
  );

  const spotQuoteAssets = [
    "USDT",
    "USDC",
    "USDE",
    "EUR",
    "BRL",
    "PLN",
    "TRY",
    "SOL",
    "BTC",
    "ETH",
    "DAI",
    "BRZ",
  ];

  const FutureKeys = {
    "usdt-perpetual": "USDT Perpetual",
    "usdc-perpetual": "USDC Perpetual",
    "usdt-futures": "USDT Futures",
    "usdc-futures": "USDC Futures",
    "inverse-perpetual": "Inverse Perpetual",
    "inverse-futures": "Inverse Futures",
  };

  const FuturesRegex = {
    "usdt-perpetual": /^[A-Z0-9]+USDT$/, // Ex: BTCUSDT, 1000PEPEUSDT
    "usdt-futures": /^[A-Z0-9]+USDT-\d{2}[A-Z]{3}\d{2}$/, // Ex: BTCUSDT-21FEB25
    "usdc-perpetual": /^[A-Z0-9]+PERP$/, // Ex: BTCPERP
    "usdc-futures": /^[A-Z0-9]+-\d{2}[A-Z]{3}\d{2}$/, // Ex: BTC-24MAR23
    "inverse-perpetual": /^[A-Z0-9]+USD$/, // Ex: BTCUSD
    "inverse-futures": /^[A-Z0-9]+USD[HMUZ]\d{2}$/, // Ex: BTCUSDH23
  };

  const tickerList = data?.result?.list || [];

  const getPriceByCoinUSDT = (coin) => {
    if (coin === "USDT") {
      return 1; // Return 1 for USDT since it's pegged to 1 USD
    }
    if (coin === "USD") {
      return 1; // Return 1 for USDT since it's pegged to 1 USD
    }

    const pair = tickerList.find((pair) => pair.symbol === `${coin}USDT`);
    return pair ? Number(pair.lastPrice) : 0; // Return the price or 0 if not found
  };
  // console.log(tickerList)
  const output = useMemo(() => {
    const categorized = {};
    if (query?.category === "spot") {
      tickerList.forEach((item) => {
        const { symbol } = item;
        for (const quote of spotQuoteAssets) {
          if (symbol.endsWith(quote)) {
            const base = symbol.slice(0, -quote.length);
            if (!categorized[quote]) categorized[quote] = [];
            categorized[quote].push({
              ...item, // Keep all original fields
              base_coin: base,
              quote_coin: quote,
              key: "Spot",
            });
            break;
          }
        }
      });

      const startsWith = {};
      const allPairs = Object.values(categorized).flat();

      Object.keys(categorized).forEach((quote) => {
        startsWith[quote] = allPairs.filter((item) => item.base_coin === quote);
      });

      const processedData = {
        ends_with: categorized,
        starts_with: startsWith,
      };

      return !mode
        ? processedData
        : query?.baseCoin === "all"
        ? allPairs
        : categorized[query?.baseCoin] || [];
    }

    if (query?.category === "linear" || query?.category === "inverse") {
      const futuresCategorized = {};

      tickerList.forEach((item) => {
        const { symbol } = item;

        for (const [key, regex] of Object.entries(FuturesRegex)) {
          if (regex.test(symbol)) {
            let base = "";
            let quote = "";

            // Parse base/quote depending on type
            if (key === "usdt-perpetual") {
              base = symbol.replace("USDT", "");
              quote = "USDT";
            } else if (key === "usdt-futures") {
              base = symbol.split("USDT-")[0];
              quote = "USDT";
            } else if (key === "usdc-perpetual") {
              base = symbol.replace("PERP", "");
              quote = "USDC";
            } else if (key === "usdc-futures") {
              [base, quote] = symbol.split("-");
              quote = "USDC"; // assumed from pattern
            } else if (key === "inverse-perpetual") {
              base = symbol.replace("USD", "");
              quote = "USD";
            } else if (key === "inverse-futures") {
              base = symbol.replace(/USD[HMUZ]\d{2}$/, "");
              quote = "USD";
            }

            if (!futuresCategorized[key]) futuresCategorized[key] = [];
            futuresCategorized[key].push({
              ...item,
              base_coin: base,
              quote_coin: quote,
              key: FutureKeys[key],
            });
            break;
          }
        }
      });

      const allFutures = Object.values(futuresCategorized).flat();
      // console.log(query?.type === "allFutures")
      return !mode
        ? futuresCategorized
        : query?.type === "all"
        ? allFutures
        : futuresCategorized[query?.type] || [];
    }
    return [];
  }, [query, tickerList, mode]);

  const memoizedValue = useMemo(
    () => ({
      data: output,
      getPriceByCoinUSDT,
      allPairs: tickerList,
      loading: isLoading,
      marketError: error,
      marketValidating: isValidating,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [error, isLoading, isValidating, output]
  );

  return memoizedValue;
}
