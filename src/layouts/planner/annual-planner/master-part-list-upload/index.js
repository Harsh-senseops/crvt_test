import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import { useTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';

// reactstrap components
import {
  Form,
  CustomInput,
} from "reactstrap";
import * as XLSX from "xlsx";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";

// Material Dashboard 2 PRO React base styles
import breakpoints from "assets/theme/base/breakpoints";

import { useForm } from "react-hook-form";

// Images
import burceMars from "assets/images/bruce-mars.jpg";
import backgroundImage from "assets/images/bg-profile.jpeg";

function Masterpartlistupload({ children }) {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const { register, handleSubmit } = useForm();
  const [excelFileName, setExcelFileName] = useState("Choose File...");
  const [excelValue, setExcelValue] = useState("");
  const [excelFile, setExcelFile] = useState(null);
  const [excelFileError, setExcelFileError] = useState(null);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  const handleFileUpload = (e) => {
    setExcelValue(e.target.value);
    const fileTypesAllowed = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.oasis.opendocument.spreadsheet",
    ];

    const selectedFile = e.target.files[0];

    setExcelFileName(selectedFile.name);
    if (selectedFile) {
      const selectedFileType = selectedFile.type;
      if (fileTypesAllowed.includes(selectedFileType)) {
        const reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (event) => setExcelFile(event.target.result);
      } else {
        setExcelFileError("Please Select Excel Sheet");
      }
    } else {
      setExcelFile(null);
    }
  };

  const handleFileSubmit = (e) => {
    e.preventDefault();

    const workBook = XLSX.read(excelFile, { type: "buffer", cellDates: true });
    const workSheetName = workBook.SheetNames[0];
    const workSheet = workBook.Sheets[workSheetName];
    const dataXLSX = XLSX.utils.sheet_to_json(workSheet, {
      blankrows: false,
      defval: "",
    });
      const exceldataa = dataXLSX
    if (excelFileError) {
      console.log("Please select appropriate excel file")
    } else {
      console.log("Confirm submit")
    }
    setOpen(false);
  };

  const handleClickOpen = (e) => {
    e.preventDefault()
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const title = "Are you sure?"

  return (
    <MDBox position="relative" mb={5} mr={20}>
        <Grid container spacing={27} alignItems="center">
          <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
            <Form
              // style={{ textAlign: "left", display: "flex" }}
              onSubmit={e => handleClickOpen(e)}
            >
              <CustomInput
                type="file"
                name="formation-schedule"
                id="formation-schedule"
                label={excelFileName}
                onChange={handleFileUpload}
                accept=".xls, .xlsx"
                key={excelValue}
              />
              <MDButton
                color="info"
                type="submit"
                
              >
                  Upload
              </MDButton>
            </Form>
          </Grid>
          <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to upload the master part list?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <MDButton autoFocus onClick={handleClose}>
            Disagree
          </MDButton>
          <MDButton onClick={handleFileSubmit} autoFocus>
            Agree
          </MDButton>
        </DialogActions>
      </Dialog>
        </Grid>
        {children}
    </MDBox>
  );
}

// Setting default props for the Header
Masterpartlistupload.defaultProps = {
  children: "",
};

// Typechecking props for the Header
Masterpartlistupload.propTypes = {
  children: PropTypes.node,
};

export default Masterpartlistupload;
