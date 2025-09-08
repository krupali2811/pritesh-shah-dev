import { Navigate, useRoutes } from "react-router-dom";

import RoleBasedRoutes from "./dashboard";
import { authRoutes } from "./auth";
import { mainRoutes } from "./main";

// ----------------------------------------------------------------------

export function Router() {
  const dashboardRoutes = RoleBasedRoutes();

  return useRoutes([
    // {
    //   path: '/',
    //   element: <Navigate to={CONFIG.auth.redirectPath} replace />,
    // },

    // Auth
    ...authRoutes,

    // Dashboard
    ...dashboardRoutes,

    // Main
    ...mainRoutes,

    // No match
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
