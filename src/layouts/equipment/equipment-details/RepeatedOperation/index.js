import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MuiToggleButton from "@mui/material/ToggleButton";
import clsx from "clsx";
import { makeStyles } from "@mui/styles";
import MDBox from "components/MDBox";
import { CardActions, TextField } from "@mui/material";
import { useSubscription, useMutation, useQuery } from "urql";

import Grid from "@mui/material/Grid";

import { useSelector, useDispatch } from "react-redux";
import {
  ADD_EQUIPMENT_UPDATE_HISTORY,
  UPDATE_RO_ERD,
  REPEATED_OPERATION_TEST_DETAILS,
  ADD_REPEATED_OPERATION_STATUS,
  SAVE_REPEATED_OPERATION_DETAILS,
} from "apis/queries";
import alertAndLoaders from "utils/alertAndLoaders";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    margin: "1%",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  disabledTextField: {
    color: "gray",
    "& .MuiFormLabel-root": {
      color: "gray", // or black
    },

    // "& .MuiOutlinedInput-root": {
    //   "& fieldset": {
    //     borderColor: "yellow"
    //   }
    // },

    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "gray",
    },
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 174,
  },
  formControltest: {
    // margin: theme.spacing(1),
    minWidth: 174,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  parentFlexRight: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "2%",
    marginRight: "3%",
  },
}));

