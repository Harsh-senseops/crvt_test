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
import {Button} from "@mui/material";
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
  rowsPerPage: 5,
  sortDirection: SORT_DIRECTION.ASC,
  sortBy: SORT_BY.NAME,
};

const sortData = (data, sortDirection, sortBy, searchTerm) => {
  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())
    )
  );

  const resultData = filteredData.length > 0 ? filteredData : data;

  const sortedData = resultData.sort((a, b) => {
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

function MDTable({ data, searchTerm, onTouch }) {
  const ENTRIES_PER_PAGE = 5; // Number of entries to show per page
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
      console.log(sortedData);
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
                      {column.Header}
                    </MDTypography>
                  </TableSortLabel>
                </TableCell>
              );
            })}
        </TableRow>

        <TableBody>
          {pageData &&
            pageData.map((row, i) => {
              return (
                <TableRow
                  key={row.accessor}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {row &&
                    Object.entries(row).map(([key, value]) => {
                         {JSON.stringify(key)}
                      if (key !== "__typename") {
                        return (
                          <TableCell
                            align={row.aign ? row.align : "left"}
                            component="th"
                            scope="row"
                          >
                            <MDTypography variant="p" fontWeight="light" style={{ color: "#fff" }}>
                              <div>{value}</div>

                              {key === "machineStatus" ? <Button style={{background:"#f44335",color:"white",marginTop:"20px"}} onClick={()=>onTouch(i)}>Action</Button>:""}
                            </MDTypography>
                          </TableCell>
                        );
                      }
                    })}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "1em 0",
        }}
      >
        <Pagination
          count={Math.ceil(rows.length / ENTRIES_PER_PAGE)}
          hidePrevButton={state.page === 0}
          classes={{ root: classes.root }}
          //   color="secondary"
          page={state.page + 1}
          onChange={handlePageChange}
        />
      </div>
    </TableContainer>
  );
}

export default React.memo(MDTable);
