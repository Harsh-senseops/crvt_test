// @mui material components
import Card from "@mui/material/Card";

// react imports
import { useState,useEffect } from "react";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { useQuery } from "urql";
import { ALL_YEARLY_PLANNER_HISTORY } from "apis/queries";

const columns = [
  {Header:"File Name", accessor:"fileName"},
  {Header:"Employee Code", accessor:"empCode"},
  {Header:"Date", accessor:"date"}
]

function AnnualUploadHistory() {
  const [shouldPause,setShouldPause] = useState(true);
  const [data,setData] = useState({columns,rows:[]});
  const [result,recResult] = useQuery({
    query:ALL_YEARLY_PLANNER_HISTORY,
    pause:shouldPause,
  })

  useEffect(()=>{
    if(data.rows.length === 0){
      setShouldPause(false)
    }
    if(result.data){
      let tempArray = []
      result.data?.allYearlyPlannerHistories.nodes.map((val)=>{
        tempArray.push({date:val.date.split("T")[0],empCode:val.empcode,fileName:val.fileName})
      })
      setData({columns,rows:tempArray})
      setShouldPause(true)
    }
  },[result.data])
  return (
    <DashboardLayout>
      <MDBox width="calc(100% - 48px)" position="absolute" top="1.75rem">
        <DashboardNavbar dark absolute />
      </MDBox>
      <MDBox pt={10} pb={3}>
        <Card>
          <MDBox p={3} lineHeight={1}>
            <MDTypography variant="h5" fontWeight="medium">
               Upload History : Master Part List
            </MDTypography>
            <DataTable table={data} canSearch={true}/>
          </MDBox>
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default AnnualUploadHistory;
