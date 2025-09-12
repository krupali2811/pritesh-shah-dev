import { Helmet } from "react-helmet-async";
import { useState } from "react";

import { CONFIG } from "../../utils/config-global";
import useAuth from "../../hooks/useAuth";
import DropDown from "../../components/dropdown/drop-down";
import { useBoolean } from "../../hooks/use-boolean";

const metadata = { title: `Home | Dashboard - ${CONFIG.site.name}` };

export default function Home() {
  const { user } = useAuth();
  const copyReferralLink = useBoolean();

  const referralCode = user?.referral_code;
  const referralLink = `${window.location.origin}/auth/sign-up?ref=${referralCode}`;

  // if (loading) {
  //   return <LoadingScreen />;
  // }

  // dummy fallback data (replace with real user data from backend)
  const details = {
    name: user?.name || "Vikram Joshi",
    email: user?.email || "vikram.joshi@example.com",
    phone: user?.phone || "+91 12345 67890",
    city: user?.city || "Ahmedabad, Gujarat",
    status: user?.kyc_status || "KYC Verification Under Process",
  };

  const [occupation, setOccupation] = useState(null);
  const [investmentObj, setInvestmentObj] = useState(null);

  const [showMore, setShowMore] = useState(false);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      {/* Customer KYC Details */}
      <div className="content p-50">
        <div className="d-flex justify-content-center">
          <div
            className="card rounded-24 py-50 px-65"
            style={{ maxWidth: "900px" }}
          >
            <div className="mb-40">
              <h1 className="form-title ff-bold text-white text-center mb-20">
                Customer KYC Details
              </h1>
              <p className="form-head text-center">
                Review the details you’ve shared with us.
              </p>
            </div>

            <div className="sub-card p-30 mb-30 rounded-16">
              <h3 className="text-head mb-30">Personal Information</h3>
              <div className="row g-5">
                <div className="col-md-6">
                  <p className="form-head mb-2">Name</p>
                  <p className="f-16 ff-bold">{details.name}</p>
                </div>
                <div className="col-md-6">
                  <p className="form-head mb-2">Email</p>
                  <p className="f-16 ff-bold">{details.email}</p>
                </div>
                <div className="col-md-6">
                  <p className="form-head mb-2">Phone Number</p>
                  <p className="f-16 ff-bold">{details.phone}</p>
                </div>
                <div className="col-md-6">
                  <p className="form-head mb-2">City & State</p>
                  <p className="f-16 ff-bold">{details.city}</p>
                </div>
              </div>
            </div>

            <div className="sub-card p-30 mb-30 rounded-16">
              <h3 className="text-head mb-30">KYC Status</h3>
              <div className="d-flex flex-column justify-content-center align-items-center">
                <img
                  src="/assets/images/KYC-Status Process.png"
                  alt="kyc illustration"
                  className="mb-3"
                />
                <p className="text-white mb-1">{details.status}</p>
                <div className="loading-dots">
                  <div className="loading-dots--dot"></div>
                  <div className="loading-dots--dot"></div>
                  <div className="loading-dots--dot"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="progress-container">
          <div className="step inProgress">
            <div className="icon">
              <img src="/assets/images/KYC_Verification.svg" alt="" />
            </div>
            <div className="text">
              <p className="title">STEP 1</p>
              <p className="subtitle">KYC Verification</p>
              <span className="status">Completed</span>
            </div>
          </div>

          <div className="step pending">
            <div className="icon">
              <img
                src="/assets/images/Risk_Profiling_Questionnaire.svg"
                alt=""
              />
            </div>
            <div className="text">
              <p className="title">STEP 2</p>
              <p className="subtitle">Risk Profiling Questionnaire</p>
              <span className="status">In Progress</span>
            </div>
          </div>

          <div className="step pending">
            <div className="icon">
              <img src="/assets/images/Agreement.svg" alt="" />
            </div>
            <div className="text">
              <p className="title">STEP 3</p>
              <p className="subtitle">Agreement</p>
              <span className="status">Pending</span>
            </div>
          </div>
        </div>

        <div className="progress-container">
          <div className="step completed">
            <div className="icon">
              <img src="/assets/images/KYC_Verification.svg" alt="" />
            </div>
            <div className="text">
              <p className="title">STEP 1</p>
              <p className="subtitle">KYC Verification</p>
              <span className="status">Completed</span>
            </div>
          </div>

          <div className="step inProgress">
            <div className="icon">
              <img
                src="/assets/images/Risk_Profiling_Questionnaire.svg"
                alt=""
              />
            </div>
            <div className="text">
              <p className="title">STEP 2</p>
              <p className="subtitle">Risk Profiling Questionnaire</p>
              <span className="status">In Progress</span>
            </div>
          </div>

          <div className="step pending">
            <div className="icon">
              <img src="/assets/images/Agreement.svg" alt="" />
            </div>
            <div className="text">
              <p className="title">STEP 3</p>
              <p className="subtitle">Agreement</p>
              <span className="status">Pending</span>
            </div>
          </div>
        </div>

        <div className="progress-container">
          <div className="step completed">
            <div className="icon">
              <img src="/assets/images/KYC_Verification.svg" alt="" />
            </div>
            <div className="text">
              <p className="title">STEP 1</p>
              <p className="subtitle">KYC Verification</p>
              <span className="status">Completed</span>
            </div>
          </div>

          <div className="step completed">
            <div className="icon">
              <img
                src="/assets/images/Risk_Profiling_Questionnaire.svg"
                alt=""
              />
            </div>
            <div className="text">
              <p className="title">STEP 2</p>
              <p className="subtitle">Risk Profiling Questionnaire</p>
              <span className="status">In Progress</span>
            </div>
          </div>

          <div className="step inProgress">
            <div className="icon">
              <img src="/assets/images/Agreement.svg" alt="" />
            </div>
            <div className="text">
              <p className="title">STEP 3</p>
              <p className="subtitle">Agreement</p>
              <span className="status">Pending</span>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Profiling Questionnaire */}
      <div className="content p-50">
        <div className="d-flex justify-content-center">
          <div
            className="card rounded-24 py-50 px-65"
            style={{ maxWidth: "1000px" }}
          >
            <div className="mb-40">
              <h1 className="form-title ff-bold text-white text-center mb-20">
                Risk Profiling Questionnaire
              </h1>
              <p className="form-head text-center">
                Quick way to discover your investment personality.
              </p>
            </div>

            <div className="row g-30 mb-40">
              <div className="col-md-6">
                <label className="form-label">Age Group</label>
                <div className="d-flex gap-3">
                  <input
                    type="number"
                    className="form-control text-center"
                    placeholder="18"
                    style={{ maxWidth: "100px" }}
                  />
                  <span className="text-white align-self-center">to</span>
                  <input
                    type="number"
                    className="form-control text-center"
                    placeholder="25"
                    style={{ maxWidth: "100px" }}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label">Occupation & Income Range</label>

                <DropDown
                  name="Occupation"
                  className="Occupation"
                  placeholder="Select Your Occupation & Income Range"
                  state={occupation}
                  setState={setOccupation}
                  options={[
                    { value: "salaried", label: "Salaried" },
                    { value: "business", label: "Business" },
                    { value: "student", label: "Student" },
                  ]}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Investment Experience</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Investment Experience"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Investment Objective</label>

                <DropDown
                  name="Occupation"
                  className="Occupation"
                  placeholder="Select Your Investment Objective"
                  state={investmentObj}
                  setState={setInvestmentObj}
                  options={[
                    { value: "growth", label: "Growth" },
                    { value: "income", label: "Regular Income" },
                    { value: "wealth", label: "Wealth" },
                  ]}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Time Horizon</label>
                <div className="d-flex flex-column text-white time-horizon">
                  <label className="form-check d-flex align-items-center gap-2">
                    <input
                      type="radio"
                      name="timeHorizon"
                      className="form-check-input mt-0"
                    />
                    <span>More than 3 Years</span>
                  </label>
                  <label className="form-check d-flex align-items-center gap-2">
                    <input
                      type="radio"
                      name="timeHorizon"
                      className="form-check-input mt-0"
                    />
                    <span>More than 5 Years</span>
                  </label>
                  <label className="form-check d-flex align-items-center gap-2">
                    <input
                      type="radio"
                      name="timeHorizon"
                      className="form-check-input mt-0"
                    />
                    <span>More than 10 Years</span>
                  </label>
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label">Risk Appetite</label>
                <div className="d-flex risk-appetite" style={{ gap: "80px" }}>
                  <label className="form-check d-flex align-items-center gap-2">
                    <input
                      type="radio"
                      name="riskAppetite"
                      className="form-check-input mt-0"
                    />
                    <span>Low</span>
                  </label>
                  <label className="form-check d-flex align-items-center gap-2">
                    <input
                      type="radio"
                      name="riskAppetite"
                      className="form-check-input mt-0"
                    />
                    <span>Moderate</span>
                  </label>
                  <label className="form-check d-flex align-items-center gap-2">
                    <input
                      type="radio"
                      name="riskAppetite"
                      className="form-check-input mt-0"
                    />
                    <span>High</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-center">
              <button className="btn btn-primary btn-submit">Submit</button>
            </div>
          </div>
        </div>

        <div className="progress-container">
          <div className="step completed">
            <div className="icon">
              <img src="/assets/images/KYC_Verification.svg" alt="" />
            </div>
            <div className="text">
              <p className="title">STEP 1</p>
              <p className="subtitle">KYC Verification</p>
              <span className="status">Completed</span>
            </div>
          </div>

          <div className="step inProgress">
            <div className="icon">
              <img
                src="/assets/images/Risk_Profiling_Questionnaire.svg"
                alt=""
              />
            </div>
            <div className="text">
              <p className="title">STEP 2</p>
              <p className="subtitle">Risk Profiling Questionnaire</p>
              <span className="status">In Progress</span>
            </div>
          </div>

          <div className="step pending">
            <div className="icon">
              <img src="/assets/images/Agreement.svg" alt="" />
            </div>
            <div className="text">
              <p className="title">STEP 3</p>
              <p className="subtitle">Agreement</p>
              <span className="status">Pending</span>
            </div>
          </div>
        </div>
      </div>

      {/* Terms & Agreement */}
      <div className="content p-50">
        <div className="d-flex justify-content-center">
          <div
            className="card rounded-24 py-50 px-65"
            style={{ maxWidth: "1000px" }}
          >
            <div className="mb-40">
              <h1 className="form-title ff-bold text-white text-center mb-20">
                Terms & Agreement
              </h1>
              <p className="form-head text-center">
                Ensure you understand the terms before accepting.
              </p>
            </div>

            <div>
              <h3 className="text-white ff-medium f-20 mb-3">Fee Structure</h3>
              <p className="typography">
                Transparent, fee-only model ensuring unbiased, commission-free,
                client-first advisory services. <br />
                <br />
                Personalized advice on equity, derivatives, wealth planning, and
                long-term financial goals. <br />
                <br />
                Clear, client-friendly policy for smooth service discontinuation
                and eligible refund process. <br />
                <br />
                Client acknowledgment to receive SEBI-compliant, unbiased, and
                personalized financial advisory support.
                {showMore && (
                  <>
                    <br />
                    <br />
                    Transparent, fee-only model ensuring unbiased,
                    commission-free, client-first advisory services. <br />
                    <br />
                    Client acknowledgment to receive SEBI-compliant, unbiased,
                    and personalized financial advisory support.
                  </>
                )}
              </p>

              <button
                className="btn btn-link p-0 mt-3 f-16"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? "Show Less" : "More..."}
              </button>
            </div>

            <div className="divider mt-40 mb-40"></div>

            <div className="row g-30 mb-40">
              <div className="col-md-6">
                <label className="form-label">Aadhaar Card No.</label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="1234 4567 7890 1234"
                  />
                  <button
                    type="button"
                    className="btn btn-outline-primary position-absolute top-0 end-0 mt-2 me-12"
                    style={{
                      height: "65%",
                      padding: "0 12px",
                      fontSize: "14px",
                      borderRadius: "3px",
                    }}
                  >
                    Verify
                  </button>
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label">Aadhaar Verification</label>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Enter OTP to verify adhaar"
                />
                <small className="text-white f-16">
                  *OTP has been sent on mobile number
                </small>
              </div>
            </div>

            <div className="mb-50">
              <input
                className="form-check-input"
                id="terms-agree"
                name="terms-agree"
                type="checkbox"
              />
              <label className="ms-2 text-white f-18">
                I agree to the terms
              </label>
            </div>

            <div className="d-flex justify-content-center">
              <button className="btn btn-primary btn-submit">Submit</button>
            </div>
          </div>
        </div>

        <div className="progress-container">
          <div className="step completed">
            <div className="icon">
              <img
                src="/assets/images/KYC_Verification.svg"
                alt="KYC_Verification"
              />
            </div>
            <div className="text">
              <p className="title">STEP 1</p>
              <p className="subtitle">KYC Verification</p>
              <span className="status">Completed</span>
            </div>
          </div>

          <div className="step completed">
            <div className="icon">
              <img
                src="/assets/images/Risk_Profiling_Questionnaire.svg"
                alt="Risk_Profiling_Questionnaire"
              />
            </div>
            <div className="text">
              <p className="title">STEP 2</p>
              <p className="subtitle">Risk Profiling Questionnaire</p>
              <span className="status">In Progress</span>
            </div>
          </div>

          <div className="step inProgress">
            <div className="icon">
              <img src="/assets/images/Agreement.svg" alt="Agreement" />
            </div>
            <div className="text">
              <p className="title">STEP 3</p>
              <p className="subtitle">Agreement</p>
              <span className="status">Pending</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
