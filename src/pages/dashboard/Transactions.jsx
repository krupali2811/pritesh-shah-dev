import { Helmet } from "react-helmet-async";
import { useState } from "react";
import moment from "moment";
import { toast } from "react-toastify";

import { CONFIG } from "../../utils/config-global";
import { useGetTransactions } from "../../actions/tableData";
import { LoadingScreen } from "../../components/loading-screen/loading-screen";
import DatePickerComponent from "../../components/date-picker";
import TabDataTable from "../../components/tab-with-tables/TabDataTable";
import useAuth from "../../hooks/useAuth";

// ----------------------------------------------------------------------

const metadata = { title: `Transactions | Dashboard - ${CONFIG.site.name}` };

export default function Transactions() {
  const { user } = useAuth();
  const { bybit_subuid } = user?.admin_bybit_ids?.[0] ?? {};
  const [crypto, setCrypto] = useState();

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
      field: "fromMemberId",
      headerName: "From",
      minWidth: 120,
      resizable: false,
      renderCell: (params) =>
        params.value === bybit_subuid ? "main" : params.value,
    },
    {
      field: "toMemberId",
      headerName: "To",
      minWidth: 120,
      resizable: false,
      renderCell: (params) =>
        params.value === bybit_subuid ? "main" : params.value,
    },
    {
      field: "fromAccountType",
      headerName: "From(Account Type)",
      minWidth: 160,
      resizable: false,
    },
    {
      field: "toAccountType",
      headerName: "To(Account Type)",
      resizable: false,
      minWidth: 160,
    },
    {
      field: "coin",
      headerName: "Assets",
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
    },
    // {
    //   type: "actions",
    //   field: "actions",
    //   headerName: "Actions",
    //   // align: "right",
    //   // headerAlign: "center",
    //   minWidth: 150,
    //   sortable: false,
    //   filterable: false,
    //   disableColumnMenu: true,
    //   getActions: (params) => [
    //     <Button
    //       key={`trade-${params.row.coin}`}
    //       sx={{ fontWeight: "medium", textTransform: "none" }}
    //       onClick={() =>
    //         router.push(paths.dashboard.account.spot.details(params.row.coin), {
    //           state: { coin: params.row, mode: "spot" },
    //         })
    //       }
    //     >
    //       Trade
    //     </Button>,
    //   ],
    // },
  ];

  // Default: last 7 days
  const last7DaysStartDate = moment().subtract(6, "days");
  const last7DaysEndDate = moment();

  const [fromDate, setFromDate] = useState(last7DaysStartDate);
  const [toDate, setToDate] = useState(last7DaysEndDate);

  const [params, setParams] = useState({
    startTime: moment(last7DaysStartDate).valueOf(),
    endTime: moment(last7DaysEndDate).valueOf(),
  });

  // Get data
  const { data:   transactions, loading } = useGetTransactions(params);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <div className="content px-20 pb-20">
        <h2 className="dash-section-title mb-30">Transactions</h2>
        <div className="row g-4 mb-4">
          <div className="col-md-12">
            <div className="card h-md-100">
              <TabDataTable
                id="transactions"
                columns={columns}
                data={transactions}
                loading={loading}
                mode="transactions"
                filters={filters({
                  crypto,
                  setCrypto,
                  fromDate,
                  setFromDate,
                  toDate,
                  setToDate,
                  params,
                  setParams,
                  last7DaysStartDate,
                  last7DaysEndDate,
                })}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function filters({
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  setParams,
  last7DaysStartDate,
  last7DaysEndDate,
}) {
  const handleFilter = () => {
    if (!fromDate && !toDate) {
      // Default: Last 7 days
      setParams({
        startTime: moment(last7DaysStartDate).valueOf(),
        endTime: moment(last7DaysEndDate).valueOf(),
      });
      return;
    }

    if (fromDate && !toDate) {
      // If only startTime is provided, return records for startTime + 7 days
      setParams({
        startTime: fromDate,
        endTime: moment(fromDate).add(7, "days").valueOf(),
      });
      return;
    }

    if (!fromDate && toDate) {
      // If only endTime is provided, return records for endTime - 7 days
      setParams({
        startTime: moment(toDate).subtract(7, "days").valueOf(),
        endTime: toDate,
      });
      return;
    }

    if (toDate - fromDate > 7 * 24 * 60 * 60 * 1000) {
      // Maximum allowed range is 7 days
      toast.error("Date range cannot exceed 7 days.");
      return;
    }

    setParams({
      startTime: moment(fromDate).valueOf(),
      endTime: moment(toDate).valueOf(),
    });
  };

  const handleReset = () => {
    setFromDate(last7DaysStartDate);
    setToDate(last7DaysEndDate);
    setParams({
      startTime: moment(last7DaysStartDate).valueOf(),
      endTime: moment(last7DaysEndDate).valueOf(),
    });
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <form className="row align-items-center g-3 header-content">
          <div className="col-lg-3 col-md-6">
            <DatePickerComponent
              date={fromDate}
              setDate={setFromDate}
              dateformat="dd-MM-yyyy"
              label="From Date"
            />
          </div>
          <div className="col-lg-3 col-md-6">
            <DatePickerComponent
              date={toDate}
              setDate={setToDate}
              dateformat="dd-MM-yyyy"
              label="To Date"
            />
          </div>
          <div className="col-auto filter resize-btn align-self-end">
            <span className="btn btn-primary" onClick={handleFilter}>
              Filter
            </span>
          </div>
          <div className="col-auto align-self-end">
            <button className="btn btn-secondary" onClick={handleReset}>
              Reset
            </button>
          </div>

          {/* <div className="col-auto resize-btn align-self-end export_csv">
          <span
            className="btn btn-dark"
            // onClick={() =>
            //   exportTableToCSV("dateReportTable", "DateReport.csv")
            // }
          >
            Export CSV
          </span>
        </div> */}
        </form>
      </div>
    </>
  );
}
