// @mui material components
import Card from "@mui/material/Card";

// react imports
import { useState } from "react";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { PDFDownloadLink, Document, Page, PDFViewer } from '@react-pdf/renderer';
import MyDocument from "./pdf/mydocument";
// import { PDFDownloadLink, Document, Page, PDFViewer } from '@react-pdf/renderer';
// import MyDocument from "./pdf/MyDocument";

function FinalReportButton() {

  return (
    <MDButton color="info" variant="gradient">
            <PDFDownloadLink document={<MyDocument />} fileName="dailyReport.pdf">
              {({ blob, url, loading, error }) =>
                loading ? <MDTypography variant="outlined" color="white">Loading document...</MDTypography> : <MDTypography variant="outlined" color="white">DOWNLOAD REPORT</MDTypography>
              }
            </PDFDownloadLink>
    </MDButton>
  );
}

export default FinalReportButton;
