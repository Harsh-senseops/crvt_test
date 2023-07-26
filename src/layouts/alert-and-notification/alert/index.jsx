import React from "react";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Grid from "@mui/material/Grid";
import { useQuery } from "urql";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function Alert() {
  const [showTimer] = useQuery({
    query: `query showTimer{
      showTimer(machineName:"Dust")
    }`,
    variables: { machineName: "Dust" },
  });

  const [timer, setTimer] = useState(0);
  useEffect(() => {
    let timeInterval;

    if (showTimer.data) {
      const initialTimerValue = showTimer.data.showTimer;
      setTimer(initialTimerValue);

      if (initialTimerValue !== -1) {
        timeInterval = setInterval(() => {
          setTimer((prevTimer) => {
            const updatedTimer = prevTimer + 1;
            if (updatedTimer === -1) {
              clearInterval(timeInterval);
            }
            return updatedTimer;
          });
        }, 1000);
      }
    }

    return () => {
      clearInterval(timeInterval);
    };
  }, [showTimer.data]);

  return (
    <DashboardLayout>
      <MDBox width="calc(100% - 48px)" position="absolute" top="1.75rem">
        <DashboardNavbar dark absolute />
      </MDBox>
      <MDBox pt={10} pb={3}>
        <Card>
          <MDBox p={3} lineHeight={1}>
            {/* <MDTypography variant="h5" fontWeight="medium">
              Alert
            </MDTypography> */}
            <Grid mt={2}>
              <h2>Timer: {timer}</h2>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 800 }} aria-label="caption table">
                  <TableRow>
                    <TableCell>
                      <MDTypography textTransform="uppercase" variant="h5" fontWeight="medium">
                        AlertCode
                      </MDTypography>
                    </TableCell>
                    <TableCell   align="center">
                      <MDTypography textTransform="uppercase" variant="h5" fontWeight="medium">
                        DateTime
                      </MDTypography>
                    </TableCell>
                    <TableCell align="center">
                      <MDTypography textTransform="uppercase" variant="h5" fontWeight="medium">
                        Description
                      </MDTypography>
                    </TableCell>
                    <TableCell align="center">
                      <MDTypography textTransform="uppercase" variant="h5" fontWeight="medium">
                        Employee Code
                      </MDTypography>
                    </TableCell>
                    <TableCell align="center">
                      <MDTypography textTransform="uppercase" variant="h5" fontWeight="medium">
                        Engine Status
                      </MDTypography>
                    </TableCell>
                    <TableCell align="center">
                      <MDTypography textTransform="uppercase" variant="h5" fontWeight="medium">
                        Counter
                      </MDTypography>
                    </TableCell>
                    <TableCell align="center">
                      <MDTypography textTransform="uppercase" variant="h5" fontWeight="medium">
                        ACK
                      </MDTypography>
                    </TableCell>
                    <TableCell align="center">
                      <MDTypography textTransform="uppercase" variant="h5" fontWeight="medium">
                        Remarks
                      </MDTypography>
                    </TableCell>
                  </TableRow>

                  <TableBody>
                    {/* {rows.map((row) => ( */}
                    <TableRow key={"fd"}>
                      <TableCell align="center">
                      <MDTypography textTransform="uppercase" variant="h6" fontWeight="regular">
                      Alert123
                      </MDTypography>
                        
                      </TableCell>
                      <TableCell align="right">
                      <MDTypography textTransform="uppercase" variant="h6" fontWeight="regular">
                      {"2023-07-17\n10:50:25 PM"}
                      
                      </MDTypography>
                      </TableCell>
                      <TableCell align="center">
                      <MDTypography textTransform="uppercase" variant="h6" fontWeight="regular">
                      
                      HORN stopped working
                      </MDTypography>
                        
                        </TableCell>
                      <TableCell align="right">
                      <MDTypography textTransform="uppercase" variant="h6" fontWeight="regular">
                      
                      superuser123
                      </MDTypography>
                      </TableCell>
                      <TableCell align="right">
                      <MDTypography textTransform="uppercase" variant="h6" fontWeight="regular">
                      
                      Running
                      </MDTypography>
                      </TableCell>
                      <TableCell align="right">
                      <MDTypography textTransform="uppercase" variant="h6" fontWeight="regular">
                      
                      6 times snoozed
                      </MDTypography>
                      </TableCell>
                      <TableCell align="right">
                      <MDTypography textTransform="uppercase" variant="h6" fontWeight="regular">
                      
                     null
                      </MDTypography>
                      </TableCell>
                      <TableCell align="right">
                      <MDTypography textTransform="uppercase" variant="h6" fontWeight="regular">
                      
                     Revisit again
                      </MDTypography>
                      </TableCell>
                    </TableRow>
                    {/* ))} */}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </MDBox>
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Alert;
