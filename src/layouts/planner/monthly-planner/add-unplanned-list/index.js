import { useState, useEffect } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Icon from "@mui/material/Icon";
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import TextField from '@mui/material/TextField';
import Autocomplete from "@mui/material/Autocomplete";
import FormField from "layouts/pages/account/components/FormField";
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FilterListIcon from '@mui/icons-material/FilterList';


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
import RepeatedOperation from "../RepeatedOperation";
import ShowerTesting from "../ShowerTesting";
import ClimaticChamber from "../ClimaticChamber";
import ThermalShockChamber from "../ThermalShockChamber";
import Dust from "../Dust";
import selectData from "./selectData";
import {useSelector} from "react-redux";

function UnplannedListUpload({ children }) {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [dateValue, setDateValue] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const { register, handleSubmit } = useForm();
  const [excelFileName, setExcelFileName] = useState("Choose File...");
  const [excelValue, setExcelValue] = useState("");
  const [excelFile, setExcelFile] = useState(null);
  const [excelFileError, setExcelFileError] = useState(null);
  const [open, setOpen] = useState(false);
  const [componentType, setComponentType] = useState('')
  const [testingType, setTestingType] = useState('')
  const [partcode, setPartCode] = useState('')
  const [vendor, setVendor] = useState('')
  const [hmclLocation, setHmclLocation] = useState('')
  const [sampleRO, setSampleRO] = useState('')
  const [dust, setDust] = useState('')
  const [shower, setShower] = useState('')
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const role = useSelector((store)=>{
    return store.userRoles;
  })

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
    console.log("SelectedFileType: ", selectedFile.type);
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
      console.log("Excel dataa", exceldataa)

    if (excelFileError) {
      console.log("Please select appropriate excel file")
    } else {
      console.log("Confirm submit")
      // setAlert(
      //   <SweetAlert
      //     info
      //     showCancel
      //     title="Are You Sure?"
      //     onConfirm={confirmSubmit}
      //     onCancel={() => setAlert(null)}
      //     confirmBtnBsStyle="info"
      //     cancelBtnBsStyle="danger"
      //     confirmBtnText="Yes"
      //     cancelBtnText="No"
      //   />
      // );
    }
    setOpen(false);
  };

  const handleChangeComponentType = (value) => {
    setComponentType(value);
  };  

  const handleChangeTestingType = (value) => {
    setTestingType(value);
  };  

  const handleChangePartCode = (value) => {
    setPartCode(value);
  }

  const handleChangeVendor = (value) => {
    setVendor(value)
  }

  const handleChangeHMCLLocation = (value) => {
    setHmclLocation(value)
  }

  const handleChangeRO = (value) => {
    setSampleRO(value)
  }

  const handleChangeShower = (value) => {
    setShower(value)
  }

  const handleChangeDust = (value) => {
    setDust(value)
  }

  const handleClickOpen = (e) => {
    e.preventDefault()
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUnplannedListSubmit = (e) => {
    e.preventDefault()
    console.log("Form data",componentType, testingType, partcode, vendor, sampleRO, shower, dust)
  }

  const title = "Add unplanned inventory"

  return (
    <MDBox position="relative" mb={5}>
        <Grid container spacing={2}>
          <Grid item xs={9} mt={2}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={3} >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                    views={['year', 'month']}
                    label="Year and Month"
                    minDate={new Date('2012-03-01')}
                    maxDate={new Date('2023-06-01')}
                    value={dateValue}
                    onChange={setDateValue}
                    renderInput={(params) => <TextField {...params} helperText={null} />}
                    />
             </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={2}>
              <MDButton
                color="dark"
                type="submit"
                startIcon={<FilterListIcon />}
              >
                  Filter
              </MDButton>
              </Grid>
              <Grid item xs={12} sm={4}>
              <form onSubmit={handleClickOpen}>
                {role.roles === 3 && <MDButton
                color="dark"
                type="submit"
                startIcon={<AddIcon />}
              >
                  Add unplanned list
              </MDButton>}
              
              </form>
              </Grid>
            </Grid>
          </Grid>
          <form onSubmit={(e) => handleUnplannedListSubmit(e)}>
          <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {title}
        </DialogTitle>
        <Divider />
        <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}  justifyContent="flex-end">
              <Box display="flex" justifyContent="flex-end" pt={2}>
                <MDTypography variant="button" fontWeight="medium">Component Type :</MDTypography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={8}>
              <Autocomplete
                  defaultValue={componentType}
                //   disabled={currentdata ? true : null}
                  options={selectData.cycleTime}
                  onChange={(event, value) => handleChangeComponentType(value)}
                  renderInput={(params) => (
                    <FormField {...params} 
                      label="Select Component Type" 
                      InputLabelProps={{ shrink: true }} 
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}  justifyContent="flex-end">
              <Box display="flex" justifyContent="flex-end" pt={2}>
                <MDTypography variant="button" fontWeight="medium">Testing Type :</MDTypography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={8}>
              <Autocomplete
                  defaultValue={testingType}
                //   disabled={currentdata ? true : null}
                  options={selectData.testingType}
                  onChange={(event, value) => handleChangeTestingType(value)}
                  renderInput={(params) => (
                    <FormField {...params} 
                      label="Select Testing Type" 
                      InputLabelProps={{ shrink: true }} 
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}  justifyContent="flex-end">
              <Box display="flex" justifyContent="flex-end" pt={2}>
                <MDTypography variant="button" fontWeight="medium">Part Code :</MDTypography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={8}>
              <Autocomplete
                  defaultValue={partcode}
                //   disabled={currentdata ? true : null}
                  options={selectData.cycleTime}
                  onChange={(event, value) => handleChangePartCode(value)}
                  renderInput={(params) => (
                    <FormField {...params} 
                      label="Select Part Code" 
                      InputLabelProps={{ shrink: true }} 
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}  justifyContent="flex-end">
              <Box display="flex" justifyContent="flex-end" pt={2}>
                <MDTypography variant="button" fontWeight="medium">Vendor :</MDTypography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={8}>
              <Autocomplete
                  defaultValue={vendor}
                //   disabled={currentdata ? true : null}
                  options={selectData.cycleTime}
                  onChange={(event, value) => handleChangeVendor(value)}
                  renderInput={(params) => (
                    <FormField {...params} 
                      label="Select Vendor" 
                      InputLabelProps={{ shrink: true }} 
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}  justifyContent="flex-end">
              <Box display="flex" justifyContent="flex-end" pt={2}>
                <MDTypography variant="button" fontWeight="medium">No. of Sample RO :</MDTypography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={8}>
              <Autocomplete
                  defaultValue={sampleRO}
                //   disabled={currentdata ? true : null}
                  options={selectData.cycleTime}
                  onChange={(event, value) => handleChangeRO(value)}
                  renderInput={(params) => (
                    <FormField {...params} 
                      label="Select no. of Sample RO" 
                      InputLabelProps={{ shrink: true }} 
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}  justifyContent="flex-end">
              <Box display="flex" justifyContent="flex-end" pt={2}>
                <MDTypography variant="button" fontWeight="medium">No. of Sample Shower :</MDTypography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={8}>
              <Autocomplete
                  defaultValue={shower}
                //   disabled={currentdata ? true : null}
                  options={selectData.cycleTime}
                  onChange={(event, value) => handleChangeShower(value)}
                  renderInput={(params) => (
                    <FormField {...params} 
                      label="Select no. of Sample Shower" 
                      InputLabelProps={{ shrink: true }} 
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}  justifyContent="flex-end">
              <Box display="flex" justifyContent="flex-end" pt={2}>
                <MDTypography variant="button" fontWeight="medium">No. of Sample Dust :</MDTypography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={8}>
              <Autocomplete
                  defaultValue={dust}
                //   disabled={currentdata ? true : null}
                  options={selectData.cycleTime}
                  onChange={(event, value) => handleChangeDust(value)}
                  renderInput={(params) => (
                    <FormField {...params} 
                      label="Select no. of Sample Dust" 
                      InputLabelProps={{ shrink: true }} 
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}  justifyContent="flex-end">
              <Box display="flex" justifyContent="flex-end" pt={2}>
                <MDTypography variant="button" fontWeight="medium">Description :</MDTypography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={8}>
              <TextField
                    multiline
                    margin="dense"
                    id="description"
                    label="Description"
                    type="text"
                    fullWidth
                    variant="standard"
                />
              </Grid>
            </Grid>
          </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <MDButton onClick={handleClose} color='light'>
            Cancel
          </MDButton>
          <MDButton onClick={handleClose} color='success' type='submit'>
            Submit
          </MDButton>
        </DialogActions>
      </Dialog>
      </form>
        </Grid>
        <Grid mt={3} pt={2} pr={1} pl={1} pb={3} bgcolor='#F7F7F7' borderRadius={3}>
        <Box mb={2}>
          <ClimaticChamber  dateValue={dateValue}/>
        </Box>
        <Box mb={2}>
          <Dust dateValue={dateValue} />
        </Box>
        <Box mb={2}>
          <RepeatedOperation dateValue={dateValue}/>
        </Box>
        <Box mb={2}>
          <ShowerTesting dateValue={dateValue}/>
        </Box>
        <Box>
          <ThermalShockChamber dateValue={dateValue}/>
        </Box>
        </Grid>
    </MDBox>
    
  );
}

// Setting default props for the Header
UnplannedListUpload.defaultProps = {
  children: "",
};

// Typechecking props for the Header
UnplannedListUpload.propTypes = {
  children: PropTypes.node,
};

export default UnplannedListUpload;
