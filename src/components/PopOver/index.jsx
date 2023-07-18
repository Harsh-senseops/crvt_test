import { useState, useEffect, useRef } from "react";
import Popover from "@mui/material/Popover";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

// react-router components
import { useLocation, Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
// import MDInput from "components/MDInput";
import MDBadge from "components/MDBadge";

// Material Dashboard 2 PRO React example components
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarDesktopMenu,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";

// Material Dashboard 2 PRO React context
import {
  useMaterialUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";

//Dilagoe componet imports

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { useSelector, useDispatch } from "react-redux";
import { NOTIFICATION_MESSAGE_BY_DATE } from "apis/queries";
import { useQuery } from "urql";
import { setShouldPauseNotification, setCounter } from "reduxSlices/notifications";
import MDTypography from "components/MDTypography";
// import OnHoverMenu from "components/PopOver";

const useStyles = makeStyles((theme) => ({
    popover: {
      pointerEvents: "none",
    },
    popoverContent: {
      pointerEvents: "auto",
    },
  }));

export default function OnHoverMenu({messages,iconRef,iconsStyle,badgeValue,icon}) {
    const [openedPopover, setOpenedPopover] = useState(false);
    const popoverAnchor = useRef(null);
    const popoverEnter = ({ currentTarget }) => {
        setOpenedPopover(true);
      };
      const classes = useStyles();
      const popoverLeave = ({ currentTarget }) => {
        setOpenedPopover(false);
      };
  return (
    <>
     <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                ref={iconRef}
                aria-owns="mouse-over-popover"
                onMouseEnter={popoverEnter}
                onMouseLeave={popoverLeave}
              >
                <MDBadge badgeContent={badgeValue} color="error" size="xs" circular>
                  <Icon sx={iconsStyle}>{icon}</Icon>
                </MDBadge>
              </IconButton>
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.popoverContent,
        }}
        open={openedPopover}
        anchorEl={iconRef.current}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        PaperProps={{
          onMouseEnter: popoverEnter,
          onMouseLeave: popoverLeave,
          style: {
            background: "rgb(32 41 64)", // Set your desired background color here
          },
        }}
      >
        <Box sx={{ width: "200px", maxWidth: 500, bgcolor: "rgb(32 41 64)" }}>
          {messages.length !== 0 ? (
            messages.map((val) => {
              if (val?.message) {
                return (
                  <Link to="/alertandnotification/notification">
                    <NotificationItem icon={<Icon>campaign</Icon>} title={val.message} />
                  </Link>
                );
              }
            })
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon style={{ marginRight: "10px", color: "white" }}>sentiment_dissatisfied</Icon>

                <MDTypography variant="h6" fontWeight="regular">
                  No new notifications
                </MDTypography>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Link to="/alertandnotification/notification">
                  <MDTypography variant="h6" fontWeight="light">
                    Go to all notifications
                  </MDTypography>
                </Link>
              </div>
            </div>
          )}
          {/* {noOfNotification >= 5 ? (
            <>
              <Link to="/alertandnotification/notification">
                <MDTypography
                  variant="button"
                  fontWeight="regular"
                  sx={{ ml: 1, textAlign: "center" }}
                >
                  Go to all notifications
                </MDTypography>
              </Link>
            </>
          ) : (
            ""
          )} */}
        </Box>
      </Popover>
    </>
  );
}