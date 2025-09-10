import { Helmet } from "react-helmet-async";

import { CONFIG } from "../../utils/config-global";
import useAuth from "../../hooks/useAuth";
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

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
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

            {/* Personal Information */}
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

            {/* KYC Status */}
            <div className="sub-card p-30 mb-30 rounded-16">
              <h3 className="text-head mb-30">KYC Status</h3>
              <div className="d-flex flex-column justify-content-center align-items-center">
                <img
                  src="/assets/images/KYC-Status Process.png"
                  alt="kyc illustration"
                  className="mb-3"
                  // style={{ maxHeight: "150px" }}
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

        {/* <div className="progress-container">
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
        </div> */}
      </div>
    </>
  );
}
