// @mui material components
import Card from "@mui/material/Card";

// react imports
import { useState, useEffect } from "react";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Grid from "@mui/material/Grid";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ALL_NOTIFICATIONS } from "apis/queries";
import { useQuery } from "urql";
import { Icon } from "@mui/material";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MDInput from "components/MDInput";
import { TableSortLabel } from "@mui/material";

const SORT_DIRECTION = {
  ASC: "asc",
  DESC: "desc",
};

const SORT_BY = {
  DATE_TIME: "datetime",
  DESCRIPTION: "description",
  EMPLOYEE_CODE: "empCode",
  PLANNER_REPORTS: "notificationFrom",
};

const INITIAL_STATE = {
  page: 0,
  rowsPerPage: 5,
  sortDirection: SORT_DIRECTION.ASC,
  sortBy: SORT_BY.NAME,
};

const sortData = (data, sortDirection, sortBy, searchTerm) => {
  const filteredData = data.filter(
    (item) =>
      item.datetime.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.empCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.notificationFrom.toLowerCase().includes(searchTerm.toLowerCase())
    // returnRole(item.role).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = filteredData.sort((a, b) => {
    if (sortDirection === SORT_DIRECTION.ASC) {
      if (typeof a[sortBy] === "string" || a[sortBy] instanceof String) {
        return a[sortBy].toLowerCase() > b[sortBy].toLowerCase() ? 1 : -1;
      } else {
        return a[sortBy] > b[sortBy] ? 1 : -1;
      }
    } else {
      if (typeof a[sortBy] === "string" || a[sortBy] instanceof String) {
        return a[sortBy].toLowerCase() < b[sortBy].toLowerCase() ? 1 : -1;
      } else {
        return a[sortBy] < b[sortBy] ? 1 : -1;
      }
    }
  });

  return sortedData;
};

function fromattedTime(dateTime) {
  const dateTimeString = dateTime;
  const dateTimeObj = new Date(dateTimeString);

  const options = { hour: "numeric", minute: "numeric", second: "numeric", hour12: true };
  const time = dateTimeObj.toLocaleTimeString("en-US", options);
  return time;
}
function Notification() {
  const [state, setState] = useState(INITIAL_STATE);
  // const { page, rowsPerPage } = state;
  const [searchTerm, setSearchTerm] = useState("");
  const [shouldPause, setShouldPause] = useState(true);
  const [notificationsData, rexNotificationsData] = useQuery({
    query: ALL_NOTIFICATIONS,
    pause: shouldPause,
  });
  const [data, setData] = useState([]);

  const handleSort = (sortBy) => {
    setState((prevState) => {
      const sortDirection =
        prevState.sortBy === sortBy && prevState.sortDirection === SORT_DIRECTION.ASC
          ? SORT_DIRECTION.DESC
          : SORT_DIRECTION.ASC;
      return { ...prevState, sortBy, sortDirection };
    });
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    if (!notificationsData.data) {
      setShouldPause(false);
    }
    if (notificationsData.data) {
      const sortedData = sortData(
        notificationsData.data.allNotifications.nodes,
        state.sortDirection,
        state.sortBy,
        searchTerm
      );
      setData(sortedData);
      setShouldPause(true);
    }
  }, [notificationsData.data, state.sortDirection, state.sortBy, searchTerm]);

  return (
    <DashboardLayout>
      <MDBox width="calc(100% - 48px)" position="absolute" top="1.75rem">
        <DashboardNavbar dark absolute />
      </MDBox>
      <MDBox pt={10} pb={3}>
        <Card>
          <MDBox p={3} lineHeight={1}>
            <MDTypography variant="h5" fontWeight="medium">
              NOTIFICATIONS
            </MDTypography>
            <MDInput
              placeholder="Search..."
              // value={search}
              size="small"
              fullWidth
              value={searchTerm}
              onChange={handleSearch}
            />
            <Grid mt={2}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableRow style={{ color: "white" }}>
                    <TableCell>
                      <TableSortLabel
                        onClick={() => handleSort(SORT_BY.DATE_TIME)}
                        sx={{
                          "& .MuiTableSortLabel-icon": {
                            color: "white !important",
                          },
                          "& .MuiTableSortLabel-icon:hover": {
                            background: "white",
                            color: "#202940 !important",
                          },
                        }}
                      >
                        <MDTypography variant="h6" fontWeight="medium">
                          DATE AND TIME
                        </MDTypography>
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="center">
                      <TableSortLabel
                        onClick={() => handleSort(SORT_BY.DESCRIPTION)}
                        sx={{
                          "& .MuiTableSortLabel-icon": {
                            color: "white !important",
                          },
                          "& .MuiTableSortLabel-icon:hover": {
                            background: "white",
                            color: "#202940 !important",
                          },
                        }}
                      >
                        <MDTypography variant="h6" fontWeight="medium">
                          DESCRIPTION
                        </MDTypography>
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="center">
                      <TableSortLabel
                        onClick={() => handleSort(SORT_BY.EMPLOYEE_CODE)}
                        sx={{
                          "& .MuiTableSortLabel-icon": {
                            color: "white !important",
                          },
                          "& .MuiTableSortLabel-icon:hover": {
                            background: "white",
                            color: "#202940 !important",
                          },
                        }}
                      >
                        <MDTypography variant="h6" fontWeight="medium">
                          EMPLOYEE CODE
                        </MDTypography>
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="center">
                      <TableSortLabel
                        onClick={() => handleSort(SORT_BY.PLANNER_REPORTS)}
                        sx={{
                          "& .MuiTableSortLabel-icon": {
                            color: "white !important",
                          },
                          "& .MuiTableSortLabel-icon:hover": {
                            background: "white",
                            color: "#202940 !important",
                          },
                        }}
                      >
                        <MDTypography variant="h6" fontWeight="medium">
                          PLANNER/REPORTS
                        </MDTypography>
                      </TableSortLabel>
                    </TableCell>
                  </TableRow>
                  <TableBody>
                    {data.length !== 0 &&
                      data.map((row) => (
                        <>
                          <TableRow
                            key={row.name}
                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                          >
                            <TableCell align="left" component="th" scope="row">
                              <MDTypography
                                variant="p"
                                fontWeight="regular"
                                style={{ color: "#ffffffcc" }}
                              >
                                <div style={{ width: "150px" }}>
                                  DATE: {row.datetime.split("T")[0]}
                                </div>
                                <div>TIME: {fromattedTime(row.datetime.toUpperCase())}</div>
                              </MDTypography>
                            </TableCell>
                            <TableCell style={{ color: "white" }} align="center">
                              <MDTypography
                                variant="p"
                                fontWeight="regular"
                                style={{ color: "#ffffffcc" }}
                              >
                                {row.description.toUpperCase()}
                              </MDTypography>
                            </TableCell>
                            <TableCell style={{ color: "white" }} align="center">
                              <MDTypography
                                variant="h6"
                                fontWeight="regular"
                                style={{ color: "#ffffffcc" }}
                              >
                                {row.empCode.toUpperCase()}
                              </MDTypography>
                            </TableCell>
                            <TableCell style={{ color: "white" }} align="center">
                              <MDTypography
                                variant="h6"
                                fontWeight="regular"
                                style={{ color: "#ffffffcc" }}
                              >
                                {row.notificationFrom.toUpperCase()}
                              </MDTypography>
                            </TableCell>
                          </TableRow>
                        </>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </MDBox>
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Notification;
