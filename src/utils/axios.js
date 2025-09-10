import axios from "axios";
import { toast } from "react-toastify";

import { CONFIG } from "./config-global";

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: CONFIG.site.serverUrl,
  withCredentials: true,
});
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
    me: "/auth/me",
    signIn: "/auth/sign-in",
    register: "/users/add",
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
};
