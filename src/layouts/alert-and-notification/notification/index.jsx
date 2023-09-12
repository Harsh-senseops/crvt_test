import Card from "@mui/material/Card";
import { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Grid from "@mui/material/Grid";
import * as React from "react";
import { ALL_NOTIFICATIONS } from "apis/queries";
import MDTable from "components/MDTable";
import { useQuery } from "urql";
import MDHoverSearch from "components/MDHoverSearch";

function fromattedTime(dateTime) {
  const dateTimeString = dateTime;
  const dateTimeObj = new Date(dateTimeString);

  const options = { hour: "numeric", minute: "numeric", second: "numeric", hour12: true };
  const time = dateTimeObj.toLocaleTimeString("en-US", options);
  return time;
}

const columns = [
  { Header: "DateTime", accessor: "datetime" },
  { Header: "Description", accessor: "description" },
  { Header: "Employee Code", accessor: "empCode" },
  { Header: "Planner/Report", accessor: "notificationFrom" },
  // { Header: "Edit", accessor: "notificationFrom" },
];
function Notification() {
  const [searchTerm, setSearchTerm] = useState("");
  const [shouldPause, setShouldPause] = useState(true);
  const [notificationsData, rexNotificationsData] = useQuery({
    query: ALL_NOTIFICATIONS,
    pause: shouldPause,
  });
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!notificationsData.data) {
      setShouldPause(false);
    }
    if (notificationsData.data) {
      setData({columns,rows:notificationsData.data.allCrvtNotifications.nodes})
      setShouldPause(true);
    }
  }, [notificationsData.data]);
  return (
    <DashboardLayout>
      <MDBox width="calc(100% - 48px)" position="absolute" top="1.75rem">
        <DashboardNavbar dark absolute />
      </MDBox>
      <MDBox pt={10} pb={3}>
        <Card style={{ background: "#4C5365" }}>
          <MDBox p={3} lineHeight={1}>
            <MDHoverSearch onInputChange={(value) => setSearchTerm(value)} />
            <Grid mt={2}>
              <MDTable data={data} searchTerm={searchTerm} />
            </Grid>
          </MDBox>
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Notification;
