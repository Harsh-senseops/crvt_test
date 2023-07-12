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
import { ALL_MONTHLY_HISTORY } from "apis/queries";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const columns = [
  { Header: "Part Code", accessor: "partCode" },
  { Header: "Status", accessor: "status", icon: true  },
  { Header: "Description", accessor: "description" },
  { Header: "Date", accessor: "date" },
  { Header: "Employee Code", accessor: "empCode" },
];

function MonthlyUploadHistory() {
  const [data,setData] = useState({columns,rows:[]});
  const [shouldPause,setShouldPause] = useState(true);
  let [monthlyHistoryrRes,rexQuery] = useQuery({
    query:ALL_MONTHLY_HISTORY,
    pause:shouldPause
  }) 

  useEffect(()=>{
    if(data.rows.length === 0){
      setShouldPause(false)
    }
    if(monthlyHistoryrRes.data){
      console.log(monthlyHistoryrRes.data.allMonthlyUploadHistories.nodes)
      setShouldPause(true)
      let tempArry = []
      monthlyHistoryrRes.data.allMonthlyUploadHistories.nodes.map((val)=>{
        tempArry.push({
          partCode:val.partCode,
          status:val.status,
          description:val.description,
          date:val.date.split("T")[0],
          empCode:val.empCode
        })
      })
      setData({columns,rows:tempArry})
    }
  },[monthlyHistoryrRes.data])
  return (
    <DashboardLayout>
      <MDBox width="calc(100% - 48px)" position="absolute" top="1.75rem">
        <DashboardNavbar dark absolute />
      </MDBox>
      <MDBox pt={10} pb={3}>
        <Card>
          <MDBox p={3} lineHeight={1}>
            <MDTypography variant="h5" fontWeight="medium">
                Upload History : Unplanned List
            </MDTypography>
            <DataTable table={data} canSearch={true} noEndBorder={false} />
          </MDBox>
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default MonthlyUploadHistory;
