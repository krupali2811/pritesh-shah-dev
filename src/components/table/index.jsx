 
import { useCallback, useEffect, useState } from "react";
import { Stack, styled } from "@mui/material";
import {
  DataGrid,
  gridClasses,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  useGridApiRef,
} from "@mui/x-data-grid"; // Import DataGrid

import { ConfirmDialog } from "../custom-dialog/confirm-dialog";
import { useBoolean } from "../../hooks/use-boolean";
import useMarket from "../../hooks/useMarket";
import useTheme from "../../hooks/useTheme";

// Define theme overrides to add borders to all cells
const CustomDataGrid = styled(DataGrid)(({ theme }) => ({
  // "--DataGrid-containerBackground": "#FFFFFF0D",
  "--DataGrid-containerBackground":
    theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.04)" : "#FFFFFF0D",
  "--DataGrid-pinnedBackground": "#FFFFFF0D",
  "--unstable_DataGrid-radius": "0",
  "--unstable_DataGrid-overlayBackground": "transparent",
  color: "inherit",
  fontFamily: "inherit",
  fontSize: "inherit",
  borderWidth: "0",
  "--DataGrid-rowBorderColor": "transparent",
  "& .MuiCircularProgress-root": {
    color: "var(--bs-primary) !important", // Change loader color
  },
  "& .MuiDataGrid-overlay": {
    backgroundColor: "rgba(255, 255, 255, 0.1)", // Optional: Change overlay background
  },

  "& .MuiDataGrid-cell, & .MuiDataGrid-columnHeaders, & .MuiDataGrid-virtualScroller":
    {
      border: "none",
    },
  "& .MuiDataGrid-columnHeaders": {
    border: "none",
    color: "var(--bs-secondary)",
  },
  "& .MuiDataGrid-footerContainer": {
    border: "none",
    color: "inherit",
  },
  "& .MuiDataGrid-footerContainer .MuiTablePagination-root, & .MuiTablePagination-selectLabel, & .MuiTablePagination-select, & .MuiTablePagination-displayedRows, & .MuiInput-input":
    {
      color: "initial",
      fontSize: "inherit !important",
      fontFamily: "var(--bs-body-font-family) !important",
    },
  "& .MuiDataGrid-cell": {
    padding: "20px 12px",
    overflow: "visible" /* Prevents clipping */,
    position: "relative",
  },
  "& .MuiButton-root, & .MuiFormLabel-root-MuiInputLabel-root.Mui-focused": {
    color: "var(--bs-primary)",
    fontFamily: "inherit",
  },
  "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within, & .MuiDataGrid-row.Mui-selected, & .MuiCheckbox-root:focus, & .MuiCheckbox-root:focus-visible":
    {
      outline: "none",
    },
  "& .MuiCheckbox-root:focus, & .MuiCheckbox-root:focus-visible, & .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within":
    {
      outline: "none !important",
      boxShadow: "none !important",
    },
  "& .MuiInput-underline:after, & .MuiInput-underline:before": {
    borderBottom: "none !important",
  },
  "& .MuiIconButton-root, & .MuiSvgIcon-root": {
    color: "var(--bs-secondary)",
  },
  "& svg.MuiSvgIcon-root": {
    fill: "var(--bs-secondary)",
  },
  "& .MuiDataGrid-columnSeparator": {
    display: "none",
  },
  "& .MuiDataGrid-row.Mui-selected, & .MuiDataGrid-row.Mui-selected:hover": {
    background: "#FFFFFF0D",
  },
  "& .MuiCheckbox-root:focus, & .MuiCheckbox-root:focus-visible": {
    boxShadow: "none",
  },

  "& .MuiButtonBase-root-MuiCheckbox-root.Mui-checked, & .MuiButtonBase-root-MuiCheckbox-root.MuiCheckbox-indeterminate":
    {
      color: "var(--bs-primary)",
    },
  "& .MuiDataGrid-toolbarContainer": {
    padding: "8px 14px 14px",
  },
  "& .MuiDataGrid-toolbarQuickFilter ": {
    paddingBottom: "0",
  },

  "& .MuiInputBase-root": {
    border: `1px solid ${
      theme.palette.mode === "light" ? "#CFCFCF" : "var(--bs-secondary)"
    }`,
    borderRadius: "6px",
    color: "var(--bs-body-color)",
    padding: "4px 12px",
  },
  "& .MuiInputBase-root.Mui-focused": {
    borderColor: "var(--bs-primary)",
  },
  "& .MuiInputBase-input.MuiInput-input.MuiInputBase-inputTypeSearch": {
    padding: "0",
    height: "unset",
  },
  "& .MuiCheckbox-root": {
    borderRadius: "3px",
    width: "18px",
    height: "18px",
  },
  "& .MuiCheckbox-root.Mui-checked": {
    backgroundImage:
      "url(/assets/images/check.svg), linear-gradient(90deg, #519251 0%, #2B6B2B 100%)",
    backgroundPosition: "center",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    borderColor: "var(--bs-primary)",
  },
  "& .MuiCheckbox-root.Mui-checked svg.MuiSvgIcon-root": {
    opacity: 0, // Hide the default check icon
  },
  "& .MuiTablePagination-toolbar": {
    paddingLeft: "0",
  },
}));

