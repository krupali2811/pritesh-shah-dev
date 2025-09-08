import Box from "@mui/material/Box";

// ----------------------------------------------------------------------

export default function PermissionDeniedPage() {
  return (
    <Box
      className="error_404"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box
        component="img"
        src="/assets/img/Error-403.png"
        alt="403-error"
        sx={{
          display: "block",
          margin: "20px auto 0 ",
          maxWidth: "500px",
          height: "auto",
        }}
      />
    </Box>
  );
}
