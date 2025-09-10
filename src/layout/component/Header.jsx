import { useState, useEffect, useRef } from "react";
import useAuth from "../../hooks/useAuth";
import useTheme from "../../hooks/useTheme";

const Header = ({ toggleSidebar, isCollapsed }) => {
  const { user, logout } = useAuth();
  const { headerRef } = useTheme();

  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleDropdownToggle = () => {
    setOpenDropdown((prev) => !prev);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    };

    if (openDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown]);

  return (
    <header ref={headerRef} className="header-wrapper sticky-top">
      <nav className="navbar navbar-top d-flex justify-content-end gap-2 pe-5">
        <ul className="navbar-nav flex-row align-items-center">
          {/* Fullscreen Button */}
          <li className="nav-item">
            <button className="icon-btn">
              <img src="../assets/images/maximize.svg" alt="Maximize" />
            </button>
          </li>

          {/* Search Button */}
          <li className="nav-item ms-12">
            <button className="icon-btn">
              <img src="../assets/images/search.svg" alt="Search" />
            </button>
          </li>

          {/* Profile Dropdown */}
          <li className="nav-item dropdown ms-12">
            <div className="icon-btn position-relative" ref={dropdownRef}>
              <img
                src="../assets/images/user-profile.png"
                alt="User Profile"
                style={{
                  height: "40px",
                  width: "40px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
                onClick={handleDropdownToggle}
              />

              {openDropdown && (
                <div
                  className="dropdown-menu dropdown-caret dropdown-menu-end py-0 show"
                  style={{ right: 0, top: 55 }}
                >
                  <div className="p-1">
                    <a
                      className="dropdown-item d-flex align-items-center"
                      onClick={logout}
                    >
                      <span className="me-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M14.3338 8.66699V10.1737C14.3338 13.1537 13.1404 14.347 10.1604 14.347H10.0738C7.39376 14.347 6.16043 13.3803 5.94043 11.0203"
                            stroke="#fff"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M5.93359 5.04016C6.14026 2.64016 7.37359 1.66016 10.0736 1.66016H10.1603C13.1403 1.66016 14.3336 2.85349 14.3336 5.83349"
                            stroke="#fff"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M9.99975 8H2.41309"
                            stroke="#fff"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M3.90033 5.7666L1.66699 7.99994L3.90033 10.2333"
                            stroke="#fff"
                            strokeWidth="1.3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      Logout
                    </a>
                  </div>
                </div>
              )}
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