const HIDE_COLUMNS = { category: false, triggarPrice: false };

const HIDE_COLUMNS_TOGGLABLE = ["category", "actions"];

export default function TabDataTable({
  id,
  columns,
  data = null,
  loading: recordsLoading,
  filters = null,
  mode,
}) {
  const confirmRows = useBoolean();
  const loading = useBoolean();
  const apiRef = useGridApiRef();
  const [selectedRowIds, setSelectedRowIds] = useState([]);

  const { setMarketPagination } = useMarket();

  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const tableRecords =
    data &&
    data.map((crypto, index) => ({
      ...crypto,
      id: index, // Assigning a unique ID
    }));

  const records = tableRecords || [];
  const totalRecords = records?.length || 0;
  // console.log(records)
  const [filterButtonEl, setFilterButtonEl] = useState(null);

  const [columnVisibilityModel, setColumnVisibilityModel] =
    useState(HIDE_COLUMNS);

  useEffect(() => {
    setTableData((prevData) => {
      if (JSON.stringify(prevData) !== JSON.stringify(records)) {
        return records;
      }
      return prevData;
    });
  }, [records]);

  useEffect(() => {
    if (records) {
      loading.onFalse();
    }
  }, [currentPage, pageSize, searchQuery]);

  const handlePaginationChange = (newPaginationModel) => {
    if (newPaginationModel.page !== currentPage) {
      loading.onTrue(); // Show loader on page change
    }
    setCurrentPage(newPaginationModel.page);
    setPageSize(newPaginationModel.pageSize);
    setMarketPagination({
      currentPage: newPaginationModel.page,
      pageSize: newPaginationModel.pageSize,
    });
  };

  const handleSearchInputChange = (filterModel) => {
    const query = filterModel.quickFilterValues?.[0] || "";
    setSearchQuery(query);
  };

  /*   const handleDeleteRow = useCallback(
    async (id) => {
      try {
        const deleteRow = tableData.filter((row) => row.id !== id);
        await axiosInstance.delete(endpoints.CarRecords.delete, {
          data: {
            ids: [id],
          },
        });

        toast.success("Delete success!");

        setTableData(deleteRow);
      } catch (error) {
        console.log(error);
        toast.error(error?.message || "Error in deleting record!");
      }
    },
    [tableData]
  ); */

  /*   const handleDeleteRows = useCallback(async () => {
    try {
      const deleteRows = tableData.filter(
        (row) => !selectedRowIds.includes(row.id)
      );
      await axiosInstance.delete(endpoints.CarRecords.delete, {
        data: {
          ids: selectedRowIds,
        },
      });
      toast.success("Delete success!");

      setTableData(deleteRows);
    } catch (error) {
      console.log(error);
      toast.error(error?.message || "Error in deleting records!");
    }
  }, [selectedRowIds, tableData]);

  const handleEditRow = useCallback(
    (id) => {
      router.push(paths.dashboard.carRecords.edit(id));
    },
    [router]
  ); */

  /*   const handleViewRow = useCallback(
    (id) => {
      router.push(paths.dashboard.carRecords.details(id));
    },
    [router]
  ); */

  const CustomToolbarCallback = useCallback(
    () => (
      <CustomToolbar
        filters={filters}
        selectedRowIds={selectedRowIds}
        setFilterButtonEl={setFilterButtonEl}
      />
    ),
    [filters, selectedRowIds]
  );

  const getTogglableColumns = () =>
    columns
      .filter((column) => !HIDE_COLUMNS_TOGGLABLE.includes(column.field))
      .map((column) => column.field);

  //Loader
  // if (loading.value) {
  //   return <LoadingScreen />;
  // }

  const { theme } = useTheme();

  return (
    <>
      <div className="page-content">
        <CustomDataGrid
          key={id}
          apiRef={apiRef}
          className={`${id}-table`}
          // checkboxSelection
          checkboxSelection={false}
          disableRowSelectionOnClick
          rows={tableData}
          columns={columns}
          getRowHeight={() => "auto"}
          loading={recordsLoading}
          pagination
          // paginationMode="server"
          // rowCount={totalRecords}
          pageSizeOptions={[10, 25, 50, 100]}
          experimentalFeatures={{ newEditingApi: true }}
          paginationModel={{
            page: currentPage,
            pageSize: pageSize,
          }}
          onPaginationModelChange={handlePaginationChange}
          initialState={{
            pagination: {
              paginationModel: { page: currentPage, pageSize: pageSize },
            },
            // sorting: {
            //   sortModel: [{ field: "turnover24h", sort: "desc" }],
            // },
          }}
          onRowSelectionModelChange={(newSelectionModel) =>
            setSelectedRowIds(newSelectionModel)
          }
          columnVisibilityModel={columnVisibilityModel}
          onColumnVisibilityModelChange={(newModel) =>
            setColumnVisibilityModel(newModel)
          }
          onFilterModelChange={(filterModel) => {
            handleSearchInputChange(filterModel);
          }}
          slots={{
            toolbar: CustomToolbarCallback,
          }}
          slotProps={{
            panel: { anchorEl: filterButtonEl },
            toolbar: { setFilterButtonEl },
            columnsManagement: { getTogglableColumns },
          }}
          sx={{
            [`& .${gridClasses.cell}`]: {
              alignItems: "center",
              display: "inline-flex",
            },
            minHeight: "400px",
            overflow: "unset",
            "& .MuiInputBase-root": {
              borderColor:
                theme === "light" ? "#cfcfcf" : "var(--bs-secondary)",
            },
          }}
        />
      </div>

      <ConfirmDialog
        open={confirmRows.value}
        onClose={confirmRows.onFalse}
        title={
          <div style={{ textAlign: "center" }}>
            <i
              className="bi bi-trash-fill"
              style={{ fontSize: "24px", color: "var(--bs-danger)" }}
            ></i>
          </div>
        }
        content={
          <div style={{ textAlign: "center" }}>
            <>
              Are you sure you want to delete{" "}
              <strong> {selectedRowIds.length} </strong> items?
            </>
          </div>
        }
        action={
          <button
            className="btn btn-danger btn-sm px-4 py-2"
            // color="error"
            onClick={() => {
              confirmRows.onFalse();
            }}
          >
            Delete
          </button>
        }
      />
    </>
  );
}

function CustomToolbar({ setFilterButtonEl, filters }) {
  return (
    <>
      <GridToolbarContainer className="p-4">
        {filters}
        <Stack
          spacing={1}
          flexGrow={1}
          direction="row"
          alignItems="center"
          alignSelf="flex-end"
          justifyContent="flex-end"
        >
          <GridToolbarQuickFilter />
          {/* <GridToolbarColumnsButton /> */}
          {/* <GridToolbarFilterButton ref={setFilterButtonEl} /> */}
        </Stack>
      </GridToolbarContainer>
    </>
  );
}
