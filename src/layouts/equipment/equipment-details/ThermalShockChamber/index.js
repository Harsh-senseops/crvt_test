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
  THERMAL_SHOCK_TEST_DETAILS,
  UPDATE_THERMAL_SHOCK_ERD,
  ADD_THERMAL_SHOCK_STATUS,
  SAVE_THERMAL_SHOCK_DETAILS,
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

export default function ThermalShockChamber({ details, componentName, id }) {
  const [expanded, setExpanded] = React.useState(false);
  const [selected, setSelected] = useState(false);
  const [toggleEnable, setToggleEnable] = useState(false);
  const [equipmentRunning, setEquipmentRunning] = useState("");
  const [enabled, setEnabled] = useState(true);
  const [cold, setCold] = useState([]);
  const [hot, setHot] = useState([]);
  const [testDurationMax, setTestDurationMax] = useState([]);
  const [testDurationMin, setTestDurationMin] = useState([]);
  const [cycleTime, setCycleTime] = useState([""]);
  const [totalCycle, setTotalCycle] = useState([""]);
  const [simultaneously, setSimultaneously] = useState([]);
  const [sampleQty, setSampleQty] = useState([]);
  const [oldData, setOldData] = useState("");
  const classes = useStyles();
  const role = useSelector((store) => {
    return store.userRoles;
  });

  const dispatch = useDispatch();

  const [saveThermalDetailsRes, saveThermalDetailDetails] = useMutation(
    SAVE_THERMAL_SHOCK_DETAILS
  );
  const [thermalShockdetailByID, rexThermalShockDetailByID] = useSubscription({
    query: THERMAL_SHOCK_TEST_DETAILS,
    variables: { partName: id },
  });

  const [thermalShockStatusRes, saveThermalShockStatus] = useMutation(
    ADD_THERMAL_SHOCK_STATUS
  );
  const [equipmentHistoryRes, saveEquipmentHistory] = useMutation(
    ADD_EQUIPMENT_UPDATE_HISTORY
  );
  const [updateThermalShockRes, updateThermalShock] = useMutation(
    UPDATE_THERMAL_SHOCK_ERD
  );

  useEffect(() => {
    if (thermalShockdetailByID.data) {
      let constValues = JSON.parse(
        thermalShockdetailByID.data.crvtThermalShockChamberTestDetailByPartName
          .testDetails,
        "datadetails"
      );
      setOldData({
        eName: constValues.name,
        running: constValues["7daysrunning"],
      });

      setCold({ newData: constValues.cold, oldDat: constValues.cold });
      setHot({ newData: constValues.hot, oldDat: constValues.hot });
      setCycleTime({
        newData: constValues.cycle_time_sec,
        oldDat: constValues.cycle_time_sec,
      });
      setTotalCycle({
        newData: constValues.total_cycle,
        oldDat: constValues.total_cycle,
      });
      setTestDurationMin({
        newData: constValues.test_duration_hr.min,
        oldDat: constValues.test_duration_hr.min,
      });
      setTestDurationMax({
        newData: constValues.test_duration_hr.max,
        oldDat: constValues.test_duration_hr.max,
      });
      setEquipmentRunning({
        newData: constValues.equipment_running,
        oldDat: constValues.equipment_running,
      });
      setSimultaneously({
        newData: constValues.simultaneously,
        oldDat: constValues.simultaneously,
      });
      setSampleQty({
        newData: constValues.sample_qty,
        oldDat: constValues.sample_qty,
      });
    }
    details.map((val) => {
      let data = "";
      if (val.partName == componentName) {
        setToggleEnable(true);
        if (
          val.crvtThermalShockChamberTestDetailsByPartName.nodes.length !== 0
        ) {
          data = JSON.parse(
            val.crvtThermalShockChamberTestDetailsByPartName.nodes[0]
              .testDetails
          );
        }
        setCold({ newData: data.cold, oldDat: data.cold });
        setHot({ newData: data.hot, oldDat: data.hot });
        setCycleTime({
          newData: data.cycle_time_sec,
          oldDat: data.cycle_time_sec,
        });
        setTotalCycle({ newData: data.total_cycle, oldDat: data.total_cycle });
        setTestDurationMin({
          newData: data.test_duration_hr.min,
          oldDat: data.test_duration_hr.min,
        });
        setTestDurationMax({
          newData: data.test_duration_hr.max,
          oldDat: data.test_duration_hr.max,
        });
        setEquipmentRunning({
          newData: data.equipment_running,
          oldDat: data.equipment_running,
        });
        setSimultaneously({
          newData: data.simultaneously,
          oldDat: data.simultaneously,
        });
        setSampleQty({ newData: data.sample_qty, oldDat: data.sample_qty });

        if (
          JSON.parse(
            val.crvtThermalShockChamberTestDetailsByPartName.nodes[0].status
          ) === 1
        ) {
          setToggleEnable(true);
          setEnabled(true);
        } else {
          setToggleEnable(false);
          setEnabled(false);
        }
      }
    });
    if (thermalShockdetailByID.data) {
      let data =
        thermalShockdetailByID.data.crvtThermalShockChamberTestDetailByPartName
          .status;
      setToggleEnable(data === 1 ? true : false);
      setEnabled(data === 1 ? true : false);
    }
  }, [details, thermalShockdetailByID.data]);

  const saveData = () => {
    let data = JSON.stringify({
      name: oldData.eName,
      cold: parseInt(cold.newData),
      hot: parseInt(hot.newData),
      cycle_time_sec: parseInt(cycleTime.newData),
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

    saveThermalDetailDetails({
      testDetails: data,
      partName: id,
    }).then((res) => {
      if (res.data) {
        let obj = {
          "Cold (℃)": cold,
          "Hot (℃)": hot,
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
          testType: "Thermal Shock",
          updateValues: handleCompare(obj),
        }).then((res) => {
          if (res.data) {
            updateThermalShock({
              partId: id,
              dustErt: JSON.stringify({
                simultaniously: parseInt(simultaneously.newData),
                days:
                  parseInt(testDurationMax.newData) /
                  parseInt(equipmentRunning.newData),
                "7daysrunning": oldData.running,
                sample_qty: parseInt(sampleQty.newData),
              }),
            }).then((res) => {
              if (res.error) {
                console.log(res.error);
              }
              if (res.data) {
                alertAndLoaders(
                  "UNSHOW_ALERT",
                  dispatch,
                  "Thermal Shock Test Details Are Saved... ",
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
    saveThermalShockStatus({
      partName: id,
      status: !toggleEnable ? 1 : 0,
    }).then((res) => {
      toggleEnable
        ? alertAndLoaders(
            "UNSHOW_ALERT",
            dispatch,
            "Thermal Shock Test Is Disabled... ",
            "warning"
          )
        : alertAndLoaders(
            "UNSHOW_ALERT",
            dispatch,
            "Themal Shock Test Is Enabled... ",
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
                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
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
              Thermal Shock Test
            </MDTypography>
          }
          subheader={
            toggleEnable ? (
              <MDTypography
                style={{ color: "lime", fontSize: "14px", paddingTop: "1%" }}
              >
                Thermal Shock Test is Enabled
              </MDTypography>
            ) : (
              <MDTypography
                style={{ color: "red", fontSize: "14px", paddingTop: "1%" }}
              >
                No Thermal Shock Test
              </MDTypography>
            )
          }
        />
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <form onSubmit={(e) => handleFormSubmit(e)}>
            <CardContent>
              <MDBox pr={1}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      onChange={(e) =>
                        setCold((prevData) => ({
                          ...prevData,
                          newData: e.target.value,
                        }))
                      }
                      // disabled={role.roles === 1 || role.roles === 2 || !enabled}
                      className={toggleEnable ? "" : classes.disabledTextField}
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled": {
                          WebkitTextFillColor: "gray",
                        },
                      }}
                      value={cold.newData}
                      label="Cold (℃)"
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      onChange={(e) =>
                        setHot((prevData) => ({
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
                      value={hot.newData}
                      label="Hot (℃)"
                    />
                  </Grid>
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
                      label="Test Duration (hr max)"
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
                      label="Test Duration (hr min)"
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
                </Grid>
              </MDBox>
            </CardContent>
            <CardActions className={classes.parentFlexRight}>
              {role.roles === 3 ? (
                <MDButton
                  color="dark"
                  type="submit"
                  onClick={saveData}
                  disabled={!enabled}
                >
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
