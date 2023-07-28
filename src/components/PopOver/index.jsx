import { useState, useEffect, useRef } from "react";
import Popover from "@mui/material/Popover";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

import { Link } from "react-router-dom";

// @material-ui core components
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 PRO React components
import MDBadge from "components/MDBadge";

// Material Dashboard 2 PRO React example components
import NotificationItem from "examples/Items/NotificationItem";

// Custom styles for DashboardNavbar
import { navbarIconButton } from "examples/Navbars/DashboardNavbar/styles";

//Dilagoe componet imports

import Box from "@mui/material/Box";
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

export default function OnHoverMenu({ messages, iconRef, iconsStyle, badgeValue, icon, link }) {
  const [openedPopover, setOpenedPopover] = useState(false);
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
              if (val) {
                return (
                  <Link to={link}>
                    <NotificationItem icon={<Icon>campaign</Icon>} title={val} />
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
              ></div>
            </div>
          )}
          <Link to="/alertandnotification/notification">
            <NotificationItem icon={<Icon>campaign</Icon>} title="Go to all Notifications" />
          </Link>
        </Box>
      </Popover>
    </>
  );
}
