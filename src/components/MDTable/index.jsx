import { TableSortLabel } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Pagination from "@mui/material/Pagination";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React, { useState, useEffect } from "react";
import MDTypography from "components/MDTypography";
import { Button } from "@mui/material";
import MDBox from "components/MDBox";

function formattedTime(dateTime) {
  const dateTimeString = dateTime;
  const dateTimeObj = new Date(dateTimeString);
  let date = dateTime.split("T")[0];
  const options = { hour: "numeric", minute: "numeric", second: "numeric", hour12: true };
  const time = dateTimeObj.toLocaleTimeString("en-US", options);
  return { date, time };
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiPaginationItem-root": {
      color: "white",
      border: "1px solid #f0f2f566",
      height: "40px",
      width: "40px",
      borderRadius: "50%",
      "&:hover": {
        backgroundColor: "#F44335",
      },
    },
    "& .Mui-selected": {
      background: "#F44335",
      boxShadow:
        "0rem 0.1875rem 0.1875rem 0rem rgba(244, 67, 53, 0.15),0rem 0.1875rem 0.0625rem -0.125rem rgba(244, 67, 53, 0.2),0rem 0.0625rem 0.3125rem 0rem rgba(244, 67, 53, 0.15)",
      border: "none",
    },
  },
  action: {
    color: "#f44335",
    cursor: "pointer",
    fontWeight: "bold",
    borderBottom: "2px solid transparent",
    "&:hover": {
      // borderBottom:"1px solid white",
      color: "#3a94ee",
    },
  },
  tableRow: {
    "&:hover": {
      background: "#4c5365a8",
    },
  },
  actionTaken: {
    color: "yellow",
  },
}));

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
  rowsPerPage: 10,
  sortDirection: SORT_DIRECTION.ASC,
  sortBy: SORT_BY.NAME,
};

const sortData = (data, sortDirection, sortBy, searchTerm) => {
  const filteredData = data.filter((item) =>
    Object.values(item).some(
      (value) =>
        value !== null &&
        value !== undefined && // Check for null or undefined
        value.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())
    )
  );

  const resultData = filteredData.length > 0 ? filteredData : data;
  // const sortedData = resultData.sort((a, b) => {
  //   if (sortDirection === SORT_DIRECTION.ASC && (a[sortBy].length !== 0 || 0)) {
  //     if (typeof a[sortBy] === "string" || a[sortBy] instanceof String) {
  //       return a[sortBy].toLowerCase() > b[sortBy].toLowerCase() ? 1 : -1;
  //     } else {
  //       return a[sortBy] > b[sortBy] ? 1 : -1;
  //     }
  //   } else {
  //     if (typeof a[sortBy] === "string" || a[sortBy] instanceof String) {
  //       return a[sortBy].toLowerCase() < b[sortBy].toLowerCase() ? 1 : -1;
  //     } else {
  //       return a[sortBy] < b[sortBy] ? 1 : -1;
  //     }
  //   }
  // });
  const sortedData = [...resultData]; // Create a new array to avoid modifying the original data

  if (sortDirection === SORT_DIRECTION.ASC) {
    sortedData.sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
  
      if (aValue !== undefined && aValue !== null) {
        if (typeof aValue === "string") {
          return aValue.toLowerCase().localeCompare(bValue.toLowerCase());
        } else {
          return aValue - bValue;
        }
      } else {
        return bValue !== undefined && bValue !== null ? -1 : 0;
      }
    });
  } else {
    sortedData.sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
  
      if (aValue !== undefined && aValue !== null) {
        if (typeof aValue === "string") {
          return bValue.toLowerCase().localeCompare(aValue.toLowerCase());
        } else {
          return bValue - aValue;
        }
      } else {
        return bValue !== undefined && bValue !== null ? 1 : 0;
      }
    });
  }
  
  return sortedData;
};

