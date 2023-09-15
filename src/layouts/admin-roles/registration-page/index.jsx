import { useDispatch, useSelector } from "react-redux";
import * as action from "../../../reduxSlices/userManagement";
import * as alertActions from "../../../reduxSlices/alert";
import alertAndLoaders from "utils/alertAndLoaders";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import MDAwsomeButton from "components/MDAwsomeButton";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment } from "@mui/material";
import { ADD_USER, UPDATE_USER } from "apis/queries";
import { useMutation } from "urql";

export default function MDDialog({ updateOrAdd, title }) {
  const [passIcon, setPassIcon] = React.useState(false);
  const store = useSelector((store) => {
    return store.um;
  });
  const dispatch = useDispatch();
  const [addUserRes, addUser] = useMutation(ADD_USER);
  const [updateUserRes, updateUser] = useMutation(UPDATE_USER);
  const [employeeCode,setEmployeeCode] = useState(store.employeeID)
useEffect(()=>{
  setEmployeeCode(store.employeeID)
},[store.employeeID])
  const handleClickOpenAdd = (_, event) => {
    if (event === "backdropClick") {
      dispatch(action.setOpenDialoge(false));
      return;
    }
    if (updateOrAdd === true) {
      if (
        store.employeeID === "" ||
        store.name === "" ||
        store.password === "" ||
        store.role === ""
      ) {
        alertAndLoaders(
          "UNSHOW_ALERT",
          dispatch,
          "Fields cannot be empty",
          "warning"
        );
        return;
      }
      addUser({
        eCode: store.employeeID,
        name: store.name,
        pass: store.password,
        role: store.role,
      }).then((res) => {
        if (
          res.error?.message.includes(
            "duplicate key value violates unique constraint"
          )
        ) {
          alertAndLoaders(
            "UNSHOW_ALERT",
            dispatch,
            "Employee with same employee ID already exists.",
            "error"
          );
          return;
        } else if (res.data) {
          alertAndLoaders(
            "UNSHOW_ALERT",
            dispatch,
            "User created successfully.",
            "success"
          );
        }
      });
      handleClickClose();
      // dispatch(action.setOpenDialoge(false));
      // dispatch(action.setEmployeeId(""));
      // dispatch(action.setName(""));
      // dispatch(action.setPassword(""));
      // dispatch(action.setRole(""));
      dispatch(action.setRexecuteQuery(false));
      return;
    } else if (updateOrAdd === false) {
      updateUser({
        empCode: store.employeeID,
        name: store.name,
        password: store.password,
        role: store.role,
        employeeCode:store.employeeID,
      }).then((res) => {
        if (
          res.error?.message.includes(
            "duplicate key value violates unique constraint"
          )
        ) {
          alertAndLoaders(
            "UNSHOW_ALERT",
            dispatch,
            "Employee with same employee ID already exists.",
            "error"
          );
          return;
        } else if (res.data) {
          alertAndLoaders(
            "UNSHOW_ALERT",
            dispatch,
            "User updated successfully.",
            "success"
          );
        }
        handleClickClose();
        dispatch(action.setRexecuteQuery(false));
      });
    }
  };

  const handleClickClose = () => {
    dispatch(action.setOpenDialoge(false));
    dispatch(action.setEmployeeId(""));
    dispatch(action.setName(""));
    dispatch(action.setPassword(""));
    dispatch(action.setRole(""));
  };
  return (
    <Dialog
      PaperProps={{
        style: {
          backgroundColor: "#202940",
        },
      }}
      fullWidth="true"
      maxWidth="sm"
      open={store.openDialoge}
      onClose={handleClickOpenAdd}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{title}</DialogContentText>
        <TextField
          onChange={(e) => dispatch(action.setName(e.target.value))}
          autoFocus
          value={store.name}
          margin="dense"
          id="name"
          label="User Name"
          type="text"
          fullWidth
          variant="outlined"
        />
        {/* <TextField
          onChange={(e) => setEmployeeCode(e.target.value)}
          // onBlur={(e)=>setEmployeeCode(e.target.value)}
          value={employeeCode}
          margin="dense"
          id="name"
          label="Employee ID"
          type="text"
          fullWidth
          variant="outlined"
        /> */}
        <FormControl fullWidth style={{ marginTop: "10px" }}>
          <InputLabel id="demo-simple-select-label" style={{ height: "20px" }}>
            Role
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            style={{ height: "45px", fontWeight: "400", fontSize: "13px" }}
            value={store.role}
            label="Role"
            onChange={(e) => dispatch(action.setRole(e.target.value))}
          >
            <MenuItem value={2}>Operator</MenuItem>
            <MenuItem value={1}>Admin</MenuItem>
            <MenuItem value={3}>Super user</MenuItem>
          </Select>
        </FormControl>
        <TextField
          style={{ marginTop: "13px" }}
          onChange={(e) => dispatch(action.setPassword(e.target.value))}
          value={store.password}
          margin="dense"
          id="name"
          label="Password"
          type={passIcon ? "text" : "password"}
          fullWidth
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password"
                  edge="end"
                  onClick={() => setPassIcon(!passIcon)}
                  color="white"
                >
                  {passIcon ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </DialogContent>
      <DialogActions>
        <MDAwsomeButton onPress={handleClickOpenAdd} name="Add" />
        <MDAwsomeButton onPress={handleClickClose} name="Cancel" />
      </DialogActions>
    </Dialog>
  );
}
