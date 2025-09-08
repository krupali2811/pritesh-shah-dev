import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";

import { SplashScreen } from "../../components/loading-screen/splash-screen";
// import AuthSplitLayout from "../../components/layout/auth-split";

// ----------------------------------------------------------------------

/** **************************************
 * Jwt
 *************************************** */
const Jwt = {
  SignInPage: lazy(() => import("../../pages/session/JwtLogin")),
  Register: lazy(() => import("../../pages/session/JwtRegister")),
  ForgotPassword: lazy(() => import("../../pages/session/ForgotPassword")),
};

const authJwt = {
  children: [
    {
      path: "sign-in", // This should be directly under the "auth" path
      element: <Jwt.SignInPage />,
    },
    {
      path: "register", // This should be directly under the "auth" path
      element: <Jwt.Register />,
    },
    {
      path: "forgot-password", // This should be directly under the "auth" path
      element: <Jwt.ForgotPassword />,
    },
  ],
};

// ----------------------------------------------------------------------

export const authRoutes = [
  {
    path: "auth",
    element: (
      // <AuthSplitLayout>
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
      // </AuthSplitLayout>
    ),
    children: [authJwt],
  },
];
