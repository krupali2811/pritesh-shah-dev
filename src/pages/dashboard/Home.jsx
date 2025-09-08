import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useState } from "react";
import copy from "copy-to-clipboard";

import { CONFIG } from "../../utils/config-global";
import useAuth from "../../hooks/useAuth";
import { LoadingScreen } from "../../components/loading-screen/loading-screen";
import { useBoolean } from "../../hooks/use-boolean";
import { useGetReferral } from "../../actions/referral";
import { formatDecimalNumber } from "../../utils/helper";
import { useGetCoinBalance, useGetWallet } from "../../actions/account";
import { paths } from "../../routes/paths";

const metadata = { title: `Home | Dashboard - ${CONFIG.site.name}` };

export default function Home() {
  const { user } = useAuth();
  const copyReferralLink = useBoolean();
  const [openDialog, setOpenDialog] = useState(false);

  const referralCode = user?.referral_code;
  const referralLink = `${window.location.origin}/auth/sign-up?ref=${referralCode}`;

  // Get data
  const { totalBalance, loading } = useGetCoinBalance({ accountType: "FUND" });
  const { data: wallet, loading: walletLoading } = useGetWallet({
    accountType: "UNIFIED",
  });
  const { data: referrals } = useGetReferral();


  const handleOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  if (loading || walletLoading) {
    return <LoadingScreen />;
  }
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <div className="content px-20 pb-20">
        <div className="row g-4 mb-4">
          <div className="col-md-12">
            <div className="card h-md-100 p-4">
              <div className="row align-items-center justify-content-between">
                <div className="col-auto d-flex align-items-center">
                  <div className="user-icon gradient-square me-3">
                    <i className="bi bi-person-fill"></i>
                  </div>
                  <div className="dash-user-detail">
                    <div className="d-flex align-items-center">
                      <h2 className="username me-2">
                        {user?.firstname || user?.lastname
                          ? user?.firstname + " " + user?.lastname
                          : "Unverified user"}
                      </h2>
                      {/* <Link
                        to="#"
                        className="edit z-1 d-inline-flex align-self-end"
                      >
                        <svg
                          width="21"
                          height="21"
                          viewBox="0 0 21 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0.53125 19.79C0.53125 19.2378 0.978965 18.79 1.53125 18.79H19.5312C20.0835 18.79 20.5312 19.2378 20.5312 19.79C20.5312 20.3423 20.0835 20.79 19.5312 20.79H1.53125C0.978965 20.79 0.53125 20.3423 0.53125 19.79Z"
                            fill="#595A5B"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M16.2384 1.08293C15.8478 0.692408 15.2147 0.692408 14.8241 1.08293L11.8244 4.08272C11.8243 4.08279 11.8242 4.08286 11.8241 4.08293C11.8241 4.083 11.824 4.08307 11.8239 4.08314L4.82414 11.0829C4.63661 11.2705 4.53125 11.5248 4.53125 11.79V15.79C4.53125 16.3423 4.97897 16.79 5.53125 16.79H9.53125C9.79647 16.79 10.0508 16.6847 10.2384 16.4971L17.2384 9.49715L20.2384 6.49715C20.6289 6.10662 20.6289 5.47346 20.2384 5.08293L16.2384 1.08293ZM16.5312 7.37583L18.117 5.79004L15.5312 3.20425L13.9455 4.79004L16.5312 7.37583ZM12.5312 6.20425L15.117 8.79004L9.11704 14.79H6.53125V12.2043L12.5312 6.20425Z"
                            fill="#595A5B"
                          />
                        </svg>
                      </Link> */}
                    </div>
                    <div className="user-position">{user?.role}</div>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="loginDetailsTitle text-capitalize mb-12">
                    Account
                  </div>
                  <p className="text-decoration-underline ff-semibold text-primary">
                    {user?.email || null}
                  </p>
                </div>
                <div className="col-auto">
                  <div className="loginDetailsTitle text-capitalize mb-12">
                    UID
                  </div>
                  <p className="ff-semibold">{user?.bybit_subuid}</p>
                </div>
                <div className="col-auto">
                  <div className="loginDetailsTitle text-capitalize mb-12">
                    Last login
                  </div>
                  <p className="ff-semibold">{user?.last_login}</p>
                </div>
                <div className="col-auto">
                  <Link
                    to="#"
                    className="btn btn-outline-primary"
                    onClick={handleOpen}
                  >
                    <img
                      src="/assets/images/premium.svg"
                      alt="Premium"
                      className="me-2"
                    />
                    Apply for VIP
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card h-md-100 p-4">
              <div className="d-flex justify-content-between h-100">
                {/* <div className="col-8"> */}
                <div className="d-flex justify-content-between flex-column h-100">
                  {/* <div> */}
                  <div className="cardType mb-4 mb-lg-5">
                    <h5 className="text-white mb-2 ff-semibold">My Assets</h5>
                  </div>
                  {/* </div> */}
                  <div className="balanceDetail">
                    <h5 className="text-white mb-2 ff-regular">
                      Total Balance
                    </h5>
                    <h1 className="mb-2 text-white">
                      $
                      {formatDecimalNumber(
                        totalBalance?.walletBalanceUSD +
                          Number(wallet[0]?.totalEquity || 0)
                      )}
                    </h1>
                  </div>
                </div>
                {/* </div> */}
                {/* <div className="col-4"> */}
                <div className="d-flex justify-content-between flex-column h-100">
                  <div className="text-center">
                    <Link
                      to={paths.dashboard.account.root}
                      className="gradient-square mb-3 mx-auto"
                    >
                      <i className="bi bi-box-arrow-up-right"></i>
                    </Link>
                    <p>Asset Details</p>
                  </div>
                  {/* <div className="text-center">
                      <Link to="#" className="gradient-square mb-3 mx-auto">
                        <i className="bi bi-file-earmark-text-fill"></i>
                      </Link>
                      <p>Send Invoices</p>
                    </div> */}
                </div>
                {/* </div> */}
              </div>
            </div>
          </div>
          {/* <div className="col-md-7">
            <div className="card bg-primary-gradient h-md-100 p-4">
              <CardSlider
                fund={totalBalance?.walletBalanceUSD}
                unified={Number(wallet[0]?.totalEquity)}
              />
            </div>
          </div> */}
          <div className="col-md-6">
            <div className="card h-md-100 p-4">
              <div className="d-flex justify-content-between flex-column h-100">
                <div>
                  <h3 className="subtitle mb-30">Referral link</h3>
                  <div className="row">
                    <div className="col-md-8">
                      <div className="input-group mb-20 w-100">
                        <input
                          type="text"
                          className="form-control ps-3 border-start text-primary"
                          value={referralLink}
                          readOnly
                        />
                        <span
                          className="input-group-text text-primary-hover cursor-pointer"
                          onClick={() => {
                            if (referralLink) {
                              const success = copy(referralLink);
                              if (success) {
                                copyReferralLink.onTrue();
                                setTimeout(
                                  () => copyReferralLink.onFalse(),
                                  2000
                                );
                              } else {
                                console.warn("Copy failed");
                              }
                            }
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          {copyReferralLink.value ? (
                            <span className="text-success bi bi-check-square-fill"></span>
                          ) : (
                            <span className="bi bi-copy"></span>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-secondary mb-3 mb-md-5">
                    Your referral bonus is 1%. Open a deposit of $1000 or more
                    to increase your referral bonus to 3%.
                  </p>
                </div>
                <p className="text-primary">
                  Total Referrals : {referrals?.length || 0}
                </p>
              </div>
            </div>
          </div>
          {/* <div className="col-md-7">
            <div className="card h-md-100 p-4">
              <h3 className="subtitle mb-30">Invest in an arbitration pool</h3>
              <form>
                <div className="row g-20">
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="Tariff_plan">
                      Tariff plan
                    </label>
                    <DropDown
                      name="tariffPlan"
                      placeholder="Select Tariff Plan"
                      state={tariffPlan}
                      setState={setTariffPlan}
                      options={[
                        { value: "Maximum", label: "Maximum" },
                        { value: "Minimum", label: "Minimum" },
                      ]}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="Period">
                      Period
                    </label>
                    <DropDown
                      name="period"
                      placeholder="Select Period"
                      state={period}
                      setState={setPeriod}
                      options={[
                        { value: "1_month", label: "1 Month" },
                        { value: "2_months", label: "2 Months" },
                        { value: "6_months", label: "6 Months" },
                        { value: "1_year", label: "1 Year" },
                      ]}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="Amount">
                      Enter amount
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      aria-label="Amount"
                      defaultValue="$"
                    />
                  </div>
                  <div className="col-md-6 align-self-end">
                    <button className="btn btn-outline-primary w-100">
                      Invest Now
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div> */}
        </div>
      </div>

      <ComingSoonDialog
        open={openDialog}
        onClose={handleClose}
        title="Coming Soon"
        content={
          <>
            This feature is coming soon.
            <br />
            Stay tuned!
          </>
        }
      />
    </>
  );
}
