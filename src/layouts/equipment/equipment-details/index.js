// @mui material components
import Card from "@mui/material/Card";

// react imports

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Children components
import ComponentsTable from "./componentsTable";
// import DataTable from "examples/Tables/DataTable";

function EquipmentDetails() {

 
  return (
    <DashboardLayout >
      <MDBox width="calc(100% - 48px)" position="absolute" top="1.75rem">
        <DashboardNavbar dark absolute />
      </MDBox>
      <MDBox pt={10} pb={3}>
        <Card>
          <MDBox p={3} lineHeight={1}>
            <MDTypography variant="h5" fontWeight="medium">
              Equipment Details
            </MDTypography>
            <MDTypography variant="button" color="text">
              Configure equipment details for all components
            </MDTypography>
          </MDBox>
          <MDBox>
            <Card>
            <ComponentsTable />
            </Card>
          </MDBox>
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default EquipmentDetails;
