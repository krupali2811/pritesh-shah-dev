import { Helmet } from "react-helmet-async";

import { CONFIG } from "../../utils/config-global";
import useAuth from "../../hooks/useAuth";

const metadata = { title: `KYCManagement | Dashboard - ${CONFIG.site.name}` };

const kycData = [
  {
    id: 1,
    name: "Vikram Joshi",
    email: "vikram.joshi@example.com",
    status: "KYC Verification Undone",
  },
  {
    id: 2,
    name: "Aarav Mehta",
    email: "aarav.mehta@example.com",
    status: "KYC Verification Undone",
  },
  {
    id: 3,
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    status: "KYC Verification Done",
  },
  {
    id: 4,
    name: "Rohan Iyer",
    email: "rohan.iyer@example.com",
    status: "KYC Verification Undone",
  },
  {
    id: 5,
    name: "Ananya Patel",
    email: "ananya.patel@example.com",
    status: "KYC Verification Done",
  },
  {
    id: 6,
    name: "Kabir Reddy",
    email: "kabir.reddy@example.com",
    status: "KYC Verification Undone",
  },
  {
    id: 7,
    name: "Simran Kaur",
    email: "simran.kaur@example.com",
    status: "KYC Verification Undone",
  },
  {
    id: 8,
    name: "Arjun Nair",
    email: "arjun.nair@example.com",
    status: "KYC Verification Done",
  },
  {
    id: 9,
    name: "Neha Verma",
    email: "neha.verma@example.com",
    status: "KYC Verification Undone",
  },
  {
    id: 10,
    name: "Ishita Desai",
    email: "ishita.desai@example.com",
    status: "KYC Verification Done",
  },
];

export default function KYCManagement() {
  const { user } = useAuth();

  const referralCode = user?.referral_code;
  const referralLink = `${window.location.origin}/auth/sign-up?ref=${referralCode}`;

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <div className="content p-50">
        <div className="page-header mb-40">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Dashboard</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                KYC Management
              </li>
            </ol>
          </nav>
        </div>

        {/* Table Section */}
        <div className="table-card p-0">
          <div className="table-card-header d-flex justify-content-between align-items-center">
            <h5 className="f-20 ff-semibold">KYC Management</h5>
            <a href="#" className="text-primary-head">
              View All &gt;
            </a>
          </div>
          <div className="table-responsive">
            <table className="table table-dark table-striped ">
              <thead>
                <tr>
                  <th>Sr. No.</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {kycData.map((user, index) => (
                  <tr key={user.id}>
                    <td className="ff-medium">{index + 1}</td>
                    <td className="ff-bold">{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.status}</td>
                    <td>
                      <button className="btn btn-view me-3">
                        View
                      </button>
                      <button className="btn btn-remove">
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
