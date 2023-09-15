// @mui material components
import Card from "@mui/material/Card";

// react imports
import { useState, useEffect } from "react";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Grid, makeStyles } from "@mui/material";

// Material Dashboard 2 PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import MDHoverSearch from "components/MDHoverSearch";
import { useQuery } from "urql";
import { EQUIPMENT_HISTORY } from "apis/queries";
import MDTable from "components/MDTable";

const columns = [
  { Header: "Date", accessor: "datetime" },
  { Header: "Component Name", accessor: "componentName" },
  { Header: "Test Type", accessor: "testType" },
  { Header: "Updated Values", accessor: "updatedValues" },
  { Header: "Employee Code", accessor: "employeeCode" },
];

function EquipmentHistory() {
  const [data, setData] = useState({ columns, rows: [] });
  const [searchTerm, setSearchTerm] = useState("");

  const [equipmentHistory, rexEquipmentHistory] = useQuery({
    query: EQUIPMENT_HISTORY,
  });

  useEffect(() => {
    let tempArry = [];
    if (equipmentHistory.data) {
      equipmentHistory.data?.allCrvtEquipmentUpdateHistories?.nodes.map((val) => {
        tempArry.push({
          datetime: val.date,
          componentName: val.crvtComponentDetailByComponentId.partName,
          testType: val.testType,
          updatedValues: val.updateValues.replace(/[{}"]/g, ""),
          employeeCode: val.employeeCode,
        });
      });
    }
    setData({ columns, rows: tempArry });
  }, [equipmentHistory.data]);
  return (
    <DashboardLayout>
      <MDBox width="calc(100% - 48px)" position="absolute" top="1.75rem">
        <DashboardNavbar dark absolute />
      </MDBox>
      <MDBox pt={10} pb={3}>
        <Card>
          <MDBox p={3} lineHeight={1}>
            {/* <DataTable canSearch={true} table={data}/> */}
            <MDHoverSearch onInputChange={(value) => setSearchTerm(value)} />
            <Grid mt={2}>
              <MDTable searchTerm={searchTerm} canSearch={false} data={data} />
            </Grid>
          </MDBox>
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
export default EquipmentHistory;
