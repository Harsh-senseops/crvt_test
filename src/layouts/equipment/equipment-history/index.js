// @mui material components
import Card from "@mui/material/Card";

// react imports
import { useState,useEffect } from "react";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { makeStyles } from "@mui/material";

// Material Dashboard 2 PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { useQuery } from "urql";
import { EQUIPMENT_HISTORY } from "apis/queries";

const columns = [
  {Header:"Date", accessor:"date"},
  {Header:"Component Name", accessor:"componentName"},
  {Header:"Test Type", accessor:"testType"},
  {Header:"Updated Values", accessor:"updatedValues"},
  {Header:"Employee Code", accessor:"employeeCode"},

]

function EquipmentHistory() {
const [data,setData] = useState({columns,rows:[]})
  const [equipmentHistory,rexEquipmentHistory]  =useQuery({
    query:EQUIPMENT_HISTORY
  })
  
  useEffect(()=>{
    let tempArry = []
    if(equipmentHistory.data){
     equipmentHistory.data?.allEquipmentUpdateHistories?.nodes.map((val)=>{
      // let values = "";
      // // for(let key in val.updateValues){
      // //   val.updateValues[key].str.
      // // }
      tempArry.push({
        date:val.date,
        componentName:val.componentDetailByComponentId.partName,
        testType:val.testType,
        updatedValues:val.updateValues.replace(/[{}"]/g, ''),
        employeeCode:val.employeeCode
      })
     })

    }
    setData({columns,rows:tempArry})

  },[equipmentHistory.data])
  return (
    <DashboardLayout>
      <MDBox width="calc(100% - 48px)" position="absolute" top="1.75rem">
        <DashboardNavbar dark absolute />
      </MDBox>
      <MDBox pt={10} pb={3}>
        <Card>
          <MDBox p={3} lineHeight={1}>
            {/* <MDTypography variant="h5" fontWeight="medium">
              Equipment History
            </MDTypography> */}
        <DataTable canSearch={true} table={data}/>
          </MDBox>
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default EquipmentHistory;
