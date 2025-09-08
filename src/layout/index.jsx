import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import useTheme from "../hooks/useTheme";

import Header from "./component/Header";
import Sidebar from "./component/Sidebar";

const DashboardLayout = () => {
  const { headerHeight} = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth <= 1199);
  const location = useLocation();

  const toggleSidebar = () => setIsCollapsed((prev) => !prev);

  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth <= 1199);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Hide sidebar on "/market/*" child pages
  const isMarketPage =
    location.pathname.includes("/markets/") ||
    location.pathname.includes("/futures/");

  return (
    <main className={`main ${isMarketPage ? "sidebar-hidden" : ""}`}>
      <Header toggleSidebar={toggleSidebar} />
      {!isMarketPage && (
        <Sidebar
          isVisible={!isCollapsed}
          toggleSidebar={toggleSidebar}
          headerHeight={headerHeight}
        />
      )}

      <div
        className={`main-content ${isCollapsed ? "collapsed" : ""}`}
        style={{ minHeight: `calc((100vh - 20px) - ${headerHeight}px)` }}
      >
        <Outlet />
      </div>
    </main>
  );
};

export default DashboardLayout;
