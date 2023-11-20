// @mui material components
import Card from "@mui/material/Card";

// react imports
import { useState } from "react";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import FormField from "layouts/pages/account/components/FormField";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import typography from "assets/theme/base/typography";
import { makeStyles } from "@mui/styles";
import MDButton from "components/MDButton";
import TextField from "@mui/material/TextField";
import DropFileInput from "layouts/report/component-pictures";
import FinalReportButton from "../download-report-button";
import HeroLogo from "../../logo1.png";
import { useMutation } from "urql";
import {useSelector} from "react-redux";

const upLoadPhoto =`mutation MyMutation($file:Base64EncodedBinary!,$filename: String!, $empCode: String!) {
  createDustReport(
    input: {dustReport: {file: $file, filename: $filename, empCode: $empCode}}
  ) {
    dustReport {
      id
      filename
    }
  }
}`;

const useStyles = makeStyles({
  table: {
    // minWidth: 650,
    "& .MuiTableCell-root": {
      borderLeft: "1px solid rgba(224, 224, 224, 1)",
    },
  },
});

const getBase64 = (file) => {
  return new Promise((resolve) => {
    let fileInfo;
    let baseURL = "";
    // Make new FileReader
    let reader = new FileReader();

    // Convert the file to base64 text
    reader.readAsDataURL(file);

    // on reader load somthing...
    reader.onload = () => {
      // Make a fileInfo Object
      baseURL = reader.result;
      resolve(baseURL);
    };
  });

};