function MDTable({ data, searchTerm, onTouch }) {
  const ENTRIES_PER_PAGE = 10; // Number of entries to show per page
  const classes = useStyles();
  const [state, setState] = useState(INITIAL_STATE);
  const [rows, setRows] = useState([]);
  //   console.log(data.rows)
  const pageStartIndex = state.page * ENTRIES_PER_PAGE;
  const pageEndIndex = pageStartIndex + ENTRIES_PER_PAGE;
  const pageData = rows.slice(pageStartIndex, pageEndIndex);
  useEffect(() => {
    if (data.rows) {
      const sortedData = sortData(data.rows, state.sortDirection, state.sortBy, searchTerm);
      setRows(sortedData);
    }
  }, [state.sortBy, state.sortDirection, searchTerm, data]);
  const handlePageChange = (event, newPage) => {
    setState((prevState) => ({ ...prevState, page: newPage - 1 }));
  };
  const handleSort = (sortBy) => {
    setState((prevState) => {
      const sortDirection =
        prevState.sortBy === sortBy && prevState.sortDirection === SORT_DIRECTION.ASC
          ? SORT_DIRECTION.DESC
          : SORT_DIRECTION.ASC;
      return { ...prevState, sortBy, sortDirection };
    });
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableRow style={{ color: "white" }}>
          {data.length !== 0 &&
            data.columns.map((column) => {
              return (
                <TableCell>
                  <TableSortLabel
                    onClick={() => handleSort(column.accessor)}
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
                      {column.Header.toUpperCase()}
                    </MDTypography>
                  </TableSortLabel>
                </TableCell>
              );
            })}
        </TableRow>

        <TableBody>
          {pageData &&
            pageData.map((row, i) => {
              let isDisabled = row?.ignore?.alertStatus ? false : true;
              let actionTaken = row?.actionTaken || "None taken";
              return (
                <TableRow
                  className={classes.tableRow}
                  key={row.accessor}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    transition: "all 250ms",
                    ":hover": {
                      boxShadow: 20,
                      cursor: "pointer",
                      backgroundColor: "#384158 !important",
                      borderRadius: "10px",
                      // transform: "scale(1.02)",
                    },
                  }}
                >
                  {row &&
                    Object.entries(row).map(([key, value]) => {
                    // let columnKeys = Object.keys(data.c)
                    const index = data.columns.findIndex((obj) => obj.accessor === key);
                    // console.log(key)
                      if (key === "ignore" || key === "__typename") return;
                      if(index === -1) return
                      return (
                        <TableCell align={row.aign ? row.align : "left"} component="th" scope="row">
                          <MDTypography variant="p" fontWeight="light" style={{ color: "#fff" }}>
                            <div>
                              {key.toLowerCase().includes("datetime") ? (
                                <>
                                  <MDTypography variant="h6" fontWeight="regular">
                                    {formattedTime(value).date}
                                  
                                  </MDTypography>
                                  <br />
                                  <MDTypography variant="h6" fontWeight="regular">{formattedTime(value).time}</MDTypography>
                                </>
                              ) : (
                                <MDTypography variant="h6" fontWeight="regular">
                                  {value}
                                </MDTypography>
                                
                              )}
                            </div>

                            {key === "machineStatus" ? (
                              !isDisabled ? (
                                <span onClick={() => onTouch(i)} className={classes.action}>
                                  Actions
                                </span>
                              ) : (
                                <span className={classes.actionTaken}>
                                  Action Taken {actionTaken}
                                </span>
                              )
                            ) : (
                              ""
                            )}
                          </MDTypography>
                        </TableCell>
                      );
                    })}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
         <MDBox
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        p={3}
      >
        <MDTypography variant="h6" style={{fontSize:"0.8rem"}} fontWeight="regular">Showing {pageData.length} out of {rows.length}</MDTypography>
        <Pagination
          count={Math.ceil(rows.length / ENTRIES_PER_PAGE)}
          hidePrevButton={state.page === 0}
          classes={{ root: classes.root }}
          //   color="secondary"
          page={state.page + 1}
          onChange={handlePageChange}
        />
      </MDBox>
        
    </TableContainer>
  );
}

export default React.memo(MDTable);
