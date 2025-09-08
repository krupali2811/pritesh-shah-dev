import { useLocation } from "react-router-dom";

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
    <div
      className={`navbar sidenav overflow-hidden ${
        isVisible ? "" : "collapsed"
      }`}
      
    >
      <div className="scrollbar flex-fill">
        <ul className="nav flex-column">
          {filteredNavData.map((item, index) => (
            <NavItem key={index} data={item} toggleSidebar={toggleSidebar} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