function ViewDailyReportTable(currentReportEquipment) {
  const empCode = useSelector((store)=>{
    return store.userRoles
  })
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [reportNumber, setReportNumber] = useState("");
  const [reportDate, setReportDate] = useState("");
  const [inspectionLotNo, setInspectionLotNo] = useState("");
  const [inspectionQty, setInspectionQty] = useState("");
  const [inspectionLotDate, setInspectionLotDate] = useState("");
  const [partMfgDate, setPartMfgDate] = useState("");
  const [noOfSamples, setNoOfSamples] = useState("");
  const [objective, setObjective] = useState("");
  const [detailsOfModification, setDetailsOfModification] = useState("");
  const [afterTest, setAfterTest] = useState("");
  const [observation, setObservation] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [result, setResult] = useState("");
  const [byteaImg,setByteaImg] = useState("");
  const [uploadPhotoRes, uploadPhoto] = useMutation(upLoadPhoto);
  const classes = useStyles();

  const onFileChange = (files) => {
    let arr = []
    files.map((val)=>{
      getBase64(val).then((res)=>{
        arr.push(res)
      })
    })
    setByteaImg(arr)
  };

  const theme = createTheme({
    palette: {
      //   primary: {
      //     main: '#4caf50',
      //   },
      //   secondary: {
      //     main: '#ff9100',
      //   },
      typography: {
        fontFamily: typography.fontFamily,
        fontSize: 4,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
      },
    },
  });

  const handleReportNumber = (event) => {
    setReportNumber(event.target.value);
  };

  const handleReportDate = (event) => {
    setReportDate(event.target.value);
  };

  const handleInspectionLotNo = (event) => {
    setInspectionLotNo(event.target.value);
  };

  const handleInspectionQty = (event) => {
    setInspectionQty(event.target.value);
  };

  const handleInspectionLotDate = (event) => {
    setInspectionLotDate(event.target.value);
  };

  const handlePartMfgDate = (event) => {
    setPartMfgDate(event.target.value);
  };

  const handleNoOfSamples = (event) => {
    setNoOfSamples(event.target.value);
  };

  const handleObjective = (event) => {
    setObjective(event.target.value);
  };

  const handleDetailsOfModification = (event) => {
    setDetailsOfModification(event.target.value);
  };

  const handleObservation = (event) => {
    setObservation(event.target.value);
  };

  const handleAnalysis = (event) => {
    setAnalysis(event.target.value);
  };

  const handleResult = (event) => {
    setResult(event.target.value);
  };

  const handleSaveReport = (e) => {
    e.preventDefault();
  };

  const uploadFile = () =>{
    byteaImg.map((val,i)=>{
      let a = val.indexOf(",");
      uploadPhoto({
        file:val.slice(a+1),
        filename:"img" + i,
        empCode:empCode.empCode,
      }).then((res)=>{
        alert("Success")
      })
    })

  }

  return (
    <div>
      <h1>View only table</h1>
      <ThemeProvider theme={theme}>
        <Paper sx={{ width: "100%" }} mt={3}>
          
          <TableContainer
          //   sx={{ maxHeight: 440 }}
          >
            <Table className={classes.table} stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={12}>
                    <MDTypography variant="button" fontWeight="bold">
                      REPORT
                    </MDTypography>
                  </TableCell>
                  {/* <TableCell align="center" colSpan={3}>
              CENTER OF RELIABILITY AND VALIDATION TESTING LAB REPORTFORMAT
              </TableCell>
              <TableCell align="center" colSpan={3}>
              Format Revision Number: 2
              </TableCell>
              <TableCell align="center" colSpan={3}>
              Format Revision Date: 10/10/2021
              </TableCell> */}
                </TableRow>
                {/* <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow> */}
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={3}>
                    {HeroLogo}
                  </TableCell>
                  <TableCell align="center" colSpan={3}>
                    CENTER OF RELIABILITY AND VALIDATION TESTING LAB REPORTFORMAT
                  </TableCell>
                  <TableCell align="center" colSpan={3}>
                    Format Revision Number: 2
                  </TableCell>
                  <TableCell align="center" colSpan={3}>
                    Format Revision Date: 10/10/2021
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" colSpan={12}>
                    CENTRAL QUALITY HM2G
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" colSpan={2}>
                    <MDTypography variant="button" fontWeight="bold">
                      PART NAME
                    </MDTypography>
                  </TableCell>
                  <TableCell align="center" colSpan={2}>
                    abc
                  </TableCell>
                  <TableCell align="center" colSpan={2}>
                    <MDTypography variant="button" fontWeight="bold">
                      HMCL PART CODE
                    </MDTypography>
                  </TableCell>
                  <TableCell align="center" colSpan={2}>
                    edit data
                  </TableCell>
                  <TableCell align="center" colSpan={2}>
                    <MDTypography variant="button" fontWeight="bold">
                      REPORT NO.
                    </MDTypography>
                  </TableCell>
                  <TableCell align="center" colSpan={2}>
                    <TextField
                      disabled
                      id="outlined-name"
                      label="Enter Report No."
                      value={reportNumber}
                      onChange={handleReportNumber}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" colSpan={2}>
                    <MDTypography variant="button" fontWeight="bold">
                      VENDOR NAME/CODE
                    </MDTypography>
                  </TableCell>
                  <TableCell align="center" colSpan={2}>
                    edit data
                  </TableCell>
                  <TableCell align="center" colSpan={2}>
                    <MDTypography variant="button" fontWeight="bold">
                      VENDOR PART CODE
                    </MDTypography>
                  </TableCell>
                  <TableCell align="center" colSpan={2}>
                    edit data
                  </TableCell>
                  <TableCell align="center" colSpan={2}>
                    <MDTypography variant="button" fontWeight="bold">
                      REPORT DATE
                    </MDTypography>
                  </TableCell>
                  <TableCell align="center" colSpan={2}>
                    <TextField
                      disabled
                      id="outlined-name"
                      label="Report date"
                      value={reportDate}
                      onChange={handleReportDate}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" colSpan={2}>
                    <MDTypography variant="button" fontWeight="bold">
                      PLANT
                    </MDTypography>
                  </TableCell>
                  <TableCell align="center" colSpan={2}>
                    edit data
                  </TableCell>
                  <TableCell align="center" colSpan={2}>
                    <MDTypography variant="button" fontWeight="bold">
                      VENDOR MFG LOCATION
                    </MDTypography>
                  </TableCell>
                  <TableCell align="center" colSpan={2}>
                    edit data
                  </TableCell>
                  <TableCell align="center" colSpan={2}>
                    <MDTypography variant="button" fontWeight="bold">
                      TEST START DATE
                    </MDTypography>
                  </TableCell>
                  <TableCell align="center" colSpan={2}>
                    edit data
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" colSpan={2}>
                    <MDTypography variant="button" fontWeight="bold">
                      INSPECTION LOT NO
                    </MDTypography>
                  </TableCell>
                  <TableCell align="center" colSpan={2}>
                    <TextField
                      disabled
                      id="outlined-name"
                      label="Inspection lot no"
                      value={inspectionLotNo}
                      onChange={handleInspectionLotNo}
                    />
                  </TableCell>
                  <TableCell align="center" colSpan={2}>
                    <MDTypography variant="button" fontWeight="bold">
                      INSPECTION LOT QTY
                    </MDTypography>
                  </TableCell>
                  <TableCell align="center" colSpan={2}>
                    <TextField
                      disabled
                      id="outlined-name"
                      label="Inspection lot no"
                      value={inspectionQty}
                      onChange={handleInspectionQty}
                    />
                  </TableCell>
                  <TableCell align="center" colSpan={2}>
                    <MDTypography variant="button" fontWeight="bold">
                      TEST END DATE
                    </MDTypography>
                  </TableCell>
                  <TableCell align="center" colSpan={2}>
                    edit data
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" colSpan={2}>
                    <MDTypography variant="button" fontWeight="bold">
                      INSPECTION LOT DATE
                    </MDTypography>
                  </TableCell>
                  <TableCell align="center" colSpan={2}>
                    <TextField
                      disabled
                      id="outlined-name"
                      label="Inspection lot date"
                      value={inspectionLotDate}
                      onChange={handleInspectionLotDate}
                    />
                  </TableCell>
                  <TableCell align="center" colSpan={2}>
                    <MDTypography variant="button" fontWeight="bold">
                      PART MFG MONTH
                    </MDTypography>
                  </TableCell>
                  <TableCell align="center" colSpan={2}>
                    <TextField
                      disabled
                      id="outlined-name"
                      label="Part Mfg month"
                      value={partMfgDate}
                      onChange={handlePartMfgDate}
                    />
                  </TableCell>
                  <TableCell align="center" colSpan={2}>
                    <MDTypography variant="button" fontWeight="bold">
                      NO OF SAMPLES
                    </MDTypography>
                  </TableCell>
                  <TableCell align="center" colSpan={2}>
                    <TextField
                      disabled
                      id="outlined-name"
                      label="No of samples"
                      value={noOfSamples}
                      onChange={handleNoOfSamples}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" colSpan={2}>
                    <MDTypography variant="button" fontWeight="bold">
                      OBJECTIVE
                    </MDTypography>
                  </TableCell>
                  <TableCell align="center" colSpan={10}>
                    <TextField
                      disabled
                      fullWidth
                      id="outlined-name"
                      label="Objective"
                      value={objective}
                      onChange={handleObjective}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" colSpan={2}>
                    <MDTypography variant="button" fontWeight="bold">
                      TYPE OF TEST
                    </MDTypography>
                  </TableCell>
                  <TableCell align="center" colSpan={10}>
                    edit data
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" colSpan={2}>
                    <MDTypography variant="button" fontWeight="bold">
                      DETAILS OF MODIFICATION
                    </MDTypography>
                  </TableCell>
                  <TableCell align="center" colSpan={10}>
                    <TextField
                      disabled
                      fullWidth
                      id="outlined-name"
                      label="Details of modification"
                      value={detailsOfModification}
                      onChange={handleDetailsOfModification}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" colSpan={2}>
                    <MDTypography variant="button" fontWeight="bold">
                      TEST STANDARD
                    </MDTypography>
                  </TableCell>
                  <TableCell align="center" colSpan={10}>
                    edit data
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" colSpan={2}>
                    <MDTypography variant="button" fontWeight="bold">
                      TEST CONDITION AND METHOD
                    </MDTypography>
                  </TableCell>
                  <TableCell align="center" colSpan={10}>
                    edit data
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" colSpan={2}>
                    <MDTypography variant="button" fontWeight="bold">
                      TEST DURATION
                    </MDTypography>
                  </TableCell>
                  <TableCell align="center" colSpan={10}>
                    edit data
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" colSpan={2}>
                    <MDTypography variant="button" fontWeight="bold">
                      PARAMETER
                    </MDTypography>
                  </TableCell>
                  <TableCell align="center" colSpan={2}>
                    BEFORE TEST
                  </TableCell>
                  <TableCell align="center" colSpan={2}>
                    AFTER TEST
                  </TableCell>
                  <TableCell align="center" colSpan={2}>
                    BEFORE TEST RESULT
                  </TableCell>
                  <TableCell align="center" colSpan={4}>
                    AFTER TEST RESULT
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" colSpan={12}>
                    Component based parameter information
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left" colSpan={12}>
                    Photographs
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" colSpan={12}>
                    <MDTypography variant="button" fontWeight="bold">
                      AFTER TEST
                    </MDTypography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" colSpan={4}>
                    <MDTypography variant="button" fontWeight="bold">
                      N1
                    </MDTypography>
                  </TableCell>
                  <TableCell align="center" colSpan={4}>
                    <MDTypography variant="button" fontWeight="bold">
                      N2
                    </MDTypography>
                  </TableCell>
                  <TableCell align="center" colSpan={4}>
                    <MDTypography variant="button" fontWeight="bold">
                      N3
                    </MDTypography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" colSpan={12}>
                    Component pictures
                    <DropFileInput onFileChange={(files) => onFileChange(files)} uploadFile={uploadFile}/>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" colSpan={2}>
                    <MDTypography variant="button" fontWeight="bold">
                      OBSERVATION
                    </MDTypography>
                  </TableCell>
                  <TableCell align="center" colSpan={10}>
                    <TextField
                      disabled
                      fullWidth
                      id="outlined-name"
                      label="Observation"
                      value={observation}
                      onChange={handleObservation}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" colSpan={2}>
                    <MDTypography variant="button" fontWeight="bold">
                      ANALYSIS
                    </MDTypography>
                  </TableCell>
                  <TableCell align="center" colSpan={10}>
                    <TextField
                      disabled
                      fullWidth
                      id="outlined-name"
                      label="Analysis"
                      value={analysis}
                      onChange={handleAnalysis}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" colSpan={2}>
                    <MDTypography variant="button" fontWeight="bold">
                      RESULTS
                    </MDTypography>
                  </TableCell>
                  <TableCell align="center" colSpan={10}>
                    <TextField
                      disabled
                      fullWidth
                      id="outlined-name"
                      label="Result"
                      value={result}
                      onChange={handleResult}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" colSpan={6}>
                    TESTED BY
                  </TableCell>
                  <TableCell align="center" colSpan={6}>
                    VERIFIED BY
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </ThemeProvider>
      <MDBox mt={2}>
        <FinalReportButton />
      </MDBox>
    </div>
  );
}

export default ViewDailyReportTable;
