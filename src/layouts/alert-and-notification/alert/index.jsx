import React, { useState, useEffect, useCallback } from "react";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Grid from "@mui/material/Grid";
import { useQuery, useMutation, useSubscription } from "urql";
import { ALL_ALERTS } from "apis/queries";
import MDTable from "components/MDTable";
import MDHoverSearch from "components/MDHoverSearch";
import MDDialog from "components/MDDilouge";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import MDButton from "components/MDButton";
import DialogActions from "@mui/material/DialogActions";
import MDTypography from "components/MDTypography";
import { START_TIMER, UPDATE_ALERT_BY_ID, STOP_TIMER, GET_ALL_TIMERS } from "apis/queries";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import alertAndLoaders from "utils/alertAndLoaders";

const columns = [
  { Header: "DateTime", accessor: "dateTime", ignore: true },
  { Header: "Machine Name", accessor: "machineName" },
  { Header: "Machine Status", accessor: "machineStatus" },
  // { Header: "Number of snoozes", accessor: "counter" },
  { Header: "Employee Code", accessor: "empCode" },
  { Header: "Alert Status", accessor: "alertStatus" },
  { Header: "Remarks", accessor: "remarks" },
];

function Alert() {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [remark,setRemark] = useState("");
  const dispatch = useDispatch();
  const [stop,setStop] = useState(false)
  const userStore = useSelector((store) => store.userRoles);
  const [startTimerRes, startTimer] = useMutation(START_TIMER);
  const [updateAlertByIdRes, updateAlertById] = useMutation(UPDATE_ALERT_BY_ID);
  const [stopeTimerRes, stopTimer] = useMutation(STOP_TIMER);
  const [allAlert] = useSubscription({
    query: ALL_ALERTS,
  });

  const [allTimers, rexAllTimers] = useQuery({
    query: GET_ALL_TIMERS,
  });

  const [timer, setTimer] = useState(0);
  const [actionTaken, setActionTaken] = useState("");
  const [tableData, setTableData] = useState([]);

  const transformData = useCallback((data) => {
    if (!data) {
      return [];
    }

    return data.allAlerts.nodes.map((val) => ({
      dateTime: val.dateTime,
      machineName: val.testingEquipmentByEquipmentName.equipmentName,
      machineStatus: val.machineStatus === 0 ? "Stopped" : "Running",
      empCode: val.userName,
      alertStatus: val.alertStatus === 0 ? "In Active" : "Active",
      remarks: val.remarks,
      ignore: { id: val.id, actionTaken: val.actionTaken, equipmentName: val.equipmentName, timer: val.timer },
    }));
  }, []);

  useEffect(() => {
    setTableData(transformData(allAlert.data));
  }, [allAlert.data]);

  useEffect(() => {
    const interval = setInterval(() => {
      rexAllTimers({ requestPolicy: "network-only" });
    }, 1000);
    return () => clearInterval(interval);
  }, [allTimers]);

  useEffect(() => {
    if (!allTimers.fetching && !allTimers.error && allTimers.data) {
      setTimer(allTimers.data.getAllTimers);
    }

    if (timer.length > 5 && !stop) {
      JSON.parse(timer).forEach((val) => {
        if (val.timer === 0) {
          const index1 = tableData.findIndex((obj) => obj.ignore.id === Number(val.id));
          if (index1 !== -1 ) {
            updateAlertById({
              alertStatus: 1,
              machineStatus: 0,
              remarks: "again ignored",
              userName: userStore.empCode,
              id: Number(tableData[index1].ignore.id),
              actionTaken: "Ignored",
            }).then((res) => {
              if (res.data) {
                // alertAndLoaders("UNSHOW_ALERT", dispatch, "Alert started.", "info");
              }
              if (res.error) {
                console.log(res.error);
                // alertAndLoaders("UNSHOW_ALERT", dispatch, "Something went wrong.", "error");
              }
            });
          }
        }
      });
    }
  }, [allTimers, timer]);

  const takeAction = (i) => {
    setOpen(true);
    setIndex(i);
  };

  const handleOnClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleRadioChange = useCallback((event) => {
    setActionTaken(event.target.value);
  }, []);
  const save = useCallback(() => {
    if (actionTaken === "" || remark === "") {
      alert("Please provide all data");
      return;
    }

    if (actionTaken === "Ignore Error") {
      startTimer({ id: tableData[index].ignore.id }).then((res) => {
        if (res.data) {
          updateAlertById({
            alertStatus: 0,
            machineStatus: 0,
            remarks: remark,
            userName: userStore.empCode,
            id: Number(tableData[index].ignore.id),
            actionTaken,
          }).then((res) => {
            if (res.data) {
              alertAndLoaders("UNSHOW_ALERT", dispatch, "Alert started.", "info");
            }
            if (res.error) {
              console.log(res.error);
              alertAndLoaders("UNSHOW_ALERT", dispatch, "Something went wrong.", "error");
            }
          });
        }
      });
    } else if (actionTaken === "Test-Completion") {
      setStop(true)
      updateAlertById({
        alertStatus: 0,
        machineStatus: 0,
        remarks: remark,
        userName: userStore.empCode,
        id: Number(tableData[index].ignore.id),
        actionTaken,
      }).then((res) => {
        if (res.data) {
          setTimer("")
          setTimeout(()=>{
            setStop(false)
          },5000)
          alertAndLoaders("UNSHOW_ALERT", dispatch, "Sucessfully updated alerts.", "success");
          stopTimer({ id: tableData[index].ignore.id.toString() });
        }
        if (res.error) {
          console.log(res.error);
          alertAndLoaders("UNSHOW_ALERT", dispatch, "Something went wrong.", "error");
        }
      });
    } else if (actionTaken === "Error Resolved") {
      setStop(true)
      updateAlertById({
        alertStatus: 0,
        machineStatus: 1,
        remarks: remark,
        userName: userStore.empCode,
        id: Number(tableData[index].ignore.id),
        actionTaken,
      }).then((res) => {
        if (res.data) {
          alertAndLoaders("UNSHOW_ALERT", dispatch, "Sucessfully updated alerts.", "success");
          stopTimer({ id: tableData[index].ignore.id.toString() });
        }
        if (res.error) {
          console.log(res.error);
          alertAndLoaders("UNSHOW_ALERT", dispatch, "Something went wrong.", "error");
        }
      });
    }
    setActionTaken("");
    setOpen(false);
  }, [tableData, actionTaken, userStore.empCode, updateAlertById, startTimer, stopTimer]);

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
              <MDTable data={{ columns, rows: tableData }} searchTerm={searchTerm} onTouch={takeAction} />
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
              <FormControlLabel value="Test-Completion" control={<Radio />} label="Test-Completion" />
              <FormControlLabel value="Error Resolved" control={<Radio />} label="Error Resolved" />
              <FormControlLabel value="Ignore Error" control={<Radio />} label="Ignore Error" />
            </RadioGroup>
          </FormControl>
          <textarea
            rows="3"
            cols="45"
            onChange={(e)=>setRemark(e.target.value)}
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

