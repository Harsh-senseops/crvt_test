import React from "react";
import { Dialog } from "@mui/material";
import PropTypes from "prop-types";

export default function MDDialog({ open, onClose, children }) {
  return (
    <Dialog
    componentsProps={{ backdrop: { style: { 
       background: "rgba( 26, 32, 53, 0.01 )",
      boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
      backdropFilter:" blur( 5px )",
      borderRadius: "10px",
      border: "1px solid rgba( 255, 255, 255, 0.18 )",
     } } }}
    // sx={{
    //   "MuiBackdrop-root":{
    //     background:"transparent"
    //   }
      // background: "#394259",
      // boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
      // backdropFilter:" blur( 5px )",
      // borderRadius: "10px",
      // border: "1px solid rgba( 255, 255, 255, 0.18 )",
    // }}
      PaperProps={{
        style: {
          backgroundColor: "#202940",
          padding:"1em"
        },
      }}
      onClose={onClose}
      open={open}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
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
