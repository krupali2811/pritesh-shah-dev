import { Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";

import { CONFIG } from "../../utils/config-global";
import Loadable from "../../components/Loadable.jsx";
import { LoadingScreen } from "../../components/loading-screen/loading-screen.jsx";
import AuthGuard from "../../components/auth/auth-guard.jsx";
import DashboardLayout from "../../layout/index.jsx";
import { RoleBasedGuard } from "../../components/auth/role-based-guard.jsx";

// ----------------------------------------------------------------------

const Home = Loadable(lazy(() => import("../../pages/dashboard/Home")));

//Users
const Users = Loadable(
  lazy(() => import("../../pages/dashboard/users/UserList.jsx"))
);
const EditUsers = Loadable(
  lazy(() => import("../../pages/dashboard/users/edit.jsx"))
);

//User KYC
const UsersKYC = Loadable(
  lazy(() => import("../../pages/dashboard/userKYC/UsersKYC.jsx"))
);

const PermissionDeniedPage = Loadable(
  lazy(() => import("../../pages/permission-denied-page.jsx"))
);

// ----------------------------------------------------------------------

const layoutContent = (
  <DashboardLayout>
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  </DashboardLayout>
);

const RoleBasedRoutes = () => {
  const dashboardRoutes = [
    {
      path: "dashboard",
      element: CONFIG.auth.skip ? (
        <>{layoutContent}</>
      ) : (
        <AuthGuard>{layoutContent}</AuthGuard>
      ),
      children: [
        { element: <Home />, index: true },

        {
          path: "users",
          children: [
            {
              element: (
                <RoleBasedGuard currentPermission="admin" hasContent>
                  <Users />
                </RoleBasedGuard>
              ),
              index: true,
            },

            {
              path: ":id/edit",
              element: (
                <RoleBasedGuard currentPermission="admin" hasContent>
                  <EditUsers />
                </RoleBasedGuard>
              ),
            },
          ],
        },
      ],
    },
    { path: "/403", element: <PermissionDeniedPage /> },
  ];

  return dashboardRoutes;
};

export default RoleBasedRoutes;
