import Container from "@mui/material/Container";
import { Box, Typography } from "@mui/material";

import useAuth from "../../hooks/useAuth";

// ----------------------------------------------------------------------

export function RoleBasedGuard({
  sx,
  children,
  hasContent,
  currentPermission,
}) {
  const { user } = useAuth();
  const acceptPermissions = user?.role?.role_name;

  if (
    typeof acceptPermissions !== "undefined" &&
    !(acceptPermissions === currentPermission)
  ) {
    return hasContent ? (
      <Container sx={{ textAlign: "center", ...sx }}>
        <Box
          className="error_403"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              mb: 2,
              fontFamily: "Lexend",
              fontSize: "300px",
              fontWeight: 500,
              lineHeight: "240px",
              letterSpacing: "-0.04em",
              textAlign: "center",
              color: "var(--bs-secondary)",
            }}
          >
            403
          </Typography>

          <Typography
            component="h6"
            sx={{
              fontFamily: "Lexend",
              fontSize: "27px",
              fontWeight: 500,
              lineHeight: "34.14px",
              letterSpacing: "-0.04em",
              textAlign: "center",
            }}
          >
            <span className="text-primary">Oops!</span>{" "}
            <span className="text-secondary">Permission denied</span>
          </Typography>
        </Box>
      </Container>
    ) : null;
  }

  return <> {children} </>;
}
