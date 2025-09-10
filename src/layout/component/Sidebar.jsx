import { Link, useLocation } from "react-router-dom";

import RoleBasedNavData from "../config-sidebar";
import NavItem from "../../components/nav-section/nav-item";

const Sidebar = ({ isVisible, toggleSidebar, headerHeight }) => {
  const location = useLocation();
  const filteredNavData = RoleBasedNavData();

  // // Hide sidebar on all "/spot/*" child pages
  // if (location.pathname.includes("/spot/")) {
  //   return null;
  // }

  return (
    <div className={`navbar sidenav p-0  ${isVisible ? "" : "collapsed"}`}>
      <Link className="navbar-brand p-0 m-0 flex-fill" href="index.html">
        <img src="../assets/images/sidebar-logo.svg" alt="Pritesh Shah" width="220" />
      </Link>

      <div className="overflow-hidden flex-fill mt-20">
        <div className="scrollbar me-1">
          <ul className="nav flex-column mb-3">
            {filteredNavData.map((item, index) => (
              <NavItem key={index} data={item} toggleSidebar={toggleSidebar} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
