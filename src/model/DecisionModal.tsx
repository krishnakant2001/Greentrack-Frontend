import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export const DecisionModal = ({
  open,
  handleClose,
  title,
  description,
}: {
  open: boolean;
  handleClose: (action: "delete" | "cancel") => void;
  title: string;
  description?: string;
}) => {
  return (
    <Dialog open={open} onClose={() => handleClose("cancel")}>
      <DialogTitle id="alert-dialog-title"> {title} </DialogTitle>{" "}
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => handleClose("cancel")}>
          No
        </Button>
        <Button variant="contained" onClick={() => handleClose("delete")}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
