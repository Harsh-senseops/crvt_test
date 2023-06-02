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
import MaterialTable from "material-table";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { orange } from "@mui/material/colors";
import typography from "assets/theme/base/typography";
import { useSelector } from "react-redux";

function Alert() {
  const theme = createTheme({
    palette: {
      typography: {
        fontFamily: typography.fontFamily,
        fontSize: 4,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
      },
    },
  });

  const [columns, setColumns] = useState([
    {
      title: "",
      render: (rowData) => {
        const button = (
          <IconButton
            color="inherit"
            onClick={() => {
              console.log("Icon clicked");
            }}
          >
            <InfoIcon style={{ color: "red" }} />
          </IconButton>
        );
        return button;
      },
    },
    { title: "EQUIPMENT", field: "equipment", editable: false },
    { title: "DESCRIPTION", field: "description", width: "40%", editable: false },
    { title: "DATE", field: "date", editable: false },
    {
      title: "ACTION TAKEN",
      field: "actiontaken",
      lookup: { 1: "Action 1", 2: "Action 2", 3: "Action 3" },
    },
    { title: "ACTION TAKEN DATE", field: "actiontakendate", editable: false },
  ]);

  const [data, setData] = useState([
    {
      equipment: "HORN",
      description: "Machine stopped working",
      date: "10/03/2022",
      actiontaken: "none",
      actiontakendate: "",
    },
    {
      equipment: "HORN",
      description: "Machine stopped working",
      date: "10/03/2022",
      actiontaken: "none",
      actiontakendate: "",
    },
  ]);

  const role = useSelector((store) => {
    return store.userRoles;
  });

  console.log(role.roles, "roles");

  return (
    <DashboardLayout>
      <MDBox width="calc(100% - 48px)" position="absolute" top="1.75rem">
        <DashboardNavbar dark absolute />
      </MDBox>
      <MDBox pt={10} pb={3}>
        <Card>
          <MDBox p={3} lineHeight={1}>
            <MDTypography variant="h5" fontWeight="medium">
              Alert
            </MDTypography>
            <Grid mt={2}>
              {role.roles === 2 || role.roles === 3 ? (
                <ThemeProvider theme={theme}>
                  <MaterialTable
                    title=""
                    //  icons={tableIcons}
                    options={{
                      headerStyle: {
                        // backgroundColor: '#555555',
                        // backgroundColor: '#ffa000',
                        color: "#7b809b",
                        fontWeight: "bold",
                        height: 10,
                      },
                      actionsColumnIndex: -1,
                      //   pageSize: rowsPerPage,
                      //   pageSizeOptions: rowsPerPage,
                      //   exportButton: true,
                      rowStyle: (rowData) => ({
                        // backgroundColor: (rowData.tableData.id % 2 === 1) ? '#F7F7F7' : '#FFF',
                        fontSize: "1rem",
                        color: "#7b809b",
                      }),
                    }}
                    editable={{
                      // onRowAdd: newData =>
                      //   new Promise((resolve, reject) => {
                      //     setTimeout(() => {
                      //       setData([...data, newData]);
                      //       resolve();
                      //     }, 1000)
                      //   }),
                      onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                          setTimeout(() => {
                            const dataUpdate = [...data];
                            const index = oldData.tableData.id;
                            dataUpdate[index] = newData;
                            setData([...dataUpdate]);

                            resolve();
                          }, 1000);
                        }),
                    }}
                    columns={columns}
                    data={data}
                  />
                </ThemeProvider>
              ) : (
                <ThemeProvider theme={theme}>
                  <MaterialTable
                    title=""
                    //  icons={tableIcons}
                    options={{
                      headerStyle: {
                        // backgroundColor: '#555555',
                        // backgroundColor: '#ffa000',
                        color: "#7b809b",
                        fontWeight: "bold",
                        height: 10,
                      },
                      actionsColumnIndex: -1,
                      //   pageSize: rowsPerPage,
                      //   pageSizeOptions: rowsPerPage,
                      //   exportButton: true,
                      rowStyle: (rowData) => ({
                        // backgroundColor: (rowData.tableData.id % 2 === 1) ? '#F7F7F7' : '#FFF',
                        fontSize: "1rem",
                        color: "#7b809b",
                      }),
                    }}
                    //  editable={{
                    //      // onRowAdd: newData =>
                    //      //   new Promise((resolve, reject) => {
                    //      //     setTimeout(() => {
                    //      //       setData([...data, newData]);
                    //      //       resolve();
                    //      //     }, 1000)
                    //      //   }),
                    //      onRowUpdate: (newData, oldData) =>
                    //        new Promise((resolve, reject) => {
                    //          setTimeout(() => {
                    //            const dataUpdate = [...data];
                    //            const index = oldData.tableData.id;
                    //            dataUpdate[index] = newData;
                    //            setData([...dataUpdate]);

                    //            resolve();
                    //          }, 1000)
                    //        }),
                    //    }}
                    columns={columns}
                    data={data}
                  />
                </ThemeProvider>
              )}
            </Grid>
          </MDBox>
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Alert;
