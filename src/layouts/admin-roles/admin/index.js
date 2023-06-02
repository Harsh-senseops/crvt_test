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
import AdminTable from "./admin-table";
import MDAlert from "components/MDAlert";
import {useSelector} from "react-redux";

function AdminRoles() {
  const store = useSelector((store)=>{
    return store.alert;
  })
  // showAlert:false,
  // alertContaint:"",
  // color:""
  return (
    <DashboardLayout>
      {store.showAlert ? (
          <div style={{ zIndex: "2000", position: "fixed", width: "60%" }}>
            <MDAlert color={store.color} dismissible={true}>
              <h5>{store.message}</h5>
            </MDAlert>
          </div>
        ) : (
          ""
        )}
      <MDBox width="calc(100% - 48px)" position="absolute" top="1.75rem">
        <DashboardNavbar dark absolute />
      </MDBox>
      <MDBox pt={10} pb={3}>
        <AdminTable/>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default AdminRoles;
