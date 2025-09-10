// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: "/auth",
  DASHBOARD: "/dashboard",
  MARKETS: "/markets",
};

// ----------------------------------------------------------------------

export const paths = {
  faqs: "/faqs",
  // AUTH
  auth: {
    jwt: {
      adminSignIn: `${ROOTS.AUTH}/sign-in/admin`,
      signIn: `${ROOTS.AUTH}/sign-in`,
      verify: `${ROOTS.AUTH}/verify`,
      register: `${ROOTS.AUTH}/register`,
      updatePassword: `${ROOTS.AUTH}/update-password`,
      resetPassword: `${ROOTS.AUTH}/reset-password`,
      forgotPassword: `${ROOTS.AUTH}/forgot-password`,
      telegram: `${ROOTS.AUTH}/telegram`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    overview: `${ROOTS.DASHBOARD}/overview`,
    clientList: `${ROOTS.DASHBOARD}/clients`,
    kycManagement: `${ROOTS.DASHBOARD}/kyc-management`,
    portfolios: `${ROOTS.DASHBOARD}/portfolios`,
    analytics: `${ROOTS.DASHBOARD}/analytics`,
    reports: `${ROOTS.DASHBOARD}/reports`,
    messages: `${ROOTS.DASHBOARD}/messages`,
    compliance: `${ROOTS.DASHBOARD}/compliance`,

    userManagement: {
      root: `${ROOTS.DASHBOARD}/user-management`,
      userKyc: {
        root: `${ROOTS.DASHBOARD}/user-management/user-kyc`,
        // new: `${ROOTS.DASHBOARD}/user-management/user-kyc/new`,
        // details: (id) => `${ROOTS.DASHBOARD}/users/${id}`,
        // edit: (id) => `${ROOTS.DASHBOARD}/user-management/user-kyc/${id}/edit`,
      },
    },
  },
};
