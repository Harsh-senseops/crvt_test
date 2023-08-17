import React from "react";
import { Dialog } from "@mui/material";
import PropTypes from "prop-types";

export default function MDDialog({ open, onClose, children }) {
  return (
    <Dialog
      PaperProps={{
        style: {
          backgroundColor: "#202940",
          padding:"1em"
        },
      }}
      onClose={onClose}
      open={open}
    >
      {children}
    </Dialog>
  );
}

MDDialog.prototype = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
