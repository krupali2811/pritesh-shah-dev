import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";

import { SplashScreen } from "../../components/loading-screen/splash-screen";
import Loadable from "../../components/Loadable";

// ----------------------------------------------------------------------

// Lazy-loaded components
const NotFoundView = Loadable(lazy(() => import("../../pages/not-found-view")));

// ----------------------------------------------------------------------

export const mainRoutes = [
  {
    element: (
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        path: "404",
        element: <NotFoundView />,
      },
    ],
  },
];
