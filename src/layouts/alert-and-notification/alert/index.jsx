import React, { useState, useEffect, useCallback } from "react";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Grid from "@mui/material/Grid";
import { useMutation, useQuery, useSubscription } from "urql";
import MDDialog from "components/MDDilouge";
import { ALL_ALERTS, START_TIMER, STOP_TIMER, GET_ALL_TIMERS,UPDATE_ALERT_BY_ID,UPDATE_ALERT_STATUS_BY_ID } from "apis/queries";
import MDTable from "components/MDTable";
import MDHoverSearch from "components/MDHoverSearch";
import { FormControl, FormControlLabel, Radio, DialogActions } from "@mui/material";
import { RadioGroup } from "@mui/material";
import MDButton from "components/MDButton";
import {useSelector,useDispatch} from "react-redux"
import * as alerts from "../../../reduxSlices/machineAlerts"
import alertAndLoaders from "utils/alertAndLoaders";
//Constant popuo radio button values

const ERROR_RESOLVED = "Error Resolved";
const TEST_COMPLITION = "Test-Completion";
const IGNORE_ERROR = "Ignore Error";

function fromattedTime(dateTime) {
  const dateTimeString = dateTime;
  const dateTimeObj = new Date(dateTimeString);

  const options = { hour: "numeric", minute: "numeric", second: "numeric", hour12: true };
  const time = dateTimeObj.toLocaleTimeString("en-US", options);
  return time;
}

