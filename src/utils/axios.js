import axios from "axios";
import { toast } from "react-toastify";

import { CONFIG } from "./config-global";

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: CONFIG.site.serverUrl });
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong!"
    )
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args, logout) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosInstance.get(url, { ...config });

    return res.data;
  } catch (error) {
    // console.error("Failed to fetch:", error);
    if (error.message === "jwt expired") {
      logout();
      toast.error("Session expired. Please login again.");
    } else toast.error(error.message);
    throw error;
  }
};

// ----------------------------------------------------------------------

export const endpoints = {
  auth: {
    me: "/get-user-data/",
    signIn: "/login/",
    signUp: "/signup/",
    enable2FA: "/enable-2fa/",
    verifyEnable2FA: "/verify-enable-2fa/",
    verifyDisable2FA: "/verify-disable-2fa/",
    disable2FA: "/disable-2fa/",
    verify2FA: "/verify-2fa/",
    signOut: "/auth/sign-out",
    resetPassword: "/auth/forgot-password",
    updatePassword: "/request-update-password-otp/",
    verifyUpdatePassword: "/update-password/",
    telegram: "/telegram/auth/",
    telegramVerify: "/telegram/verify/",
    unlinkTelegram: "/telegram/disconnect/",
    verifyAccount: "/verify-account/",
    requestForgotPasswordOtp: "/request-forgotpassword-otp/",
    forgotPassword: "/reset-forgotpassword/",
    setupIdentifier: "/generate-setup-emailorphone-otp/",
    verifySetupIdentifier: "/verify-setup-emailorphone-otp/",
    changeIdentifier: "/generate-change-emailorphone-otp/",
    verifyChangeIdentifier: "/change-emailorphone/",
  },
  csv: {
    upload: "/uploads",
    progress: "/uploads//upload-progress",
  },
  // CarRecords: {
  //   list: "/records",
  //   dateRange: "/records/date-range",
  //   add: "/records",
  //   details: (id) => `/records/${id}`,
  //   update: (id) => `/records/${id}`,
  //   delete: "/records",
  //   // search: '/CarRecords/search',
  // },
  Users: {
    list: "/adminpanel/user-list/",
    // add: "/records",
    details: (id) => `/adminpanel/edit-user/${id}/`,
    update: (id) => `/adminpanel/edit-user/${id}/`,
    delete: (id) => `/adminpanel/delete-user/${id}/`,
    // search: '/CarRecords/search',
  },
  usersKYC: {
    list: "/adminpanel/user-kyc/",
    // add: "/records",
    kycStatuses: "/adminpanel/kyc-data/",
    updateStatus: "/adminpanel/user-kyc/",
    // delete: (id) => `/adminpanel/delete-user/${id}/`,
    // search: '/CarRecords/search',
  },
  withdrawRequest: {
    list: "/adminpanel/approve-transfers/",
    approveRequest: (id) => `/adminpanel/approve-transfers/${id}/`,
    rejectRequest: (id) => `/adminpanel/approve-transfers/${id}/`,
  },
  wallet: {
    getWalletBalance: "/wallet/default-get-wallet-balance/",
    coinBalance: "/wallet/get-coin-balance/",
    // getWalletBalance: "/wallet/apigetwalletbalance/",
    addWallet: "/wallet",
    updateWallet: "/wallet",
    deleteWallet: "/wallet",
    internalTransfer: "/wallet/internal-transfer/",
    universalTransfer: "/wallet/universal-transfer/",
    transactions: "/wallet/get-universal-transfer/",
    coinInfo: "/wallet/get-coin-info/",
    getMasterDepositAddress: "/wallet/get-master-deposit-address/",
    getSubDepositAddress: "/wallet/get-sub-deposit-address/",
    sendWithdrawOtp: "/wallet/withdraw-sendotp/",
    createWithdraw: "/wallet/withdraw/",
    createWithdrawUser: "/wallet/withdraw-transfer/",
    cancelAdminWithdrawal: "/wallet/admin-cancelwithdraw/",
    cancelUserWithdrawal: (id) => `/wallet/user-cancelwithdraw/${id}/`,
    recentWithdrawals: "/wallet/withdrawal-records/",
    recentDeposits: "/wallet/deposit-records/",
    marginMode: "/wallet/set-margin-mode/",
    leverage: "/wallet/set-leverage/",
  },
  trade: {
    placeOrder: "/trade/place-order/",
    cancelOrder: "/trade/cancel-order/",
    cancelAllOrders: "/trade/cancel-all-order/",
    amendOrder: "/trade/amend-order/",
    recentOrders: "/trade/get-public-trade/",
    historicalKline: "/trade/historical-kline/",
    currentOrders: "/trade/get-order-list/",
    orderHistory: "/trade/order-history/",
    tradeHistory: "/trade/trade-history/",
    subscriptionRedemption: "/trade/subscription-Redemption",
  },
  fundingHistory: {
    deposit: "/adminpanel/max-wallet-user/",
    orders: "/adminpanel/max-order-user/",
  },
  markets: "/trade/symbol-list/",
  referral: "/referred-users/",
  docType: "/doc-type/",
};
