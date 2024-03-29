// @mui material components
import Card from "@mui/material/Card";

// react imports
import { useState,useEffect  } from "react";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Box, Grid } from "@mui/material";

// Material Dashboard 2 PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import UnplannedListUpload from "./add-unplanned-list";
import { useSelector } from "react-redux";
import ReusabaleMonthlyPlannerTests from "./reusbalecomponent";
import {
  DUST_YEARLY_PLANNER,
  OVEN_YEARLY_PLANNER,
  RO_YEARLY_PLANNER,
  SHOWER_YEARLY_PLANNER,
  THERMAL_CYCLE_YEARLY_PLANNER,
  THERMAL_SHOCK_YEARLY_PLANNER,
  VIBRATION_YEARLY_PLANNER,
  ADD_DUST_MONTHLY_PLANNER,
  ADD_OVEN_MONTHLY_PLANNER,
  ADD_RO_MONTHLY_PLANNER,
  ADD_SHOWER_MONTHLY_PLANNER,
  ADD_THERMAL_CYCLE_MONTHLY_PLANNER,
  ADD_THERMAL_SHOCK_MONTHLY_PLANNER,
  ADD_VIBRATION_MONTHLY_PLANNER,
  DUST_MONTHLY_PLANNER_BY_DATE,
  OVEN_MONTHLY_PLANNER_BY_DATE,
  RO_MONTHLY_PLANNER_BY_DATE,
  SHOWER_MONTHLY_PLANNER_BY_DATE,
  THERMAL_CYCLE_MONTHLY_PLANNER_BY_DATE,
  THERMAL_SHOCK_MONTHLY_PLANNER_BY_DATE,
  VIBRATION_MONTHLY_PLANNER_BY_DATE
} from "apis/queries";

let testDataObj =     [
  {
    yearlyPlannerQuery: DUST_YEARLY_PLANNER,
    testName: "DUST",
    allTestNameYearlyPlanner: "allCrvtDustYearlyPlanners",
    mutation:ADD_DUST_MONTHLY_PLANNER,
    monthlyPlannerByDate:DUST_MONTHLY_PLANNER_BY_DATE,
    allTestNameMonthlyPlanner:"allCrvtDustMonthlyPlanners",
    expanded: false,
  },
  {
    yearlyPlannerQuery: OVEN_YEARLY_PLANNER,
    testName: "OVEN",
    allTestNameYearlyPlanner: "allCrvtOvenYearlyPlanners",
    mutation:ADD_OVEN_MONTHLY_PLANNER,
    monthlyPlannerByDate:OVEN_MONTHLY_PLANNER_BY_DATE,
    allTestNameMonthlyPlanner:"allCrvtOvenMonthlyPlanners",
    expanded: false,
  },
  {
    yearlyPlannerQuery: RO_YEARLY_PLANNER,
    testName: "RO",
    allTestNameYearlyPlanner: "allCrvtRoYearlyPlanners",
    mutation:ADD_RO_MONTHLY_PLANNER,
    monthlyPlannerByDate:RO_MONTHLY_PLANNER_BY_DATE,
    allTestNameMonthlyPlanner:"allCrvtRoMonthlyPlanners",
    expanded: false,
  },
  {
    yearlyPlannerQuery: SHOWER_YEARLY_PLANNER,
    testName: "SHOWER",
    allTestNameYearlyPlanner: "allCrvtShowerYearlyPlanners",
    mutation:ADD_SHOWER_MONTHLY_PLANNER,
    monthlyPlannerByDate:SHOWER_MONTHLY_PLANNER_BY_DATE,
    allTestNameMonthlyPlanner:"allCrvtShowerMonthlyPlanners",
    expanded: false,
  },
  {
    yearlyPlannerQuery: THERMAL_CYCLE_YEARLY_PLANNER,
    testName: "THERMAL CYCLE",
    allTestNameYearlyPlanner: "allCrvtThermalCycleYearlyPlanners",
    mutation:ADD_THERMAL_CYCLE_MONTHLY_PLANNER,
    monthlyPlannerByDate:THERMAL_CYCLE_MONTHLY_PLANNER_BY_DATE,
    allTestNameMonthlyPlanner:"allCrvtThermalCycleMonthlyPlanners",
    expanded: false,
  },
  {
    yearlyPlannerQuery: THERMAL_SHOCK_YEARLY_PLANNER,
    testName: "THERMAL SHOCK",
    allTestNameYearlyPlanner: "allCrvtThermalShockYearlyPalnners",
    mutation:ADD_THERMAL_SHOCK_MONTHLY_PLANNER,
    monthlyPlannerByDate:THERMAL_SHOCK_MONTHLY_PLANNER_BY_DATE,
    allTestNameMonthlyPlanner:"allThermalShockMonthlyPlanners",
    expanded: false,
  },
  {
    yearlyPlannerQuery: VIBRATION_YEARLY_PLANNER,
    testName: "VIBRATION",
    allTestNameYearlyPlanner: "allCrvtVibrationYearlyPlanners",
    mutation:ADD_VIBRATION_MONTHLY_PLANNER,
    monthlyPlannerByDate:VIBRATION_MONTHLY_PLANNER_BY_DATE,
    allTestNameMonthlyPlanner:"allCrvtVibrationMonthlyPlanners",
    expanded: false,
  },
]
function MonthlyPlanner() {
  const store = useSelector((store) => {
    return store.alert;
  });
  const [testData, setTestData] = useState([]);
  useEffect(()=>{
    setTestData(testDataObj)
  },[])

  // const handleExpandClick = (index) => {
  //   setTestData((prevTestData) =>
  //     prevTestData.map((val, i) => ({
  //       ...val,
  //       expanded: i === index ? !val.expanded : false,
  //     }))
  //   );
  // };

  return (
    <DashboardLayout>
      <MDBox width="calc(100% - 48px)" position="absolute" top="1.75rem">
        <DashboardNavbar dark absolute />
      </MDBox>
      <MDBox pt={10} pb={3}>
        <Card>
          <MDBox p={3} lineHeight={1}>
       
            <UnplannedListUpload />
            <Grid style={{background:"#394259"}} mt={3} pt={2} pr={1} pl={1} pb={3} bgcolor="#F7F7F7" borderRadius={3}>
              {testData.map((props,i)=>{
                return(
                    <ReusabaleMonthlyPlannerTests
                    yearlyPlannerQuery={props.yearlyPlannerQuery}
                    testName={props.testName}
                    allTestNameYearlyPlanner={props.allTestNameYearlyPlanner}
                    mutation={props.mutation}
                    monthlyPlannerByDate={props.monthlyPlannerByDate}
                    allTestNameMonthlyPlanner = {props.allTestNameMonthlyPlanner}
                    expanded={props.expanded}
                    />
                  // </Box>
                )
              })}
             
            </Grid>
          </MDBox>
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default MonthlyPlanner;
