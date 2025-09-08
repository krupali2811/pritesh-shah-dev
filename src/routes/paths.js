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
    userManagement: {
      root: `${ROOTS.DASHBOARD}/user-management`,
      users: {
        root: `${ROOTS.DASHBOARD}/user-management/users`,
        new: `${ROOTS.DASHBOARD}/user-management/users/new`,
        // details: (id) => `${ROOTS.DASHBOARD}/users/${id}`,
        edit: (id) => `${ROOTS.DASHBOARD}/user-management/${id}/edit`,
      },
      userKyc: {
        root: `${ROOTS.DASHBOARD}/user-management/user-kyc`,
        new: `${ROOTS.DASHBOARD}/user-management/user-kyc/new`,
        // details: (id) => `${ROOTS.DASHBOARD}/users/${id}`,
        edit: (id) => `${ROOTS.DASHBOARD}/user-management/user-kyc/${id}/edit`,
      },
    },
  },
};
