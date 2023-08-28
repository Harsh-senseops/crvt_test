import React, { useState, useEffect, useCallback } from "react";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Grid from "@mui/material/Grid";
import { useQuery } from "urql";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
import { ALL_ALERTS } from "apis/queries";
import MDTable from "components/MDTable";
import MDHoverSearch from "components/MDHoverSearch";

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
  { Header: "Number of snoozes", accessor: "counter" },
  { Header: "Employee Code", accessor: "empCode" },
  // { Header: "Edit", accessor: "notificationFrom" },
];
function Alert() {
  const [searchTerm, setSearchTerm] = useState("");
  const [shouldPause, setShouldPause] = useState(true);
  const [showTimer] = useQuery({
    query: `query showTimer{
      showTimer(machineName:"Dust")
    }`,
    variables: { machineName: "Dust" },
  });

  const [allAlert, rexAllAlerts] = useQuery({
    query: ALL_ALERTS,
    pause: shouldPause,
  });

  const [timer, setTimer] = useState(0);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (!allAlert.data) {
      setShouldPause(false);
    }
    if (allAlert.data) {
      setShouldPause(true);
      setTableData([])
      allAlert.data.allAlerts.nodes.map((val) => {
        setTableData((prev) => [
          ...prev,
          {
            dateTime: val.dateTime,
            machineName: val.testingEquipmentByEquipmentName.equipmentName,
            machineStatus:val.machineStatus === 0 ? "Stopped" : "Running",
            counter:val.counter,
            empCode:val.userName,
          },
        ]);
      });
      console.log(tableData);
    }
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

    return () => {
      clearInterval(timeInterval);
    };
  }, [showTimer.data]);

  const takeAction = (i) => {
    alert(i)
  }

  return (
    <DashboardLayout>
      <MDBox width="calc(100% - 48px)" position="absolute" top="1.75rem">
        <DashboardNavbar dark absolute />
      </MDBox>
      <MDBox pt={10} pb={3}>
        <Card style={{ background: "#4c5365" }}>
          <MDBox p={3} lineHeight={1}>
            <MDHoverSearch onInputChange={(value) => setSearchTerm(value)} />
            {/* <MDTypography variant="h5" fontWeight="medium">
              Alert
            </MDTypography> */}
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

