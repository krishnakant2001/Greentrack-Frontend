import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export const MessageModal = ({
  open,
  handleClose,
  title,
  description,
}: {
  open: boolean;
  handleClose: () => void;
  title: string;
  description?: string;
}) => {
  return (
    <Dialog open={open} onClose={() => handleClose()}>
      <DialogTitle id="alert-dialog-title"> {title} </DialogTitle>{" "}
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()}>OK</Button>
      </DialogActions>
    </Dialog>
  );
};