const columns = [
  { Header: "DateTime", accessor: "dateTime" },
  { Header: "Machine Name", accessor: "machineName" },
  { Header: "Machine Status", accessor: "machineStatus" },
  { Header: "Action Taken", accessor: "actionTaken" },
  { Header: "Employee Code", accessor: "empCode" },
];
function Alert() {
  const [searchTerm, setSearchTerm] = useState("");
  const [shouldPause, setShouldPause] = useState(true);
  const [open, setOpen] = useState(false);
  const [remark, setRemark] = useState(null);
  const [allAlert, rexAllAlerts] = useSubscription({
    query: ALL_ALERTS,
  });
  const userStore = useSelector((store)=>{
    return store.userRoles
  })
  const [allTimers, rexAllTimers] = useQuery({
    query: GET_ALL_TIMERS,
    pause: true,
  });
  const dispatch = useDispatch();
  const [machineId, setMachineId] = useState(0);
  const [resStartTimer, startTimer] = useMutation(START_TIMER);
  const [resUpdateResultsById,updateResultsById] = useMutation(UPDATE_ALERT_BY_ID);
  const [resUpdateAlertStatusById,updateAlertStatusById] = useMutation(UPDATE_ALERT_STATUS_BY_ID );
  const [resStopTimer,stopTimer] = useMutation(STOP_TIMER) 
  const [actionTakenValue, setActionTakenValue] = useState("");
  const [timer, setTimer] = useState(0);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (!allAlert.data) {
      setShouldPause(false);
    }
    if (allAlert.data) {
      setShouldPause(true);
      setTableData([]);
      allAlert.data.allAlerts.nodes.map((val) => {
        if(val.alertStatus){
          dispatch(alerts.setAlerts(val.testingEquipmentByEquipmentName.equipmentName + "Stopped Running"))
          dispatch(alerts.setCounter(+1))
        }
        setTableData((prev) => [
          ...prev,
          {
            dateTime: val.dateTime,
            machineName: val.testingEquipmentByEquipmentName.equipmentName,
            machineStatus: val.machineStatus === 0 ? "Stopped" : "Running",
            actionTaken: val.actionTaken,
            empCode: val.userName,
            ignore: { alertStatus: val.alertStatus, machineId: val.equipmentName, id: val.id },
          },
        ]);
      });
    }
  }, [allAlert.data]);

  useEffect(() => {
    let timerArray = {}
    if (allTimers.data) {
      console.log(JSON.parse(allTimers.data.getAllTimers))
      JSON.parse(allTimers.data.getAllTimers).map((val)=>{
        if(val.timer === 0){
          updateAlertStatusById({
            alertStatus:1,
            id:Number(val.id)
          })
          stopTimer({
            machineId:Number(val.id)
          })
        }
        console.log(val.id);
        timerArray[val.id] = {};
        timerArray[val.id].timer = val.timer
        timerArray[val.id].interval = setInterval(() => {
          timerArray[val.id].timer++
          if(timerArray[val.id].timer === 30){
            clearInterval(timerArray[val.id].interval)
            updateAlertStatusById({
              alertStatus:1,
              id:Number(val.id)
            })
          }
          console.log(timerArray[val.id].timer,val.id)
        }, 1000);
      })
    }
    return () => {
      // for(key in timerArray){
      //   clearInterval(timerArray[key])
      // }
    }
  }, [allTimers.data]);

  const takeAction = (i) => {
    setOpen(true);
    setMachineId({ machineId: tableData[i].ignore.machineId, tableId: tableData[i].ignore.id });
  };
  const handleOnClose = () => {
    setOpen(!open);
  };

  const handleRadioChange = (e) => {
    setActionTakenValue(e.target.value);
  };

  const save = () => {
    if (!remark) {
      alert("Please add remark");
      setRemark(null);
      return;
    }
    if (actionTakenValue === ERROR_RESOLVED) {
      updateResultsById({
        alertStatus:0,
        machineStatus:1,
        remarks:remark,
        userName:userStore.empCode,
        actionTaken:actionTakenValue,
        id:Number(machineId.tableId)
      }).then((res)=>{
        console.log(res)
        if(res.data){
          alertAndLoaders("UNSHOW_ALERT", dispatch, `Successfully updated`, "success");
        }
      })
      setOpen((prev)=>!prev)
      setRemark(null);
      return;
    }
    if (actionTakenValue === TEST_COMPLITION) {
      updateResultsById({
        alertStatus:0,
        machineStatus:0,
        remarks:remark,
        userName:userStore.empCode,
        actionTaken:actionTakenValue,
        id:Number(machineId.tableId)
      }).then((res)=>{
        console.log(res)
        if(res.data){
          alertAndLoaders("UNSHOW_ALERT", dispatch, `Successfully updated`, "success");
        }
      })
      setRemark(null);
      setOpen((prev)=>!prev)
      return;
    }
    if (actionTakenValue === IGNORE_ERROR) {
      startTimer({
        machineId: machineId.tableId,
      }).then((res) => {
        if (res.data) {
          updateResultsById({
            alertStatus:0,
            machineStatus:0,
            remarks:remark,
            userName:userStore.empCode,
            actionTaken:actionTakenValue,
            id:Number(machineId.tableId)
          }).then((res)=>{
            console.log(res)
            if(res.data){
              alertAndLoaders("UNSHOW_ALERT", dispatch, `Successfully updated`, "success");
            }
          })
        }
      });
      rexAllTimers({ requestPolicy: "network-only" });
      setRemark(null);
      setOpen((prev)=>!prev)
      return;
    }
    alert("Please select an option");
    rexAllTimers({ requestPolicy: "network-only" });
    setRemark(null);
    return;
  };

  return (
    <DashboardLayout>
      <MDBox width="calc(100% - 48px)" position="absolute" top="1.75rem">
        <DashboardNavbar dark absolute />
      </MDBox>
      <MDBox pt={10} pb={3}>
        <Card style={{ background: "#4c5365" }}>
          <MDBox p={3} lineHeight={1}>
            <MDHoverSearch onInputChange={(value) => setSearchTerm(value)} />
            <Grid mt={2}>
              <MDTable
                data={{ columns, rows: tableData }}
                searchTerm={searchTerm}
                onTouch={takeAction}
              />
            </Grid>
          </MDBox>
        </Card>
        <MDDialog open={open} onClose={handleOnClose}>
          <FormControl>
            <MDTypography>Actions</MDTypography>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              onChange={handleRadioChange}
            >
              <FormControlLabel
                value="Test-Completion"
                control={<Radio />}
                label="Test-Completion"
              />
              <FormControlLabel value="Error Resolved" control={<Radio />} label="Error Resolved" />
              <FormControlLabel value="Ignore Error" control={<Radio />} label="Ignore Error" />
            </RadioGroup>
          </FormControl>
          <textarea
            rows="3"
            cols="45"
            onBlur={(e) => setRemark(e.target.value)}
            placeholder="Remark"
            style={{ resize: "none", borderRadius: "4px", padding: "1em", marginTop: "10px" }}
          />
          <DialogActions>
            <MDButton color="error" onClick={() => setOpen(false)}>
              Close
            </MDButton>{" "}
            <MDButton color="error" onClick={save}>
              Save
            </MDButton>
          </DialogActions>
        </MDDialog>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Alert;
