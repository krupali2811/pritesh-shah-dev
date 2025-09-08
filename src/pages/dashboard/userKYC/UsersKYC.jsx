import { Helmet } from "react-helmet-async";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { toast } from "react-toastify";



import { useRouter } from "../../../routes/hooks/use-router";
import { CONFIG } from "../../../utils/config-global";
import {
  useGetKycStatus,
  useGetUsersKYC,
} from "../../../actions/admin";
import axiosInstance, { endpoints } from "../../../utils/axios";
import { useBoolean } from "../../../hooks/use-boolean";
import DropDown from "../../../components/dropdown/drop-down";
import TabDataTable from "../../../components/table";

// ----------------------------------------------------------------------

const metadata = { title: `Users | Dashboard - ${CONFIG.site.name}` };

export default function Users() {
  const confirmRows = useBoolean();

  const [img, setImg] = useState("");

  //   Get Data
  const { usersKYC, refetch, usersKYCLoading } = useGetUsersKYC();
  const { kycStatuses, kycStatusesLoading } = useGetKycStatus();

  // const filters = useSetState({ publish: [], stock: [] });

  const router = useRouter();

  useEffect(() => {
    if (router.state.refetch) {
      router.state = { ...router.state, refetch: false };
      refetch();
    }
  }, []);

  const columns = [
    {
      field: "user_name",
      headerName: "Username",
      // width: 230,
      minWidth: 140,
      // resizable: false,
      hideable: false,
      renderCell: (params) => (params.value ? params.value : "N/A"),
    },
    {
      field: "user_email",
      headerName: "E-Mail",
      minWidth: 240,
      flex: 1,
      // align: "center",
      // headerAlign: "center",
      // resizable: false,
      renderCell: (params) => (params.value ? params.value : "N/A"),
    },
    {
      field: "document_image_url",
      headerName: "Document",
      minWidth: 240,
      // align: "center",
      // headerAlign: "center",
      renderCell: (params) =>
        params.value ? (
          <img
            src={params.value}
            alt="Document"
            data-bs-toggle="modal"
            data-bs-target="#imageModal"
            onClick={() => {
              setImg(params.value);
            }}
            style={{
              width: "50px",
              height: "50px",
              objectFit: "cover",
              borderRadius: "5px",
            }}
          />
        ) : (
          "N/A"
        ),
    },
    {
      field: "document_number",
      headerName: "Document Number",
      minWidth: 180,
      // resizable: false,
      renderCell: (params) => (params.value ? params.value : "N/A"),
    },
    {
      field: "document_type_details",
      headerName: "Documnet Type",
      minWidth: 180,
      // resizable: false,
      renderCell: (params) => (params.value ? params.value.name : "N/A"),
    },
    {
      field: "status_display",
      headerName: "KYC Status",
      minWidth: 200,
      renderCell: (params) => {
        const handleStatusChange = (newValue) => {
          // Call a function to update the data grid source
          params.api.updateRows([
            {
              ...params.row,
              kyc_status: newValue.value,
              status_display: newValue.label,
            },
          ]);
        };

        return (
          <DropDown
            name="kycStatus"
            className="kycStatus"
            placeholder="Select status"
            state={{
              value: params.row.kyc_status,
              label: params.row.status_display,
            }}
            setState={handleStatusChange}
            options={kycStatuses}
          />
        );
      },
    },
    {
      type: "actions",
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      getActions: (params) => [
        <Button
          key={`kyc-${params.row.id}`}
          sx={{ fontWeight: "medium", textTransform: "none" }}
          onClick={() => handleUpdateKyc(params.row)}
        >
          Update
        </Button>,
      ],
    },
  ];

  const handleUpdateKyc = useCallback(async (row) => {
    console.log(row);
    try {
      await axiosInstance.post(endpoints.usersKYC.updateStatus, {
        kyc_id: row.kyc_id,
        kyc_status: row.kyc_status,
      });
      toast.success("KYC status updated successfully!");
    } catch (error) {
      console.log(error);
      toast.error(error?.message || "Error in updating kyc status!");
    }
  }, []);

  // if (usersKYCLoading || kycStatusesLoading) {
  //   return <LoadingScreen />;
  // }
  // console.log(usersKYC);
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <div className="content px-20 pb-20">
        <h2 className="dash-section-title mb-30">User KYC</h2>
        <div className="row g-4 mb-4">
          <div className="col-md-12">
            <div className="card h-md-100">
              <TabDataTable
                // apiRef={apiRef}
                className="userkyc-table"
                columns={columns}
                data={usersKYC}
                loading={usersKYCLoading}
                mode="transactions"
                // filters={filters()}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal modal-xl"
        tabIndex="-1"
        id="imageModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className=" modal-content  bg-body bg-opacity-92">
             <div className="modal-header justify-content-between">
                  <h3 className="dash-card-subtitle">Document preview</h3>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <i className="bi bi-x"></i>
                  </button>
                </div>
            <div className="modal-body p-5 text-center">
              <img src={img} alt="Document" style={{ width: "100%" }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
