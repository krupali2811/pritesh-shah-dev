import { Helmet } from "react-helmet-async";
import moment from "moment";

import { CONFIG } from "../../utils/config-global";
import TabDataTable from "../../components/tab-with-tables/TabDataTable";
import useAuth from "../../hooks/useAuth";
import { useGetWithdrawRequests } from "../../actions/admin";
import { formatName } from "../../utils/helper";

// ----------------------------------------------------------------------

const metadata = {
  title: `Wallet Transactions | Dashboard - ${CONFIG.site.name}`,
};

export default function WalletTransactions() {
  const { user } = useAuth();
  const { bybit_subuid } = user?.admin_bybit_ids?.[0] ?? {};

  const columns = [
    {
      field: "timestamp",
      headerName: "Time",
      flex: 1,
      minWidth: 190,
      resizable: false,
      renderCell: (params) =>
        moment(Number(params.value)).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      field: "bybit_subuid",
      headerName: "From",
      minWidth: 120,
      resizable: false,
      renderCell: (params) =>
        params.value === bybit_subuid ? "main" : params.value,
    },
    {
      field: "address",
      headerName: "Wallet Address",
      minWidth: 420,
      resizable: false,
    },
    {
      field: "accountType",
      headerName: "From(Account Type)",
      minWidth: 160,
      resizable: false,
    },
    {
      field: "coin",
      headerName: "Coin",
      resizable: false,
      minWidth: 120,
    },
    {
      field: "chain",
      headerName: "Chain",
      resizable: false,
      minWidth: 120,
    },
    {
      field: "amount",
      headerName: "Qty",
      resizable: false,
      minWidth: 120,
    },
    {
      field: "status",
      headerName: "Status",
      resizable: false,
      minWidth: 120,
      renderCell: (params) => formatName(params.value),
    },
  ];

  // Get data
  const { data: withdrawRequests, loading } = useGetWithdrawRequests();

  // if (loading) {
  //   return <LoadingScreen />;
  // }
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <div className="content px-20 pb-20">
        <h2 className="dash-section-title mb-30">Wallet Transactions</h2>
        <div className="row g-4 mb-4">
          <div className="col-md-12">
            <div className="card h-md-100">
              <TabDataTable
                id="walletTransactions"
                columns={columns}
                data={withdrawRequests}
                loading={loading}
                mode="walletTransactions"
                filters={filters()}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function filters() {
  return <></>;
}
