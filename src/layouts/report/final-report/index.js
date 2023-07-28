// @mui material components
import Card from "@mui/material/Card";

// react imports
import { useState } from "react";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { PDFDownloadLink, Document, Page, PDFViewer } from '@react-pdf/renderer';
import MyDocument from "./pdftrial/mydocument";
// import { PDFDownloadLink, Document, Page, PDFViewer } from '@react-pdf/renderer';
// import MyDocument from "./pdf/MyDocument";

function FinalReport() {

  return (
    <DashboardLayout>
      <MDBox width="calc(100% - 48px)" position="absolute" top="1.75rem">
        <DashboardNavbar dark absolute />
      </MDBox>
      <MDBox pt={10} pb={3}>
        <Card>
          <MDBox p={3} lineHeight={1}>
                {/* <MDTypography variant="h5" fontWeight="medium">
                  Final Report
                </MDTypography> */}
            {/* <PDFDownloadLink document={<MyDocument />} fileName="somename.pdf">
              {({ blob, url, loading, error }) =>
                loading ? 'Loading document...' : 'Download now!'
              }
            </PDFDownloadLink> */}
            {/* <MDTypography variant="button" color="text">
              Please configure equipment details for all components
            </MDTypography> */}
          </MDBox>
          <PDFViewer style={{height:"63vh"}}>
          <MyDocument />
            </PDFViewer>
            <PDFDownloadLink document={<MyDocument />} fileName="somename.pdf">
              {({ blob, url, loading, error }) =>
                loading ? 'Loading document...' : 'Download now!'
              }
            </PDFDownloadLink>
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default FinalReport;
