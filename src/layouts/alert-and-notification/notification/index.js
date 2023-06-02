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
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { orange } from '@mui/material/colors';
import typography from "assets/theme/base/typography";

function Notification() {

  const theme = createTheme({
    palette: {
      typography: {
        "fontFamily": typography.fontFamily,
        "fontSize": 4,
        "fontWeightLight": 300,
        "fontWeightRegular": 400,
        "fontWeightMedium": 500
       }
    },
  });

  const [columns, setColumns] =  useState([
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
              <InfoIcon style={{color: 'green'}} />
            </IconButton>
          );
          return button;
        }
      },
    { title: 'DESCRIPTION', field: 'description', width: '80%'},
    { title: 'DATE', field: 'date'},     
  ])

const [data, setData] = useState([
    {description: "Final Report Notification RO Horn for part code 38110-KZA-W010, 38110-AAL-3010, and vendor code 100154, 100042 and testing version test_ro_horn_2021-11-08", date:"10/03/2022"},
    {description: "Final Report Notification RO Horn for part code 38110-KZA-W010, 38110-AAL-3010, and vendor code 100154, 100042 and testing version test_ro_horn_2021-11-08", date:"10/03/2022"}

])

  return (
    <DashboardLayout>
      <MDBox width="calc(100% - 48px)" position="absolute" top="1.75rem">
        <DashboardNavbar dark absolute />
      </MDBox>
      <MDBox pt={10} pb={3}>
        <Card>
          <MDBox p={3} lineHeight={1}>
            <MDTypography variant="h5" fontWeight="medium">
              Notification
            </MDTypography>
            {/* <MDTypography variant="button" color="text">
              Please configure equipment details for all components
            </MDTypography> */}
             <Grid mt={2}>
              <ThemeProvider theme={theme}>
            <MaterialTable
              title=""
               columns={columns}
               data={data}
               options={{
                headerStyle: {
                  // backgroundColor: '#555555',
                  // backgroundColor: '#ffa000',
                  color: '#7b809b',
                  fontWeight: 'bold',
                  height: 10,
                },
                 actionsColumnIndex: -1,
               //   pageSize: rowsPerPage,
               //   pageSizeOptions: rowsPerPage,
               //   exportButton: true,
               rowStyle: rowData => ({
                // backgroundColor: (rowData.tableData.id % 2 === 1) ? '#F7F7F7' : '#FFF',
                fontSize: '1rem',
                color: '#7b809b'
              })
               }}
            />      
            </ThemeProvider>
            </Grid>
          </MDBox>
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Notification;
