import { Helmet } from "react-helmet-async";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { FaPen } from "react-icons/fa";
import { HiTrash } from "react-icons/hi";
import { toast } from "react-toastify";
import { GridActionsCellItem } from "@mui/x-data-grid";

import { paths } from "../../../routes/paths";
import { useRouter } from "../../../routes/hooks/use-router";
import { CONFIG } from "../../../utils/config-global";
import { useGetUsers } from "../../../actions/admin";
import axiosInstance, { endpoints } from "../../../utils/axios";
import { useBoolean } from "../../../hooks/use-boolean";
import { ConfirmDialog } from "../../../components/custom-dialog/confirm-dialog";
import { useGetCoinBalance, useGetWallet } from "../../../actions/account";
import useAuth from "../../../hooks/useAuth";
import TabDataTable from "../../../components/tab-with-tables/TabDataTable";
import TransferModal from "../../../components/modals/TransferModal";

// ----------------------------------------------------------------------

const metadata = { title: `Users | Dashboard - ${CONFIG.site.name}` };

export default function Users() {
  const router = useRouter();
  const { user } = useAuth();
  const confirmRows = useBoolean();
  const loading = useBoolean();

  const [selectedRowId, setSelectedRowId] = useState(null);

  const [tableData, setTableData] = useState([]);
  // Get Data
  const { users, usersDropDownData, refetch, recordsLength, usersLoading } =
    useGetUsers();
  // Get Balance
  const { data: coinBalance } = useGetCoinBalance({ accountType: "FUND" });

  const { data: wallet, loading: walletLoading } = useGetWallet({
    accountType: "UNIFIED",
  });

  const totalRecords = recordsLength;

  //------------------Transfer Modal-------------------
  const coinNames = wallet[0]?.coin.map((coin) => coin?.coin);

  const [fromUser, setFromUser] = useState({
    value: user?.bybit_subuid,
    label: "Main Account",
  });
  const [toUser, setToUser] = useState(null);
  const [fromAccount, setFromAccount] = useState({
    value: "FUND",
    label: "Funding",
  });

  const [toAccount, setToAccount] = useState({
    value: "UNIFIED",
    label: "Unified Trading",
  });

  //Get member balance
  const { data: memberBalance } = useGetCoinBalance({
    accountType: fromAccount.value,
    memberId: fromUser.value,
    coin: fromAccount.value === "UNIFIED" ? coinNames.join(",") : undefined,
  });

  const coinDropdownData = () => {
    if (fromUser?.label === "Main Account") {
      if (fromAccount?.value === "FUND") {
        return (
          coinBalance?.map((coin) => ({
            value: coin.coin,
            label: coin.coin,
            balance: coin.transferBalance,
          })) || []
        );
      } else {
        return (
          wallet?.[0]?.coin?.map((coin) => ({
            value: coin.coin,
            label: coin.coin,
            balance: coin.equity,
          })) || []
        );
      }
    } else {
      return (
        memberBalance?.map((coin) => ({
          value: coin.coin,
          label: coin.coin,
          balance: coin.transferBalance,
        })) || []
      );
    }
  };
  //---------------------------------------------------

  useEffect(() => {
    if (router.state.refetch) {
      router.state = { ...router.state, refetch: false };
      refetch();
    }
  }, []);

  useEffect(() => {
    if (users) {
      setTableData(users);
    }
  }, [users, totalRecords]);

  useEffect(() => {
    if (users) {
      loading.onFalse();
    }
  }, [loading, users]);

  const columns = [
    {
      field: "uid",
      headerName: "UID",
      // width: 230,
      minWidth: 90,
      flex: 1,
      // resizable: false,
      hideable: false,
      renderCell: (params) => (params.value ? params.value : "N/A"),
    },
    {
      field: "bybit_subuid",
      headerName: "ByBit UID",
      // width: 230,
      minWidth: 100,
      // flex: 1,
      // resizable: false,
      hideable: false,
      renderCell: (params) => (params.value ? params.value : "N/A"),
    },
    {
      field: "username",
      headerName: "Username",
      // width: 230,
      minWidth: 80,
      // resizable: false,
      hideable: false,
      renderCell: (params) => (params.value ? params.value : "N/A"),
    },
    {
      field: "firstname",
      headerName: "First Name",
      // width: 230,
      minWidth: 100,
      // resizable: false,
      hideable: false,
      renderCell: (params) => (params.value ? params.value : "N/A"),
    },
    {
      field: "lastname",
      headerName: "Last Name",
      // width: 230,
      minWidth: 100,
      // resizable: false,
      hideable: false,
      renderCell: (params) => (params.value ? params.value : "N/A"),
    },
    {
      field: "bybit_username",
      headerName: "ByBit Username",
      // width: 230,
      minWidth: 150,
      // resizable: false,
      hideable: false,
      renderCell: (params) => (params.value ? params.value : "N/A"),
    },
    {
      field: "email",
      headerName: "E-Mail",
      minWidth: 240,
      flex: 1,
      // align: "center",
      // headerAlign: "center",
      // resizable: false,
      renderCell: (params) => (params.value ? params.value : "N/A"),
    },
    {
      field: "phone_number",
      headerName: "Mobile No.",
      minWidth: 140,
      // resizable: false,
      renderCell: (params) => (params.value ? params.value : "N/A"),
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 100,
      // resizable: false,
      renderCell: (params) => (params.value ? params.value : "N/A"),
    },
    {
      type: "actions",
      field: "actions",
      headerName: "Actions",
      width: 140,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      getActions: (params) => [
        <Button
          key={`edit-${params.row.id}`}
          sx={{ fontWeight: "medium", textTransform: "none" }}
          data-bs-toggle="modal"
          data-bs-target="#transferModal"
          onClick={() => {
            setToUser({
              label: params.row.bybit_username,
              value: params.row.bybit_subuid,
            });
            setFromUser({
              label: "Main Account",
              value: user?.bybit_subuid,
            });
          }}
        >
          Transfer
        </Button>,
        <GridActionsCellItem
          key={`edit-${params.row.id}`}
          icon={<FaPen style={{ fontSize: "medium" }} />}
          label="Edit"
          onClick={() => handleEditRow(params.row.user_id)}
        />,
        <GridActionsCellItem
          key={`edit-${params.row.id}`}
          icon={
            <HiTrash style={{ fontSize: "large", color: "var(--bs-danger)" }} />
          }
          label="Delete"
          onClick={() => {
            setSelectedRowId(params.row.user_id), confirmRows.onTrue();
            // handleDeleteRow(params.row.user_id);
          }}
          sx={{ color: "error.main" }}
        />,
      ],
    },
  ];

  const handleDeleteRow = useCallback(
    async (id) => {
      try {
        const deleteRow = tableData.filter((row) => row.id !== id);
        await axiosInstance.delete(
          endpoints.Users.delete(id)
          //   {
          //   data: {
          //     ids: [id],
          //   },
          // }
        );
        refetch();
        toast.success("Delete success!");

        setTableData(deleteRow);
      } catch (error) {
        console.log(error);
        toast.error(error?.message || "Error in deleting record!");
      }
    },
    [tableData]
  );

  const handleEditRow = useCallback(
    (id) => {
      router.push(paths.dashboard.userManagement.users.edit(id));
    },
    [router]
  );

  // if (usersLoading) {
  //   return <LoadingScreen />;
  // }

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <div className="content px-20 pb-20">
        <h2 className="dash-section-title mb-30">User List</h2>
        <div className="row g-4 mb-4">
          <div className="col-md-12">
            <div className="card h-md-100">
              <TabDataTable
                className="userList-table"
                columns={columns}
                data={users}
                loading={usersLoading}
                mode="transactions"
                // filters={filters()}
              />
            </div>
          </div>
        </div>
      </div>
      <ConfirmDialog
        open={confirmRows.value}
        onClose={confirmRows.onFalse}
        title={
          <div style={{ textAlign: "center" }}>
            <HiTrash
              size={30}
              style={{ color: "var(--bs-danger) !important" }}
            />
          </div>
        }
        content={
          <div style={{ textAlign: "center" }}>
            <>
              Are you sure you want to delete
              {/* <strong> {selectedRowId} </strong> */} user?
            </>
          </div>
        }
        action={
          <button
            className="btn btn-danger btn-sm px-4 py-2"
            color="error"
            onClick={() => {
              handleDeleteRow(selectedRowId);
              confirmRows.onFalse();
            }}
          >
            Delete
          </button>
        }
      />

      {/* Transfer Modal */}
      <TransferModal
        fromUser={fromUser}
        setFromUser={setFromUser}
        toUser={toUser}
        setToUser={setToUser}
        fromAccount={fromAccount}
        setFromAccount={setFromAccount}
        toAccount={toAccount}
        setToAccount={setToAccount}
        coinDropdownData={coinDropdownData}
        usersDropDownData={usersDropDownData}
      />
    </>
  );
}
