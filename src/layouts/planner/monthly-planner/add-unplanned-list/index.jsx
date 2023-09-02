import { useState, useEffect } from "react";
// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";
// @mui material components
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import FormField from "layouts/pages/account/components/FormField";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { Zoom } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FilterListIcon from "@mui/icons-material/FilterList";
import * as monthlyPlanner from "../../../../reduxSlices/monthlyPlanner";
import { useDispatch } from "react-redux";
import MDDialog from "components/MDDilouge";
import UnplannedListDetails from "./unplanned-details";
// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { useSelector } from "react-redux";
import Checkbox from "@mui/material/Checkbox";
import { useQuery, useMutation } from "urql";
import {
  ALL_COMPONENTS,
  ALL_DUST_YEARLY_PLANNER_BY_ID,
  ALL_OVEN_YEARLY_PLANNER_BY_ID,
  ALL_RO_YEARLY_PLANNER_BY_ID,
  ALL_SHOWER_YEARLY_PLANNER_BY_ID,
  ALL_THERMAL_CYCLE_YEARLY_PLANNER_BY_ID,
  ALL_THERMAL_SHOCK_YEARLY_PLANNER_BY_ID,
  ALL_VIBRATION_YEARLY_PLANNER_BY_ID,
  ADD_DUST_MONTHLY_PLANNER,
  ADD_OVEN_MONTHLY_PLANNER,
  ADD_RO_MONTHLY_PLANNER,
  ADD_SHOWER_MONTHLY_PLANNER,
  ADD_THERMAL_CYCLE_MONTHLY_PLANNER,
  ADD_THERMAL_SHOCK_MONTHLY_PLANNER,
  ADD_VIBRATION_MONTHLY_PLANNER,
  UPDATE_DUST_MONTHLY_PLANNER_BY_PART_CODE,
  UPDATE_OVEN_MONTHLY_PLANNER_BY_PART_CODE,
  UPDATE_RO_MONTHLY_PLANNER_BY_PART_CODE,
  UPDATE_SHOWER_MONTHLY_PLANNER_BY_PART_CODE,
  UPDATE_THERMAL_CYCLE_MONTHLY_PLANNER_BY_PART_CODE,
  UPDATE_THERMAL_SHOCK_MONTHLY_PLANNER_BY_PART_CODE,
  UPDATE_VIBRATION_MONTHLY_PLANNER_BY_PART_CODE,
  UPDATE_UNPLANNED_LIST,
} from "apis/queries";
import CircularProgress from "@mui/material/CircularProgress";
import Collapse from "@mui/material/Collapse";
import alertAndLoaders from "utils/alertAndLoaders";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
let names = [
  {
    name: "Dust",
    query: ALL_DUST_YEARLY_PLANNER_BY_ID,
    mutaionQuery: ADD_DUST_MONTHLY_PLANNER,
    updateQuery: UPDATE_DUST_MONTHLY_PLANNER_BY_PART_CODE,
  },
  {
    name: "Oven",
    query: ALL_OVEN_YEARLY_PLANNER_BY_ID,
    mutaionQuery: ADD_OVEN_MONTHLY_PLANNER,
    updateQuery: UPDATE_OVEN_MONTHLY_PLANNER_BY_PART_CODE,
  },
  {
    name: "RO",
    query: ALL_RO_YEARLY_PLANNER_BY_ID,
    mutaionQuery: ADD_RO_MONTHLY_PLANNER,
    updateQuery: UPDATE_RO_MONTHLY_PLANNER_BY_PART_CODE,
  },
  {
    name: "Shower",
    query: ALL_SHOWER_YEARLY_PLANNER_BY_ID,
    mutaionQuery: ADD_SHOWER_MONTHLY_PLANNER,
    updateQuery: UPDATE_SHOWER_MONTHLY_PLANNER_BY_PART_CODE,
  },
  {
    name: "Thermal Cycle",
    query: ALL_THERMAL_CYCLE_YEARLY_PLANNER_BY_ID,
    mutaionQuery: ADD_THERMAL_CYCLE_MONTHLY_PLANNER,
    updateQuery: UPDATE_THERMAL_CYCLE_MONTHLY_PLANNER_BY_PART_CODE,
  },
  {
    name: "Thermal Shock",
    query: ALL_THERMAL_SHOCK_YEARLY_PLANNER_BY_ID,
    mutaionQuery: ADD_THERMAL_SHOCK_MONTHLY_PLANNER,
    updateQuery: UPDATE_THERMAL_SHOCK_MONTHLY_PLANNER_BY_PART_CODE,
  },
  {
    name: "Vibration",
    query: ALL_VIBRATION_YEARLY_PLANNER_BY_ID,
    mutaionQuery: ADD_VIBRATION_MONTHLY_PLANNER,
    updateQuery: UPDATE_VIBRATION_MONTHLY_PLANNER_BY_PART_CODE,
  },
];
const today = new Date();
const currentDay = today.getDate();
const month = today.toLocaleString("default", { month: "long" });
const monthNames = [
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
  "January",
  "February",
  "March",
];

