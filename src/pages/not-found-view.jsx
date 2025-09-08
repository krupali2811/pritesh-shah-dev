import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// ----------------------------------------------------------------------

export default function NotFoundView() {
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
      <Typography
        variant="h3"
        sx={{
          mb: 2,
          fontFamily: "Axiforma",
          fontSize: "300px",
          fontWeight: 500,
          lineHeight: "240px",
          letterSpacing: "-0.04em",
          textAlign: "center",
          color: "var(--bs-secondary)",
        }}
      >
        404
      </Typography>

      <Typography
        component="h6"
        sx={{
          fontFamily: "Axiforma",
          fontSize: "27px",
          fontWeight: 500,
          lineHeight: "34.14px",
          letterSpacing: "-0.04em",
          textAlign: "center",
        }}
      >
        <span className="text-primary">Oops!</span>{" "}
        <span className="text-secondary">Page Not Found</span>
      </Typography>     
    </Box>
  );
}
