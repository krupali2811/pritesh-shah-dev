import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

// ----------------------------------------------------------------------

export function ConfirmDialog({
  title,
  content,
  action,
  open,
  onClose,
  ...other
}) {
  return (
    <Dialog
      fullWidth
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 3,
          px: 4,
          py: 3,
          maxWidth: 400,
          backgroundColor: "rgba(var(--bs-body-bg-rgb),1)",
          color: "var(--bs-body-color)",
          textAlign: "center",
          fontFamily: "WorkSans",
          "& .MuiDialogContent-root": {
            padding: 0,
          },
          "& .MuiModal-backdrop": {
            filter: "blur(100px)",
          },
        },
      }}
      {...other}
    >
      <DialogTitle
        sx={{
          px: 0,
          mb: 2,
        }}
      >
        <div
          className="dash-card-subtitle"
          style={{
            fontSize: 24,
            fontWeight: 600,
          }}
        >
          {title}
        </div>
      </DialogTitle>

      {content && (
        <DialogContent
          sx={{
            px: 0,
            mb: 2,
            fontSize: 18,
          }}
        >
          {content}
        </DialogContent>
      )}

      <DialogActions
        sx={{
          justifyContent: "center",
          gap: 2,
          px: 0,
        }}
      >
        {action}

        <button
          onClick={onClose}
          color="primary"
          className="btn btn-outline-primary btn-sm px-4 py-2 min-w-unset shadow-none text-white"
        >
          Cancel
        </button>
      </DialogActions>
    </Dialog>
  );
}