//For uture use only to set approptiate data and month.
// Condider testDuration, sevenDaysRunning.
// function getMonth(testDuration,sevenDaysRunning,) {
// }

function UnplannedListUpload() {
  const [show, setShow] = useState(false);
  const [dateValue, setDateValue] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [componentType, setComponentType] = useState("");
  const [partcode, setPartCode] = useState("");
  const [vendor, setVendor] = useState("");
  const [chambers, setChambers] = useState([]);
  const [compnentId, setComponetId] = useState(-1);
  const [details, setDetails] = useState([]);
  const [mutate, setMutate] = useState(null);
  const theme = useTheme();
  const [isDisabled, setIsDisabled] = useState(false);
  const [shouldPause, setShouldPause] = useState(true);
  const [allComponets] = useQuery({
    query: ALL_COMPONENTS,
    pause: shouldPause,
  });
  const [query, setQuery] = useState(`abc{abc}`);
  const [yearlyPlanner, rexYearlyPlanner] = useQuery({
    query: `query multipleQueries($id: Int) {
        ${query}
      }
        `,
    variables: { id: compnentId },
    pause: compnentId === -1 ? true : false,
  });

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const role = useSelector((store) => {
    return store.userRoles;
  });
  const [updateMutate, setUpdateMutate] = useState("");
  const monthlyPlannerStore = useSelector((store) => store.monthlyPlanner);
  const [resMutateMonthlyPlanner, mutateMonthlyPlanner] = useMutation(mutate);
  const [resUpdateMonthlyPlanner, updateMonthlyPlanner] = useMutation(UPDATE_UNPLANNED_LIST);

  const dispatch = useDispatch();
  let [componentList, setComponentList] = useState([]);

  useEffect(() => {
    if (!allComponets.data || componentList.length === 0) {
      setShouldPause(false);
    }
    if (allComponets.data) {
      allComponets.data.allCrvtComponentDetails.nodes.map((val) => {
        setComponentList((prev) => [...prev, val]);
      });
      setShouldPause(true);
    }
  }, [allComponets]);

  useEffect(() => {
    // console.log(yearlyPlanner);
    if (yearlyPlanner.data) {
      setDetails("");
      let { data } = yearlyPlanner;
      for (let key in data) {
        let chamberIndex = names.findIndex((val) =>
          key.toLowerCase().includes(val.name.toLowerCase().replace(/\s/g, ""))
        );
        if (data[key].nodes.length === 0) {
          // setIsDisabled(true);
          // alertAndLoaders(
          //   "UNSHOW_ALERT",
          //   dispatch,
          //   `The specified chamber is not present. ${names[chamberIndex].name}`,
          //   "warning"
          // );
          setDetails((prev) => [
            ...prev,
            {
              chamber: `${names[chamberIndex].name} Chamber is not assigned to  ${componentType.partName}`,
              partName: componentType.partName,
              partCode: partcode,
              vendor,
              status: 1,
              month: "",
            },
          ]);
        }
        if (data[key].nodes.length !== 0) {
          let yearlyPlan = JSON.parse(data[key].nodes[0].testDetails);
          let flag = true;
          let flag2 = true;
          let monthlyDetails = null;
          let chamberName = names[chamberIndex].name.toUpperCase();
          let monthlyChambers = monthlyPlannerStore.monthlyDetails[chamberName];
          for (let j = 0; j < monthlyChambers.length; j++) {
            if (
              monthlyChambers[j].partName === componentType.partName &&
              monthlyChambers[j].status === "Scheduled"
            ) {
              monthlyDetails = {
                details: monthlyChambers[j],
                partName: componentType.partName,
              };
            } else if (
              monthlyChambers[j].partName === componentType.partName &&
              monthlyChambers[j].status === ""
            ) {
              flag2 = false;
              setDetails((prev) => [
                ...prev,
                {
                  chamber: names[chamberIndex].name,
                  partName: componentType.partName,
                  partCode: partcode,
                  vendor,
                  status: 1,
                  month: month,
                  schdeuledComponentsDetails: {
                    monthlyDetails,
                  },
                },
              ]);
              break;
            }
          }
          if (flag2) {
            yearlyPlan.map((val, index) => {
              let [startMonth, startDay] = val.startDate.split("-");
              let [endMonth, endDay] = val.endMonth.split("-");
              let currentMonthIndex = monthNames.indexOf(month);
              let startMonthIndex = monthNames.indexOf(startMonth);
              let endMontIndex = monthNames.indexOf(endMonth);
              if (flag) {
                if (index === 0 && startMonthIndex > currentMonthIndex) {
                  flag = false;

                  setDetails((prev) => [
                    ...prev,
                    {
                      chamber: names[chamberIndex].name,
                      partName: componentType.partName,
                      partCode: partcode,
                      vendor,
                      status: 1,
                      month: month,
                      schdeuledComponentsDetails: {
                        monthlyDetails,
                        newMonth: yearlyPlan[index + 2].startDate.split("-")[0],
                      },
                    },
                  ]);
                } else if (
                  currentMonthIndex === startMonthIndex &&
                  Number(startDay) < Number(currentDay)
                ) {
                  flag = false;

                  setDetails((prev) => [
                    ...prev,
                    {
                      chamber: names[chamberIndex].name,
                      partName: componentType.partName,
                      partCode: partcode,
                      vendor,
                      status: 1,
                      month: endMonth,
                      schdeuledComponentsDetails: {
                        monthlyDetails,
                        newMonth: yearlyPlan[index + 2].startDate.split("-")[0],
                      },
                    },
                  ]);
                  console.log(yearlyPlan[index]);
                } else if (
                  currentMonthIndex === startMonthIndex &&
                  Number(startDay) > Number(currentDay)
                ) {
                  flag = false;
                  setDetails((prev) => [
                    ...prev,
                    {
                      chamber: names[chamberIndex].name,
                      partName: componentType.partName,
                      partCode: partcode,
                      vendor,
                      status: 1,
                      month: endMonth,
                      schdeuledComponentsDetails: {
                        monthlyDetails,
                        newMonth: yearlyPlan[index + 1].startDate.split("-")[0],
                      },
                    },
                  ]);
                  console.log(yearlyPlan);
                } else if (currentMonthIndex < startMonthIndex) {
                  setDetails((prev) => [
                    ...prev,
                    {
                      chamber: names[chamberIndex].name,
                      partName: componentType.partName,
                      partCode: partcode,
                      vendor,
                      status: 1,
                      month: endMonth,
                      schdeuledComponentsDetails: {
                        monthlyDetails,
                        newMonth: yearlyPlan[index + 1].startDate.split("-")[0],
                      },
                    },
                  ]);
                  console.log(yearlyPlan);
                  flag = false;
                }
              }
            });
          }
        }
      }
    }
  }, [yearlyPlanner, query]);
  // console.log(details);
  const handleChangeComponentType = (value) => {
    setComponentType(value);
  };

  const handleChangeChambers = (event, newValue) => {
    setChambers(newValue);
  };

  const handleClickOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPartCode("");
    setVendor("");
    setComponentType("");
    setChambers([]);
  };

  const handleUnplannedListSubmit = (e) => {
    e.preventDefault();
    // console.log("Form data", componentType, chambers);
  };
  useEffect(() => {
    dispatch(
      monthlyPlanner.setDate({
        year: new Date(dateValue).getFullYear(),
        month: new Date(dateValue).getMonth(),
      })
    );
    if (new Date(dateValue).getFullYear() >= 2012) {
      dispatch(monthlyPlanner.setShouldPause(false));
    }
  }, [dateValue]);
  const title = "Add unplanned inventory";
  const submitUnplanned = () => {
    if (chambers.length !== 0) {
      // setOpen(false);
      let index = componentList.findIndex((obj) => obj.partName === componentType.partName);
      let componentId = componentList[index].id;
      setComponetId(Number(componentId));
      // console.log(chambers);

      setQuery((prev) => {
        const queriesArray = chambers.map((chamber) => chamber.query);
        const combinedQuery = queriesArray.join("\n");
        return combinedQuery;
      });
    }
    if (
      chambers.length !== 0 &&
      componentType.length !== 0 &&
      partcode.length !== 0 &&
      vendor.length !== 0
    ) {
      setShow(true);
    } else {
      alertAndLoaders("UNSHOW_ALERT", dispatch, `Please fill all the details`, "warning");
    }
    // setChambers([])
    // setComponentType("")
  };

  const goBack = () => {
    setShow(false);
    // setChambers([]);
    // setQuery("abc{abc}");
    // setDetails("");
  };

  const saveData = () => {
    let flag = false;
    details.map((val) => {
      if (val.chamber.includes("not assigned")) {
        flag = true;
        // setIsDisabled(true)
        return;
      }
    });
    if (!flag) {
      updateMonthlyPlanner({
        details: JSON.stringify(details),
      }).then((res) => {
        if (res.data) {
          if (res.data.updateUnplannedList === "error") {
            alertAndLoaders("UNSHOW_ALERT", dispatch, `An Error occured`, "error");
          } else if (res.data.updateUnplannedList === "success")
            alertAndLoaders(
              "UNSHOW_ALERT",
              dispatch,
              `Successfully added unplanned list`,
              "success"
            );
        }
      });
      setOpen(false);
      setShow(false);
      setComponentType("");
      setPartCode("");
      setVendor("");
      setChambers([]);
      setDetails([]);
    } else {
      alertAndLoaders("UNSHOW_ALERT", dispatch, `Please Correct the data`, "warning");
    }
  };

  return (
    <MDBox position="relative" mb={5}>
      <Grid container spacing={2}>
        <Grid item xs={9} mt={2}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={3} mr={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  views={["year", "month"]}
                  label="Year and Month"
                  minDate={new Date("2012-03-01")}
                  maxDate={new Date("2024-03-01")}
                  value={dateValue}
                  onChange={setDateValue}
                  renderInput={(params) => (
                    <TextField disabled={true} {...params} error={false} helperText={null} />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={2}>
              <MDButton color="info" type="submit" startIcon={<FilterListIcon />}>
                Filter
              </MDButton>
            </Grid>
            <Grid item xs={12} sm={4}>
              <form onSubmit={handleClickOpen}>
                {role.roles === 3 && (
                  <MDButton color="info" type="submit" startIcon={<AddIcon />}>
                    Add unplanned list
                  </MDButton>
                )}
              </form>
            </Grid>
          </Grid>
        </Grid>
        <form onSubmit={(e) => handleUnplannedListSubmit(e)}>
          <MDDialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
            <Divider />
            {!show ? (
              <Zoom in={!show}>
                <DialogContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12} mr={3}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={4} justifyContent="flex-end">
                          <Box display="flex" justifyContent="flex-end" pt={2}>
                            <MDTypography variant="button" fontWeight="medium">
                              Component Type :
                            </MDTypography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                          <Autocomplete
                            defaultValue={componentType}
                            value={componentType}
                            options={componentList}
                            getOptionLabel={(option) => option.partName}
                            getOptionSelected={(option, value) => option.id === value.id}
                            onChange={(event, value) => handleChangeComponentType(value)}
                            renderInput={(params) => (
                              <FormField
                                {...params}
                                label="Select Component Type"
                                InputLabelProps={{ shrink: true }}
                              />
                            )}
                          />
                       
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} mr={3}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={4} justifyContent="flex-end">
                          <Box display="flex" justifyContent="flex-end" pt={2}>
                            <MDTypography variant="button" fontWeight="medium">
                              Part Code :
                            </MDTypography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                          <TextField
                            fullWidth
                            id="standard-basic"
                            label="Part Code"
                            variant="standard"
                            value={partcode}
                            onChange={(e) => setPartCode(e.target.value)}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} mr={3}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={4} justifyContent="flex-end">
                          <Box display="flex" justifyContent="flex-end" pt={2}>
                            <MDTypography variant="button" fontWeight="medium">
                              Vendor :
                            </MDTypography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                          <TextField
                            fullWidth
                            id="standard-basic"
                            label="Vendor"
                            variant="standard"
                            value={vendor}
                            onChange={(e) => setVendor(e.target.value)}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} mr={3}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={4} justifyContent="flex-end">
                          <Box display="flex" justifyContent="flex-end" pt={2}>
                            <MDTypography variant="button" fontWeight="medium">
                              Chambers :
                            </MDTypography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                          <Autocomplete
                            multiple
                            id="demo-multiple-name"
                            value={chambers}
                            onChange={handleChangeChambers}
                            options={names}
                            getOptionLabel={(option) => option.name}
                            renderOption={(props, option, { selected }) => (
                              <li {...props}>
                                <Checkbox checked={selected} />
                                {option.name}
                              </li>
                            )}
                            renderInput={(params) => (
                              <FormField
                                {...params}
                                label="Select chambers"
                                InputLabelProps={{ shrink: true }}
                              />
                            )}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </DialogContent>
              </Zoom>
            ) : (
              <UnplannedListDetails showElement={show} data={details} />
            )}
            <DialogActions>
              {show ? (
                <>
                  <MDButton onClick={goBack} color="warning">
                    Go Back
                  </MDButton>
                  <MDButton disabled={isDisabled} color="error" onClick={saveData}>
                    Save
                  </MDButton>
                </>
              ) : (
                <>
                  <MDButton onClick={handleClose} style={{ background: "#4c5365" }}>
                    Cancel
                  </MDButton>
                  <MDButton onClick={submitUnplanned} color="error" type="submit">
                    Submit
                  </MDButton>
                </>
              )}
            </DialogActions>
          </MDDialog>
        </form>
      </Grid>
    </MDBox>
  );
}

export default UnplannedListUpload;
