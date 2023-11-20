// @mui material components
import Card from "@mui/material/Card";
import { Grid } from "@mui/material";
import YearlyPlannerComponent from "./yearly-planner-component";
// react imports
import { useEffect, useState } from "react";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Masterpartlistupload from "./master-part-list-upload";
import DropFileInput from "./drop-file-input";
import { useSelector } from "react-redux";
import MDAlert from "components/MDAlert";
import MDButton from "components/MDButton";
import sampleMasterPartList from "../../../assets/Sample-Master-Partlist.xlsx"

let testDataObj = [
  {
    name: "Dust",
    allPlanners: "allCrvtDustYearlyPlanners",
    expanded: false,
  },
  {
    name: "Oven",
    allPlanners: "allCrvtOvenYearlyPlanners",
    expanded: false,
  },
  {
    name: "RO",
    allPlanners: "allCrvtRoYearlyPlanners",
    expanded: false,
  },
  {
    name: "Shower",
    allPlanners: "allCrvtShowerYearlyPlanners",
    expanded: false,
  },
  {
    name: "Thermal Cycle",
    allPlanners: "allCrvtThermalCycleYearlyPlanners",
    expanded: false,
  },
  {
    name: "Thermal Shock",
    allPlanners: "allCrvtThermalShockYearlyPalnners",
    expanded: false,
  },
  {
    name: "Vibration",
    allPlanners: "allCrvtVibrationYearlyPlanners",
    expanded: false,
  },
];
function AnnualPlanner() {
  const alertStore = useSelector((store) => store.alert);
  const [testData, setTestData] = useState([]);
  const role = useSelector((store) => {
    return store.userRoles;
  });
  const onFileChange = (files) => {
  };
  useEffect(() => {
    setTestData(testDataObj);
  }, []);

  const handleExpandClick = (index) => {
    setTestData((prevTestData) =>
      prevTestData.map((val, i) => ({
        ...val,
        expanded: i === index ? !val.expanded : false,
      }))
    );
  };

  return (
    <DashboardLayout>
      {alertStore.showAlert ? (
        <div style={{ zIndex: "2000", position: "fixed", width: "60%" }}>
          <MDAlert color={alertStore.color} dismissible={true}>
            <h5>{alertStore.message}</h5>
          </MDAlert>
        </div>
      ) : (
        ""
      )}
      <MDBox width="calc(100% - 48px)" position="absolute" top="1.75rem">
        <DashboardNavbar dark absolute />
      </MDBox>
      <MDBox pt={10} pb={3} style={{ background: "#202940", borderRadius: "10px" }}>
        <Card style={{ background: "#202940" }}>
          <MDBox p={3} lineHeight={1}></MDBox>
          {role.roles === 3 ? (
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={3}>
                <DropFileInput onFileChange={(files) => onFileChange(files)} />
              </Grid>
            </Grid>
          ) : (
            ""
          )}
          <Grid display="flex" justifyContent="flex-end" marginRight={4}>
            <MDButton color="info">
              <a href={sampleMasterPartList} download style={{color:"white"}}>
                Download sample excel
              </a>
            </MDButton>
          </Grid>
          <Grid
            style={{ background: "#394259" }}
            mt={3}
            pt={2}
            pr={1}
            pl={1}
            pb={3}
            borderRadius={3}
          >
            {testData.map((val, i) => {
              return (
                <div key={i} onClick={() => handleExpandClick(i)}>
                  <YearlyPlannerComponent
                    name={val?.name}
                    query={val?.query}
                    allPlanners={val?.allPlanners}
                    expanded={val.expanded}
                  />
                </div>
              );
            })}
          </Grid>
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default AnnualPlanner;
