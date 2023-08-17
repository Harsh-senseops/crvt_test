import { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

// react-router components
import { useLocation, Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import Icon from "@mui/material/Icon";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
// import MDInput from "components/MDInput";

// Material Dashboard 2 PRO React example components
import Breadcrumbs from "examples/Breadcrumbs";
import { IconButton } from "@mui/material";

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
import {
  setShouldPauseNotification,
  setCounter,
  addNotifications,
} from "reduxSlices/notifications";
import MDTypography from "components/MDTypography";
import OnHoverMenu from "components/PopOver";
// import { Link } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: "none",
  },
  popoverContent: {
    pointerEvents: "auto",
  },
}));

function DashboardNavbar({ absolute, light, isMini }) {
  const iconRef = React.useRef(null);

  const messages = ["Notification 1", "Notification 2", "Notification 3"];
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator, darkMode } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [openedPopover, setOpenedPopover] = useState(false);
  const [openAlertPopOver, setOpenAlertPopover] = useState(false);
  const popoverAnchor = useRef(null);
  const [noOfNotification, setNoOfNotification] = useState(0);
  const [notificationsState, setNotification] = useState([]);
  // const [getAllNotifica]
  const nStore = useSelector((store) => {
    return store.notifications;
  });
  const date = new Date(); // Replace with your desired date object
  const dispatchR = useDispatch();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day} 0:0:0.0000`;
  const [notificationMsgByDate, rexNMBD] = useQuery({
    query: NOTIFICATION_MESSAGE_BY_DATE,
    variables: { dateTime: new Date(formattedDate) },
    pause: nStore.shouldPause,
  });

  const popoverEnter = ({ currentTarget }) => {
    setOpenedPopover(true);
  };

  const popoverLeave = ({ currentTarget }) => {
    setOpenedPopover(false);
  };

  const popoverEnterAlert = ({ currentTarget }) => {
    // alert("amig")
    setOpenAlertPopover(true);
  };

  const popoverLeaveAlert = ({ currentTarget }) => {
    setOpenAlertPopover(false);
  };

  const classes = useStyles();

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    // window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  useEffect(() => {
    if (notificationsState.length === 0) {
      dispatchR(setShouldPauseNotification(false));
    }
    // if(!nStore.shouldPause){
    //   rexNMBD({ requestPolicy: 'network-only' })
    // }
    if (notificationMsgByDate.data) {
      dispatchR(setShouldPauseNotification(true));
      let tempArr = [];
      if (notificationMsgByDate.data.allNotifications.nodes.length !== 0) {
        for (let i = 0; i < notificationMsgByDate.data.allNotifications.nodes.length; i++) {
          if (i < 5) {
            tempArr.push(notificationMsgByDate.data.allNotifications.nodes[i].message);
          }
        }
        dispatchR(addNotifications(tempArr));
      }
      dispatchR(setCounter(notificationMsgByDate.data.allNotifications.nodes.length));
      setNoOfNotification(notificationMsgByDate.data.allNotifications.nodes.length);
    }
  }, [notificationMsgByDate.data, nStore.shouldPause]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  // Styles for the navbar icons
  const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function logout() {
    localStorage.clear();
    navigate("/authentication/sign-in/basic");
  }

  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <MDBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
          <IconButton sx={navbarDesktopMenu} onClick={handleMiniSidenav} size="small" disableRipple>
            <Icon fontSize="medium" sx={iconsStyle}>
              {miniSidenav ? "menu_open" : "menu"}
            </Icon>
          </IconButton>
        </MDBox>
        {isMini ? null : (
          <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
            <MDBox color={light ? "white" : "inherit"}>
              <IconButton
                onClick={handleClickOpen}
                sx={navbarIconButton}
                size="small"
                disableRipple
              >
                <Icon sx={iconsStyle}>logout</Icon>
              </IconButton>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                onClick={handleConfiguratorOpen}
              >
                <Icon sx={iconsStyle}>settings</Icon>
              </IconButton>
              <OnHoverMenu
                messages={messages}
                badgeValue={messages.length}
                iconRef={iconRef}
                iconsStyle={iconsStyle}
                icon="priority_high"
                link="/alertandnotification/alert"
              />
              <OnHoverMenu
                messages={nStore.notifications}
                badgeValue={nStore.counter}
                iconRef={popoverAnchor}
                iconsStyle={iconsStyle}
                icon="notifications"
                link="/alertandnotification/notification"
              />
            </MDBox>
          </MDBox>
        )}
      </Toolbar>
      <Dialog
        PaperProps={{
          style: {
            backgroundColor: "#202940",
          },
        }}
        // style={{background:"red"}}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Confirm logout"}</DialogTitle>
        <DialogContent>
          <DialogContentText style={{ padding: "10px" }} id="alert-dialog-slide-description">
            Are you sure, you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={logout}>Logout</Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