export default function RepeatedOperation({ details, componentName, id }) {
  const [expanded, setExpanded] = React.useState(false);
  const [selected, setSelected] = useState(false);
  const [toggleEnable, setToggleEnable] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [cycleTime, setCycleTime] = useState({ oldData: "", newData: "" });
  const [simultaneously, setSimultaneously] = useState({ oldData: "", newData: "" });
  const [testDurationMin, setTestDurationMin] = useState({ oldData: "", newData: "" });
  const [testDurationMax, setTestDurationMax] = useState({ oldData: "", newData: "" });
  const [oldData, setOldData] = useState("");
  const [totalCycle, setTotalCycle] = useState({ oldData: "", newData: "" });
  const [equipmentRunning, setEquipmentRunning] = useState({ oldData: "", newData: "" });
  const [sampleQty, setSampleQty] = useState({ oldData: "", newData: "" });
  const classes = useStyles();
  const role = useSelector((store) => {
    return store.userRoles;
  });
  const dispatch = useDispatch();

  const [saveRepeatedOperationDetailsRes, saveRepeatedOperationDetails] = useMutation(
    SAVE_REPEATED_OPERATION_DETAILS
  );
  const [repeatedOperationdeailsByID, rexDustDetailByID] = useSubscription({
    query: REPEATED_OPERATION_TEST_DETAILS,
    variables: { partName: id },
  });
  const [repeatedOperationStatusRes, saveRepeatedOperationStatus] = useMutation(
    ADD_REPEATED_OPERATION_STATUS
  );
  const [equipmentHistoryRes, saveEquipmentHistory] = useMutation(ADD_EQUIPMENT_UPDATE_HISTORY);
  const [updateROErdRes, updateROErd] = useMutation(UPDATE_RO_ERD);

  useEffect(() => {
    details.map((val) => {
      let data = "";
      if (val.partName == componentName) {
        setToggleEnable(true);
        if (val.crvtRepeatedOperationTestDetailsByPartName.nodes.length !== 0) {
          data = JSON.parse(val.crvtRepeatedOperationTestDetailsByPartName.nodes[0].testDetails);
        }
        setCycleTime({ newData: data.cycle_time, oldData: data.cycle_time });
        setTestDurationMax({
          newData: data.test_duration_hr.max,
          oldData: data.test_duration_hr.max,
        });
        setTestDurationMin({
          newData: data.test_duration_hr.min,
          oldData: data.test_duration_hr.min,
        });

        setTotalCycle({ newData: data.total_cycle, oldData: data.total_cycle });
        setSimultaneously({ newData: data.simultaneously, oldData: data.simultaneously });
        setEquipmentRunning({ newData: data.equipment_running, oldData: data.equipment_running });
        setSampleQty({ newData: data.sample_qty, oldData: data.sample_qty });

        if (JSON.parse(val.crvtRepeatedOperationTestDetailsByPartName.nodes[0].status) === 1) {
          setToggleEnable(true);
          setEnabled(true);
        } else {
          setToggleEnable(false);
          setEnabled(false);
        }
      }
    });
    if (repeatedOperationdeailsByID.data) {
      let constValues = JSON.parse(
        repeatedOperationdeailsByID.data.crvtRepeatedOperationTestDetailByPartName.testDetails,
        "datadetails"
      );
      setOldData({ eName: constValues.name, running: constValues["7daysrunning"] });

      setTotalCycle({ newData: constValues.total_cycle, oldData: constValues.total_cycle });
      setCycleTime({ newData: constValues.cycle_time, oldData: constValues.cycle_time });
      setTestDurationMin({
        newData: constValues.test_duration_hr.min,
        oldData: constValues.test_duration_hr.min,
      });
      setTestDurationMax({
        newData: constValues.test_duration_hr.max,
        oldData: constValues.test_duration_hr.max,
      });
      setEquipmentRunning({
        newData: constValues.equipment_running,
        oldData: constValues.equipment_running,
      });
      setSimultaneously({
        newData: constValues.simultaneously,
        oldData: constValues.simultaneously,
      });
      setSampleQty({ newData: constValues.sample_qty, oldData: constValues.sample_qty });
    }
   
    if (repeatedOperationdeailsByID.data) {
      let data = repeatedOperationdeailsByID.data.crvtRepeatedOperationTestDetailByPartName.status;
      setToggleEnable(data === 1 ? true : false);
      setEnabled(data === 1 ? true : false);
    }
  }, [details, repeatedOperationdeailsByID.data]);

  const saveData = () => {
    let data = JSON.stringify({
      name: oldData.eName,
      cycle_time: parseInt(cycleTime.newData),
      total_cycle: parseInt(totalCycle.newData),
      equipment_running: parseInt(equipmentRunning.newData),
      simultaneously: parseInt(simultaneously.newData),
      test_duration_hr: {
        min: parseInt(testDurationMin.newData),
        max: parseInt(testDurationMax.newData),
      },
      "7daysrunning": oldData.running,
      sample_qty: parseInt(sampleQty.newData),
    });

    saveRepeatedOperationDetails({
      testDetails: data,
      partName: id,
    }).then((res) => {
      if (res.data) {
        let obj = {
          "Cycle Time": cycleTime,
          "Total Cycle": totalCycle,
          "Equipment Running (hr)": equipmentRunning,
          Simultaneously: simultaneously,
          "Test Duration (hr min)": testDurationMin,
          "Test Duration (hr max)": testDurationMax,
          "Sample Quantity": sampleQty,
        };
        saveEquipmentHistory({
          componentId: id,
          employeeCode: role.empCode,
          testType: "Repeated Operation Test",
          updateValues: handleCompare(obj),
        }).then((res) => {
          if (res.data) {
            updateROErd({
              partId: id,
              repeatedOperationErt: JSON.stringify({
                simultaniously: parseInt(simultaneously.newData),
                days: parseInt(testDurationMin.newData) / parseInt(equipmentRunning.newData),
                "7daysrunning": oldData.running,
                sample_qty: parseInt(sampleQty.newData),
              }),
            }).then((res) => {
              if (res.error) {
                console.error(res.error);
              }
              if (res.data) {
                alertAndLoaders(
                  "UNSHOW_ALERT",
                  dispatch,
                  "Repeated Operation Test Details Are Saved... ",
                  "success"
                );
              }
            });
          }
        });
      }
    });
  };

  const handleCompare = (obj) => {
    let newObj = {};
    for (let key in obj) {
      if (obj[key].newData !== obj[key].oldData) {
        newObj[key] = obj[key].newData;
      }
    }
    return JSON.stringify(newObj);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  const toggleTrue = () => {
    saveRepeatedOperationStatus({
      partName: id,
      status: !toggleEnable ? 1 : 0,
    }).then((res) => {
      toggleEnable
        ? alertAndLoaders(
            "UNSHOW_ALERT",
            dispatch,
            "Repeated Operation Test Is Disabled...",
            "warning"
          )
        : alertAndLoaders(
            "UNSHOW_ALERT",
            dispatch,
            "Repeated Operation Test Is Enabled... ",
            "success"
          );
    });
  };
  return (
    <>
      <Card style={{ marginTop: "2%" }}>
        <CardHeader
          onClick={() => setExpanded(!expanded)}
          sx={{
            transition: "all 250ms",
            ":hover": {
              boxShadow: 20,
              cursor: "pointer",
              backgroundColor: "#384158 !important",
              borderRadius: "10px",
              transform: "scale(1.02)",
            },
          }}
          action={
            <div>
              {role.roles === 3 && (
                <MuiToggleButton
                  style={{
                    height: "30px",
                    border: "none",
                    background: toggleEnable ? "green" : "red",
                  }}
                  value="check"
                  selected={!selected}
                  selectedcolor="#BCE2BE"
                  onChange={toggleTrue}
                >
                  <p style={{ fontSize: "0.75rem", color: "white", fontWeight: "bold" }}>
                    {toggleEnable ? "Enabled" : "Disabled"}
                  </p>
                </MuiToggleButton>
              )}
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                // onClick={() => setExpanded(!expanded)}
                aria-expanded={expanded}
                aria-label="show more"
                color="info"
              >
                <ExpandMoreIcon />
              </IconButton>
            </div>
          }
          title={
            <MDTypography variant="h6" fontWeight="medium">
              Repeated Operation
            </MDTypography>
          }
          subheader={
            toggleEnable ? (
              <MDTypography style={{ color: "lime", fontSize: "14px", paddingTop: "1%" }}>
                {" "}
                Repeated Operation is Enabled
              </MDTypography>
            ) : (
              <MDTypography style={{ color: "red", fontSize: "14px", paddingTop: "1%" }}>
                No Repeated Operation Test
              </MDTypography>
            )
          }
          // subheader={subheaderdata}
        />

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <form onSubmit={(e) => handleFormSubmit(e)}>
            <CardContent>
              <MDBox pr={1}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      onChange={(e) =>
                        setCycleTime((prevData) => ({
                          ...prevData,
                          newData: e.target.value,
                        }))
                      }
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled": {
                          WebkitTextFillColor: "gray",
                        },
                      }}
                      // disabled={role.roles === 1 || role.roles === 2 || !enabled}
                      className={toggleEnable ? "" : classes.disabledTextField}
                      value={cycleTime.newData}
                      label="Cycle Time"
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      onChange={(e) =>
                        setTotalCycle((prevData) => ({
                          ...prevData,
                          newData: e.target.value,
                        }))
                      }
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled": {
                          WebkitTextFillColor: "gray",
                        },
                      }}
                      // disabled={role.roles === 1 || role.roles === 2 || !enabled}
                      className={toggleEnable ? "" : classes.disabledTextField}
                      value={totalCycle.newData}
                      label="Total Cycle"
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      onChange={(e) =>
                        setTestDurationMax((prevData) => ({
                          ...prevData,
                          newData: e.target.value,
                        }))
                      }
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled": {
                          WebkitTextFillColor: "gray",
                        },
                      }}
                      // disabled={role.roles === 1 || role.roles === 2 || !enabled}
                      className={toggleEnable ? "" : classes.disabledTextField}
                      value={testDurationMax.newData}
                      label="Test Duration(hr max)"
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      onChange={(e) =>
                        setTestDurationMin((prevData) => ({
                          ...prevData,
                          newData: e.target.value,
                        }))
                      }
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled": {
                          WebkitTextFillColor: "gray",
                        },
                      }}
                      // disabled={role.roles === 1 || role.roles === 2 || !enabled}
                      className={toggleEnable ? "" : classes.disabledTextField}
                      value={testDurationMin.newData}
                      label="Test Duration(hr min)"
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      onChange={(e) =>
                        setEquipmentRunning((prevData) => ({
                          ...prevData,
                          newData: e.target.value,
                        }))
                      }
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled": {
                          WebkitTextFillColor: "gray",
                        },
                      }}
                      // disabled={role.roles === 1 || role.roles === 2 || !enabled}
                      className={toggleEnable ? "" : classes.disabledTextField}
                      value={equipmentRunning.newData}
                      label="Equipment Running (hr)"
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      onChange={(e) =>
                        setSimultaneously((prevData) => ({
                          ...prevData,
                          newData: e.target.value,
                        }))
                      }
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled": {
                          WebkitTextFillColor: "gray",
                        },
                      }}
                      // disabled={role.roles === 1 || role.roles === 2 || !enabled}
                      className={toggleEnable ? "" : classes.disabledTextField}
                      value={simultaneously.newData}
                      label="Simultaneously"
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      onChange={(e) =>
                        setSampleQty((prevData) => ({
                          ...prevData,
                          newData: e.target.value,
                        }))
                      }
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled": {
                          WebkitTextFillColor: "gray",
                        },
                      }}
                      // disabled={role.roles === 1 || role.roles === 2 || !enabled}
                      className={toggleEnable ? "" : classes.disabledTextField}
                      value={sampleQty.newData}
                      label="Sample Quantity"
                    />
                  </Grid>
                </Grid>
              </MDBox>
            </CardContent>
            <CardActions className={classes.parentFlexRight}>
              {role.roles === 3 ? (
                <MDButton color="dark" type="submit" onClick={saveData} disabled={!enabled}>
                  Save
                </MDButton>
              ) : null}
            </CardActions>
          </form>
        </Collapse>
      </Card>
    </>
  );
}
