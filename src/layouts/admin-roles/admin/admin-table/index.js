import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TablePagination,
  TableSortLabel,
  IconButton,
} from "@mui/material";
import ModeEditOutlineSharpIcon from "@mui/icons-material/ModeEditOutlineSharp";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { Card, Grid } from "@mui/material";
import MDButton from "components/MDButton";
import MDDialog from "layouts/admin-roles/registration-page";
import * as action from "../../../../reduxSlices/userManagement";
import { useQuery, useMutation, useSubscription } from "urql";
import { GET_ALL_USER, DELETE_USER, SUB } from "apis/queries";
import React from "react";
import "./index.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import alertAndLoaders from "utils/alertAndLoaders";
import { Tooltip } from "@mui/material";
import MDTypography from "components/MDTypography";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SORT_DIRECTION = {
  ASC: "asc",
  DESC: "desc",
};

const SORT_BY = {
  NAME: "name",
  EMPLOYEE_CODE: "employeeCode",
  ROLE: "role",
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
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.employeeCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      returnRole(item.role).toLowerCase().includes(searchTerm.toLowerCase())
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

const returnRole = (role) => {
  if (role === 1) {
    return "Admin";
  } else if (role === 2) {
    return "Operator";
  } else if (role === 3) {
    return "Super user";
  }
};

const AdminTable = () => {
  const store = useSelector((store) => {
    return store.um;
  });
  // const [shouldPause, setShouldPause] = React.useState(false);
  const [state, setState] = useState(INITIAL_STATE);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [count, setCount] = useState("");
  const [index, setIndex] = useState("");
  const [userName, setUserName] = useState("");
  const [updateOrAdd, setUpdateOrAdd] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteUserRes, deleteUserAPI] = useMutation(DELETE_USER);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const [res, rexRes] = useSubscription({
    query: SUB,
    pause: store.shouldPause,
  });

  // const {data,fetching,error} = res;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (_, newPage) => {
    setState((prevState) => ({ ...prevState, page: newPage }));
  };

  const handleChangeRowsPerPage = (event) => {
    const rowsPerPage = parseInt(event.target.value, 10);
    setState((prevState) => ({ ...prevState, rowsPerPage, page: 0 }));
  };

  const handleSort = (sortBy) => {
    setState((prevState) => {
      const sortDirection =
        prevState.sortBy === sortBy &&
        prevState.sortDirection === SORT_DIRECTION.ASC
          ? SORT_DIRECTION.DESC
          : SORT_DIRECTION.ASC;
      return { ...prevState, sortBy, sortDirection };
    });
  };
  const { page, rowsPerPage } = state;

  React.useEffect(() => {
    if (store.rows.length <= 5 || !store.rows) {
      dispatch(action.setRexecuteQuery(false));
    }

    if (res.data) {
      const sortedData = sortData(
        res.data.allEmployeeDetails.nodes,
        state.sortDirection,
        state.sortBy,
        searchTerm
      );

      setCount(sortedData.length);

      dispatch(
        action.setRows(
          sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        )
      );

      setState((prevState) => {
        const endIndex = (prevState.page + 1) * prevState.rowsPerPage;
        const slicedData = sortedData.slice(
          prevState.page * prevState.rowsPerPage,
          endIndex
        );
        return { ...prevState, rows: slicedData };
      });

      dispatch(action.setRexecuteQuery(true));
    }
  }, [
    res.data,
    state.sortDirection,
    state.sortBy,
    page,
    rowsPerPage,
    searchTerm,
  ]);

  const openDialoge = () => {
    dispatch(action.setOpenDialoge(true));
    setUpdateOrAdd(true);
  };

  const editUser = (i) => {
    setUpdateOrAdd(false);
    dispatch(action.setName(store.rows[i].name));
    dispatch(action.setEmployeeId(store.rows[i].employeeCode));
    dispatch(action.setPassword(store.rows[i].password));
    dispatch(action.setRole(store.rows[i].role));
    dispatch(action.setOpenDialoge(true));
  };

  const openConfirmBar = (i) => {
    setOpen(true);
    setIndex(i);
    setUserName(store.rows[i].name);
  };

  const deleteUser = () => {
    deleteUserAPI({
      empCode: store.rows[index].employeeCode,
    }).then((res) => {
      if (res.error) {
        alert(JSON.stringify(res.error));
        return;
      }
      dispatch(action.setRexecuteQuery(false));
      rexRes({ requestPolicy: "network-only" });
      alertAndLoaders(
        "UNSHOW_ALERT",
        dispatch,
        "User deleted successfully.",
        "warning"
      );
    });
    setOpen(false);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Card>
        <Grid container spacing={1}>
          <Grid
            container
            xs={4}
            justifyContent="flex-start"
            alignItems="center"
          >
      
          </Grid>
          <Grid container xs={8} p={2}>
            <Box
              sx={{
                width: 500,
                maxWidth: "60%",
                marginLeft: "15%",
              }}
            >
              <TextField
                fullWidth
                label="Search user"
                id="fullWidth"
                style={{ marginTop: "8px" }}
                value={searchTerm}
                onChange={handleSearch}
              />
            </Box>
            <MDButton
              color="dark"
              type="submit"
              style={{ marginTop: "9px", marginLeft: "30px" }}
              onClick={openDialoge}
            >
              Add User
            </MDButton>
          </Grid>
        </Grid>
      </Card>
      <br />
      {store.rows ? (
        <TableContainer component={Paper}>
          <Table>
            <TableRow>
              <TableCell>
                <TableSortLabel onClick={() => handleSort(SORT_BY.NAME)}>
                  <MDTypography variant="h6" fontWeight="medium">
                    SLNO
                  </MDTypography>
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  onClick={() => handleSort(SORT_BY.EMPLOYEE_CODE)}
                >
                  <MDTypography variant="h6" fontWeight="medium">
                    Employee Code
                  </MDTypography>
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel onClick={() => handleSort(SORT_BY.NAME)}>
                  <MDTypography variant="h6" fontWeight="medium">
                    Name
                  </MDTypography>
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel onClick={() => handleSort(SORT_BY.ROLE)}>
                  <MDTypography variant="h6" fontWeight="medium">
                    Role
                  </MDTypography>
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <MDTypography variant="h6" fontWeight="medium">
                  Actions
                </MDTypography>
              </TableCell>
            </TableRow>
            <TableBody>
              {store.rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <MDTypography variant="h6" fontWeight="light">
                      {index + 1}
                    </MDTypography>
                  </TableCell>
                  <TableCell>
                    <MDTypography variant="h6" fontWeight="light">
                      {row.employeeCode}
                    </MDTypography>
                  </TableCell>
                  <TableCell>
                    <MDTypography variant="h6" fontWeight="light">
                      {row.name}
                    </MDTypography>
                  </TableCell>
                  <TableCell>
                    <MDTypography variant="h6" fontWeight="light">
                      {returnRole(row.role)}
                    </MDTypography>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      sx={{
                        "&:hover": {
                          background: "#f0f2f5",
                          cursor: "pointer",
                        },
                      }}
                      onClick={() => editUser(index)}
                    >
                      <Tooltip title="Edit">
                        <ModeEditOutlineSharpIcon
                          style={{ color: "#19A7CE" }}
                        />
                      </Tooltip>
                    </IconButton>
                    <IconButton
                      sx={{
                        "&:hover": {
                          background: "#f0f2f5",
                          cursor: "pointer",
                        },
                      }}
                      onClick={() => openConfirmBar(index)}
                    >
                      <Tooltip title="Delete">
                        <DeleteSharpIcon style={{ color: "#f44335" }} />
                      </Tooltip>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            style={{
              display: "grid",
              alignContent: "center",
              justifyContent: "center",
              color:"white"
            }}
            rowsPerPageOptions={[5, 10, 50, 100]}
            component="div"
            count={count}
            rowsPerPage={state.rowsPerPage}
            page={state.page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            // nextIconButtonProps={{ style:{background:"red"} }}
          />
        </TableContainer>
      ) : (
        "Loading...."
      )}

      <MDDialog
        title={updateOrAdd ? "Add user" : "Edit user"}
        updateOrAdd={updateOrAdd}
      />
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        PaperProps={{ style:{
          backgroundColor:"#202940"
        }}}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Confirm delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText
            style={{ padding: "10px" }}
            id="alert-dialog-slide-description"
          >
            Are you sure you want to delete user <b>{`${userName}`}</b> ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={deleteUser}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminTable;
