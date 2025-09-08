import { Link } from "react-router-dom";
import copy from "copy-to-clipboard";
import { useState } from "react";

import useAuth from "../../hooks/useAuth";
import { paths } from "../../routes/paths";
import ThemeToggle from "../../components/buttons/ThemeToggle ";
import { useBoolean } from "../../hooks/use-boolean";
import useTheme from "../../hooks/useTheme";
import { useRouter } from "../../routes/hooks/use-router";

const Header = ({ toggleSidebar, isCollapsed }) => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { headerRef } = useTheme();

  const copiedUID = useBoolean();

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <header ref={headerRef} className="header-wrapper sticky-top">
        <div className="navbar navbar-top navbar-expand-xl">
          <div className="row g-4 flex-fill align-items-center justify-content-between">
            <div className="col-xl-3 col-lg-4 col-auto">
              <div className="d-flex align-items-center">
                <button
                  className="navbar-toggler me-3 border-0 p-0"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <Link
                  to={paths.dashboard.root}
                  className="d-inline-flex nav-logo"
                >
                  <img
                    src="/assets/images/logo-full.svg"
                    alt="iZince"
                    width="178"
                    className=""
                  />
                </Link>
              </div>
            </div>

            <div
              className="col-xl-6 order-3 order-xl-2 collapse navbar-collapse justify-content-center"
              id="navbarNav"
            >
              <ul className="nav navbar-nav justify-content-center">
                <div className="px-3 mb-3 align-items-center mobileMenuHead">
                  <button
                    className="btn-close me-3"
                    type="button"
                    aria-label="Close"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                  ></button>
                  <Link
                    to={paths.dashboard.root}
                    className="d-inline-flex nav-logo"
                  >
                    <img
                      src="/assets/images/logo-full.svg"
                      alt="iZince"
                      width="178"
                      className=""
                    />
                  </Link>
                </div>
                <li className="nav-item dropdown">
                  <Link className="dropdown-item" to={paths.dashboard.root}>
                    Home
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-xl-3 col-lg-6 order-lg-2 order-2 order-xl-3 col-auto">
              <div className="d-flex align-items-center justify-content-end gap-3">
                <div className="dropdown">
                  <Link
                    className=""
                    id="navbarDropdownProfile"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <svg
                      width="21"
                      height="20"
                      viewBox="0 0 21 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.7812 0C12.1073 0 13.3791 0.526784 14.3168 1.46447C15.2545 2.40215 15.7812 3.67392 15.7812 5C15.7812 6.32608 15.2545 7.59785 14.3168 8.53553C13.3791 9.47322 12.1073 10 10.7812 10C9.45517 10 8.1834 9.47322 7.24572 8.53553C6.30803 7.59785 5.78125 6.32608 5.78125 5C5.78125 3.67392 6.30803 2.40215 7.24572 1.46447C8.1834 0.526784 9.45517 0 10.7812 0ZM10.7812 2.5C10.1182 2.5 9.48232 2.76339 9.01348 3.23223C8.54464 3.70107 8.28125 4.33696 8.28125 5C8.28125 5.66304 8.54464 6.29893 9.01348 6.76777C9.48232 7.23661 10.1182 7.5 10.7812 7.5C11.4443 7.5 12.0802 7.23661 12.549 6.76777C13.0179 6.29893 13.2812 5.66304 13.2812 5C13.2812 4.33696 13.0179 3.70107 12.549 3.23223C12.0802 2.76339 11.4443 2.5 10.7812 2.5ZM10.7812 11.25C14.1187 11.25 20.7812 12.9125 20.7812 16.25V20H0.78125V16.25C0.78125 12.9125 7.44375 11.25 10.7812 11.25ZM10.7812 13.625C7.06875 13.625 3.15625 15.45 3.15625 16.25V17.625H18.4062V16.25C18.4062 15.45 14.4937 13.625 10.7812 13.625Z"
                        fill="white"
                      />
                    </svg>
                  </Link>
                  <div
                    className="dropdown-menu dropdown-caret dropdown-menu-end py-0"
                    aria-labelledby="navbarDropdownProfile"
                  >
                    <div className="p-20">
                      <p className="mb-12">{user?.email}</p>
                      <p className="uid_coppy text-secondary mb-3">
                        UID : {user?.bybit_subuid}{" "}
                        <i
                          className={`bi ${
                            copiedUID.value ? "bi-check-square-fill" : "bi-copy"
                          } text-primary ms-2`}
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            const textToCopy = user?.bybit_subuid || "";

                            if (copy(textToCopy)) {
                              copiedUID.onTrue();
                              setTimeout(() => copiedUID.onFalse(), 2000);
                            } else {
                              console.warn("Copy failed");
                            }
                          }}
                        />
                      </p>

                      <Link
                        to="#"
                        className="btn btn-outline-primary mb-4"
                        onClick={handleOpen}
                      >
                        <img
                          src="/assets/images/premium.svg"
                          alt="Premium"
                          className="me-2"
                        />
                        Apply for VIP
                      </Link>

                      <button
                        onClick={logout}
                        className="btn btn-outline-danger mt-4 w-100 text-white"
                      >
                        Log Out
                      </button>
                    </div>
                  </div>
                </div>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
