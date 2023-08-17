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
// import { DUST_YEARLY_PLANNER,OVEN_YEARLY_PLANNER } from "apis/queries";

const DUST_YEARLY_PLANNER = `
subscription dustYearlyPlanner {
  allDustYearlyPlanners {
    nodes {
      componentDetailByComponentId {
        partName
      }
      componentId
      samples
      testDetails
      totalSamplesTested
    }
  }
}
`;
const OVEN_YEARLY_PLANNER = `
subscription ovenYearlyPlanner {
  allOvenYearlyPlanners {
    nodes {
      componentDetailByComponentId {
        partName
      }
      componentId
      samples
      testDetails
      totalSamplesTested
    }
  }
}
`;
const RO_YEARLY_PLANNER = `subscription roYearlyPlanner {
  allRoYearlyPlanners {
    nodes {
      componentDetailByComponentId {
        partName
      }
      componentId
      samples
      testDetails
      totalSamplesTested
    }
  }
}
`;
const SHOWER_YEARLY_PLANNER = `
subscription showerYearlyPlanner {
  allShowerYearlyPlanners {
    nodes {
      componentDetailByComponentId {
        partName
      }
      componentId
      samples
      testDetails
      totalSamplesTested
    }
  }
}
`;
const THERMAL_CYCLE_YEARLY_PLANNER = `
subscription thermalCycleYearlyPlanner {
  allThermalCycleYearlyPlanners {
    nodes {
      componentDetailByComponentId {
        partName
      }
      componentId
      samples
      testDetails
      totalSamplesTested
    }
  }
}
`;
const THERMAL_SHOCK_YEARLY_PLANNER = `
subscription thermalShockYearlyPlanner {
  allThermalShockYearlyPalnners {
    nodes {
      componentDetailByComponentId {
        partName
      }
      componentId
      samples
      testDetails
      totalSamplesTested
    }
  }
}
`;
const VIBRATION_YEARLY_PLANNER = `
subscription vibrationYearlyPlanner {
  allVibrationYearlyPlanners {
    nodes {
      componentDetailByComponentId {
        partName
      }
      componentId
      samples
      testDetails
      totalSamplesTested
    }
  }
}
`;
let testDataObj = [
  {
    name: "Dust",
    query: DUST_YEARLY_PLANNER,
    allPlanners: "allDustYearlyPlanners",
    expanded: false,
  },
  {
    name: "Oven",
    query: OVEN_YEARLY_PLANNER,
    allPlanners: "allOvenYearlyPlanners",
    expanded: false,
  },
  {
    name: "RO",
    query: RO_YEARLY_PLANNER,
    allPlanners: "allRoYearlyPlanners",
    expanded: false,
  },
  {
    name: "Shower",
    query: SHOWER_YEARLY_PLANNER,
    allPlanners: "allShowerYearlyPlanners",
    expanded: false,
  },
  {
    name: "Thermal Cycle",
    query: THERMAL_CYCLE_YEARLY_PLANNER,
    allPlanners: "allThermalCycleYearlyPlanners",
    expanded: false,
  },
  {
    name: "Thermal Shock",
    query: THERMAL_SHOCK_YEARLY_PLANNER,
    allPlanners: "allThermalShockYearlyPalnners",
    expanded: false,
  },
  {
    name: "Vibration",
    query: VIBRATION_YEARLY_PLANNER,
    allPlanners: "allVibrationYearlyPlanners",
    expanded: false,
  },
]
function AnnualPlanner() {
  const alertStore = useSelector((store) => store.alert);
  const [testData, setTestData] = useState([]
  );
  const role = useSelector((store) => {
    return store.userRoles;
  });
  const onFileChange = (files) => {
    console.log(files);
  };
  useEffect(()=>{
    setTestData(testDataObj)
  },[])

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
      <MDBox
        pt={10}
        pb={3}
        style={{ background: "#202940", borderRadius: "10px" }}
      >
        <Card style={{background:"#202940"}}>
          <MDBox p={3} lineHeight={1}>
          </MDBox>
          {role.roles === 3 ? (
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={3} >
                <DropFileInput onFileChange={(files) => onFileChange(files)} />
              </Grid>
            </Grid>
          ) : (
            ""
          )}
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
                <div key={i}  onClick={() => handleExpandClick(i)}>
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
