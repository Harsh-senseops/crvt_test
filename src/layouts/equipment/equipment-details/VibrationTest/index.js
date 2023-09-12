import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MDTypography from 'components/MDTypography';
import MDButton from 'components/MDButton';
import MuiToggleButton from '@mui/material/ToggleButton';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import MDBox from 'components/MDBox';
import { CardActions, TextField } from '@mui/material';
import { useSubscription, useMutation, useQuery } from 'urql'
import Grid from "@mui/material/Grid";
import { useSelector, useDispatch } from "react-redux";
import { SAVE_VIBRATION_DETAILS } from 'apis/queries';
import { VIBRATION_TEST_DETAILS } from 'apis/queries';
import { ADD_VIBRATION_STATUS } from 'apis/queries';
import { ADD_EQUIPMENT_UPDATE_HISTORY } from 'apis/queries';
import alertAndLoaders from 'utils/alertAndLoaders';



const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    margin: '1%'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  disabledTextField: {
    color: "gray",
    "& .MuiFormLabel-root": {
      color: "gray" // or black
    },

    // "& .MuiOutlinedInput-root": {
    //   "& fieldset": {
    //     borderColor: "yellow"
    //   }
    // },

    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "gray"
    },


  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 174,
  },
  formControltest: {
    // margin: theme.spacing(1),
    minWidth: 174,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  parentFlexRight: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: '2%',
    marginRight: '3%'
  },
}));

