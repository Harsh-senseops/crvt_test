import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import reportsLineChartData from "layouts/dashboards/analytics/data/reportsLineChartData";
import { useQuery } from "urql";
import { EVERY_TEST_DEATILS } from "apis/queries";
import { useEffect } from "react";
import { useState } from "react";
// import reportsLineChartData from "layouts/dashboards/analytics/data/reportsLineChartData";

function MainDashboard() {
  const { sales, tasks } = reportsLineChartData;
  const [everyTestDetails, rexTestEveryDetails] = useQuery({
    query: EVERY_TEST_DEATILS,
  });

  const [dashBoardTestDetails,setEveryTestDetails] = useState({
    test_planned:0,
    unplanned_test:0,
    test_in_progress:0,
    test_completed:0,
  }) 

  useEffect(()=>{
    if(everyTestDetails.data?.allCrvtDashboardDetails?.nodes?.length !== 0){
      let tempObj = {}
      tempObj.test_completed =  everyTestDetails.data?.allCrvtDashboardDetails?.nodes[0].testCompleted
      tempObj.test_in_progress =  everyTestDetails.data?.allCrvtDashboardDetails?.nodes[0].testInProgress
      tempObj.test_planned =  everyTestDetails.data?.allCrvtDashboardDetails?.nodes[0].testPlanned
      tempObj.unplanned_test =  everyTestDetails.data?.allCrvtDashboardDetails?.nodes[0].unplannedTest
      setEveryTestDetails(tempObj);
    }
  },[everyTestDetails.data])

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        {/* <Grid container>
          <SalesByCountry />
        </Grid> */}
        <MDBox mt={1.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="warning"
                  icon="event_note"
                  title="Test Planned"
                  count={dashBoardTestDetails.test_planned}
                  percentage={{
                    color: "success",
                    amount: "0%",
                    label: "than lask week",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  icon="queue"
                  title="Unplanned Test"
                  count={dashBoardTestDetails.unplanned_test}
                  percentage={{
                    color: "success",
                    amount: "0%",
                    label: "than last month",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="success"
                  icon="rotate_right"
                  title="Test in-progress"
                  count={dashBoardTestDetails.test_in_progress}
                  percentage={{
                    color: "success",
                    amount: "0%",
                    label: "than yesterday",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="primary"
                  icon="fact_check"
                  title="Test completed"
                  count={dashBoardTestDetails.test_completed}
                  percentage={{
                    color: "success",
                    amount: "",
                    label: "Just updated",
                  }}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        {/* <MDBox mt={6}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="website views"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox> */}
        {/* <MDBox mt={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mt={3}>
                <BookingCard
                  image={booking1}
                  title="Cozy 5 Stars Apartment"
                  description='The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the main night life in Barcelona.'
                  price="$899/night"
                  location="Barcelona, Spain"
                  action={actionButtons}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mt={3}>
                <BookingCard
                  image={booking2}
                  title="Office Studio"
                  description='The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the night life in London, UK.'
                  price="$1.119/night"
                  location="London, UK"
                  action={actionButtons}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mt={3}>
                <BookingCard
                  image={booking3}
                  title="Beautiful Castle"
                  description='The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the main night life in Milan.'
                  price="$459/night"
                  location="Milan, Italy"
                  action={actionButtons}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox> */}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default MainDashboard;