export default function VibrationTest({ details, componentName, id }) {
  const [expanded, setExpanded] = React.useState(false);
  const [selected, setSelected] = useState(false);
  const [toggleEnable, setToggleEnable] = useState(false)
  const [cycleTime, setCycleTime] = useState({ newData: "", oldData: "" });
  const [testDurationMin, setTestDurationMin] = useState({ newData: "", oldData: "" })
  const [testDurationMax, setTestDurationMax] = useState({ newData: "", oldData: "" })
  const [enabled, setEnabled] = useState(true)
  const [simultaneously, setSimultaneously] = useState({ newData: "", oldData: "" })
  const [frequencyMax, setFrequencyMax] = useState({ newData: "", oldData: "" });
  const [frequencyMin, setFrequencyMin] = useState({ newData: "", oldData: "" });
  const [acceleration, setAcceleration] = useState({ newData: "", oldData: "" })
  const [sampleQty, setSampleQty] = useState({ newData: "", oldData: "" });
  const [equipmentRunning, setEquipmentRunning] = useState({ newData: "", oldData: "" })
  const [oldData, setOldData] = useState("")
  const classes = useStyles();
  const role = useSelector((store) => {
    return store.userRoles
  });

  const dispatch = useDispatch();

  const [saveVibrationDetailsRes, saveVibrationDetails] = useMutation(SAVE_VIBRATION_DETAILS)
  const [vibrationdeailsByID, rexDustDetailByID] = useSubscription({
    query: VIBRATION_TEST_DETAILS,
    variables: { partName: id }
  })
  const [saveVibrationStatusRes, saveVibartionStatus] = useMutation(ADD_VIBRATION_STATUS)
  const [equipmentHistoryRes, saveEquipmentHistory] = useMutation(ADD_EQUIPMENT_UPDATE_HISTORY)


  useEffect(() => {

    if (vibrationdeailsByID.data) {
      let constValues = JSON.parse(vibrationdeailsByID.data.crvtVibrationTestDetailByPartName.testDetails, "datadetails")
      setOldData({ eName: constValues.name, running: constValues["7daysrunning"] })
      setFrequencyMax({ newData: constValues.frequency.max, oldData: constValues.frequency.max })
      setFrequencyMin({ newData: constValues.frequency.min, oldData: constValues.frequency.min })
      setTestDurationMin({ newData: constValues.test_duration_hr.min, oldData: constValues.test_duration_hr.min })
      setTestDurationMax({ newData: constValues.test_duration_hr.max, oldData: constValues.test_duration_hr.max })
      setEquipmentRunning({ newData: constValues.equipment_running, oldData: constValues.equipment_running })
      setSimultaneously({ newData: constValues.simultaneously, oldData: constValues.simultaneously })
      setCycleTime({ newData: constValues.cycle_time_sec, oldData: constValues.cycle_time_sec })
      setAcceleration({ newData: constValues.acceleration, oldData: constValues.acceleration })
      setSampleQty({ newData: constValues.sample_qty, oldData: constValues.sample_qty })

    }

    details.map((val) => {
      let data = ""
      if (val.partName == componentName) {

        setToggleEnable(true)
        if (val.crvtvibrationTestDetailsByPartName?.nodes?.length !== 0) {
          data = JSON.parse(val.crvtVibrationTestDetailsByPartName.nodes[0].testDetails)
        }

        setSampleQty({ newData: data.sample_qty, oldData: data.sample_qty })
        setFrequencyMin({ newData: data.frequency.min, oldData: data.frequency.min })
        setFrequencyMax({ newData: data.frequency.max, oldData: data.frequency.max })
        setAcceleration({ newData: data.acceleration, oldData: data.acceleration })
        setTestDurationMin({ newData: data.test_duration_hr.min, oldData: data.test_duration_hr.min })
        setTestDurationMax({ newData: data.test_duration_hr.max, oldData: data.test_duration_hr.max })
        setCycleTime({ newData: data.cycle_time_sec, oldData: data.cycle_time_sec })
        setEquipmentRunning({ newData: data.equipment_running, oldData: data.equipment_running })
        setSimultaneously({ newData: data.simultaneously, oldData: data.simultaneously })

        if (JSON.parse(val.crvtVibrationTestDetailsByPartName?.nodes[0]?.status) === 1) {
          setToggleEnable(true)
          setEnabled(true)
        } else {
          setToggleEnable(false)
          setEnabled(false)
        }
      }
    })
    if(vibrationdeailsByID.data){
      let data=vibrationdeailsByID.data.crvtVibrationTestDetailByPartName.status
      setToggleEnable(data === 1 ? true: false)
      setEnabled(data === 1 ? true: false)
    }
    // console.log(vibrationdeailsByID.data.crvtVibrationTestDetailByPartName.status)
  }, [details, vibrationdeailsByID])


  const saveData = () => {

    let data = JSON.stringify({
      name: oldData.eName,
      equipment_running: parseInt(equipmentRunning.newData),
      acceleration: parseInt(acceleration.newData),
      simultaneously: parseInt(simultaneously.newData),
      cycle_time_sec: parseInt(cycleTime.newData),
      test_duration_hr: { min: parseInt(testDurationMin.newData), max: parseInt(testDurationMax.newData) },
      frequency: { min: parseInt(frequencyMin.newData), max: parseInt(frequencyMax.newData) },

      "7daysrunning": oldData.running,
      sample_qty: parseInt(sampleQty.newData)
    })


    saveVibrationDetails({
      testDetails: data,
      partName: id
    }).then((res) => {
      if (res.data) {
        let obj = {
          "Acceleration (G)": acceleration,
          "Cycle Time": cycleTime,
          "Frequency Min(Hz)": frequencyMin,
          "Frequency Max(Hz)": frequencyMax,
          "Equipment Running (hr)": equipmentRunning,
          "Simultaneously": simultaneously,
          "Test Duration (hr min)": testDurationMin,
          "Test Duration (hr max)": testDurationMax,
          "Sample Quantity": sampleQty
        }
        saveEquipmentHistory(
          {
            componentId: id,
            employeeCode: role.empCode,
            testType: "Vibration Test",
            updateValues: handleCompare(obj)
          }
        ).then((res) => {
          alertAndLoaders("UNSHOW_ALERT", dispatch, "Vibration Test Details Are Saved... ", "success")
        })
      }

    })
  }

  const handleCompare = (obj) => {
    let newObj = {}
    for (let key in obj) {
      if (obj[key].newData !== obj[key].oldData) {
        newObj[key] = obj[key].newData
      }
    }
    return JSON.stringify(newObj);
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
  }
  const toggleTrue = () => {

    saveVibartionStatus({
      partName: id,
      status: (!toggleEnable ? 1 : 0)

    }).then((res) => {
      toggleEnable ? alertAndLoaders("UNSHOW_ALERT", dispatch, "Vibration Test Is Disabled... ", "warning") : alertAndLoaders("UNSHOW_ALERT", dispatch, "Vibartion Test Is Enabled... ", "success")
    })
  }

  return (
    <>
      <Card style={{ marginTop: '2%' }}>
        <CardHeader
        onClick={() => setExpanded(!expanded)}
        sx={{
          transition: "all 250ms",
          ":hover": {
              boxShadow: 20,
              cursor: 'pointer',
              backgroundColor: "#384158 !important",
              borderRadius: "10px",
              transform: "scale(1.02)",
          },
      }}
          action={
            <div>
              {role.roles === 3 && <MuiToggleButton style={{ height: '30px', border: 'none', background: toggleEnable ? "green" : "red" }}
                value="check"
                selected={!selected}
                selectedcolor="#BCE2BE"
                onChange={toggleTrue}
              >
                <p style={{ fontSize: '0.75rem', color: 'white', fontWeight: 'bold' }}>{toggleEnable ? "Enabled" : "Disabled"}</p>
              </MuiToggleButton>}

              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                // onClick={() => setExpanded(!expanded)}
                aria-expanded={expanded}
                aria-label="show more"
                color='info'

              >
                <ExpandMoreIcon />
              </IconButton>

            </div>
          }
          title={<MDTypography variant="h6" fontWeight="medium">Vibration Test</MDTypography>}
          subheader={toggleEnable ? <MDTypography style={{ color: 'lime', fontSize: '14px', paddingTop: '1%' }}>Vibration Test is Enabled</MDTypography> : <MDTypography style={{ color: 'red', fontSize: '14px', paddingTop: '1%' }}>No Vibration Test</MDTypography>}
        // subheader={subheaderdata}
        />
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <form onSubmit={(e) => handleFormSubmit(e)}>
            <CardContent>
              <MDBox pr={1}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={3}>

                        <TextField
                          onChange={(e) => setFrequencyMin(prevData => ({
                            ...prevData,
                            newData: e.target.value
                          }))}
                          sx={{
                            "& .MuiInputBase-input.Mui-disabled": {
                              WebkitTextFillColor: "gray",
                            },
                          }}
                          // disabled={role.roles === 1 || role.roles === 2 || !enabled}
                          className={toggleEnable ? "" : classes.disabledTextField}

                          value={frequencyMin.newData}
                          label="Frequency Min(Hz)"
                        />
                      </Grid>
                      <Grid item xs={12} sm={3}>

                        <TextField
                          onChange={(e) => setFrequencyMax(prevData => ({
                            ...prevData,
                            newData: e.target.value
                          }))}
                          sx={{
                            "& .MuiInputBase-input.Mui-disabled": {
                              WebkitTextFillColor: "gray",
                            },
                          }}
                          // disabled={role.roles === 1 || role.roles === 2 || !enabled}
                          className={toggleEnable ? "" : classes.disabledTextField}

                          value={frequencyMax.newData}
                          label="Frequency Max(Hz)"
                        />
                      </Grid>
                      <Grid item xs={12} sm={3}>

                        <TextField
                          onChange={(e) => setAcceleration(prevData => ({
                            ...prevData,
                            newData: e.target.value
                          }))}
                          sx={{
                            "& .MuiInputBase-input.Mui-disabled": {
                              WebkitTextFillColor: "gray",
                            },
                          }}
                          // disabled={role.roles === 1 || role.roles === 2 || !enabled}
                          className={toggleEnable ? "" : classes.disabledTextField}

                          value={acceleration.newData}
                          label="Acceleration (G)"
                        />
                      </Grid>
                      <Grid item xs={12} sm={3}>

                        <TextField
                          onChange={(e) => setTestDurationMax(prevData => ({
                            ...prevData,
                            newData: e.target.value
                          }))}
                          sx={{
                            "& .MuiInputBase-input.Mui-disabled": {
                              WebkitTextFillColor: "gray",
                            },
                          }}
                          // disabled={role.roles === 1 || role.roles === 2 || !enabled}
                          className={toggleEnable ? "" : classes.disabledTextField}

                          value={testDurationMax.newData}
                          label="Test Duration (hr max)"
                        />
                      </Grid>
                      <Grid item xs={12} sm={3}>

                        <TextField
                          onChange={(e) => setTestDurationMin(prevData => ({
                            ...prevData,
                            newData: e.target.value
                          }))}
                          sx={{
                            "& .MuiInputBase-input.Mui-disabled": {
                              WebkitTextFillColor: "gray",
                            },
                          }}
                          // disabled={role.roles === 1 || role.roles === 2 || !enabled}
                          className={toggleEnable ? "" : classes.disabledTextField}
                          value={testDurationMin.newData}
                          label="Test Duration(hr min)"
                        />
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <TextField
                          onChange={(e) => setCycleTime(prevData => ({
                            ...prevData,
                            newData: e.target.value
                          }))}
                          sx={{
                            "& .MuiInputBase-input.Mui-disabled": {
                              WebkitTextFillColor: "gray",
                            },
                          }}
                          // disabled={role.roles === 1 || role.roles === 2 || !enabled}
                          className={toggleEnable ? "" : classes.disabledTextField}

                          value={cycleTime.newData}
                          label="Cycle Time"
                        />
                      </Grid>
                      <Grid item xs={12} sm={3}>

                        <TextField
                          onChange={(e) => setEquipmentRunning(prevData => ({
                            ...prevData,
                            newData: e.target.value
                          }))}
                          sx={{
                            "& .MuiInputBase-input.Mui-disabled": {
                              WebkitTextFillColor: "gray",
                            },
                          }}
                          // disabled={role.roles === 1 || role.roles === 2 || !enabled}
                          className={toggleEnable ? "" : classes.disabledTextField}

                          value={equipmentRunning.newData}
                          label="Equipment Running (hr)"
                        />
                      </Grid>
                      <Grid item xs={12} sm={3}>

                        <TextField
                          onChange={(e) => setSimultaneously(prevData => ({
                            ...prevData,
                            newData: e.target.value
                          }))}
                          sx={{
                            "& .MuiInputBase-input.Mui-disabled": {
                              WebkitTextFillColor: "gray",
                            },
                          }}
                          // disabled={role.roles === 1 || role.roles === 2 || !enabled}
                          className={toggleEnable ? "" : classes.disabledTextField}

                          value={simultaneously.newData}
                          label="Simultaneously"
                        />
                      </Grid>
                      <Grid item xs={12} sm={3}>

                        <TextField
                          onChange={(e) => setSampleQty(prevData => ({
                            ...prevData,
                            newData: e.target.value
                          }))}
                          sx={{
                            "& .MuiInputBase-input.Mui-disabled": {
                              WebkitTextFillColor: "gray",
                            },
                          }}
                          // disabled={role.roles === 1 || role.roles === 2 || !enabled}
                          className={toggleEnable ? "" : classes.disabledTextField}

                          value={sampleQty.newData}
                          label="Sample Quantity"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </MDBox>
            </CardContent>
            <CardActions className={classes.parentFlexRight}>
              {role.roles === 3 ? <MDButton
                color="dark" type="submit"
                onClick={saveData}
                disabled={!enabled}
              >
                Save
              </MDButton> : null}
            </CardActions>
          </form>
        </Collapse>
      </Card>

    </>
  );
}
