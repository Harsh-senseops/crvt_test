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
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import MDBox from 'components/MDBox';
import MDInput from 'components/MDInput';
import MDInputFormControl from 'components/MDInputFormControl';
import { CardActions } from '@mui/material';
import { useSubscription, useMutation } from 'urql'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import FormField from "layouts/pages/account/components/FormField";
import selectData from '../../selectData'
import {useSelector} from "react-redux";

const createThermalShockQry = `mutation createThermalShockChamberDetail( $Inpcomponentid:Int!, $Inpcold:Int!, $Inphot: Int!, $Inpcycletime:Int!, $Inptestduration: Int!, $Inptotalcycle: Int!) {
    createThermalShockChamberDetail(
      input: {thermalShockChamberDetail: {componentid: $Inpcomponentid, cold:$Inpcold, hot:$Inphot, cycletime: $Inpcycletime, testduration: $Inptestduration, totalcycle: $Inptotalcycle}}
    ) {
      clientMutationId
    }
  }`

  const thermalShockSubscription = `subscription {
    allThermalShockChamberDetails {
      nodes {
        cold
        componentid
        cycletime
        hot
        testduration
        totalcycle
      }
    }
  }`

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

export default function ThermalShockChamber(componentDataProp) {
  const [expanded, setExpanded] = React.useState(false);
  const [selected, setSelected] = useState(false);
  const [toggleEnable, setToggleEnable] = useState(false)
  const [repeatedOperationDetails, setRepeatedOperationDetails] = useState([])
  const [currentdata, setCurrentData] = useState([])
  const [dataSaved, setDataSaved] = useState(false)
  const [cycleTime, setCycleTime] = useState('');
  const [testDurationmin, setTestDurationmin] = useState('')
  const [testDurationmax, setTestDurationmax] = useState('')
  const [totalCycle, setTotalCycle] = useState('')
  const [equipmentDuration, setEquipmentDuration] = useState('')
  const [subheaderdata, setSubheaderData] = useState('')
  const [climaticChamberDetails, setClimaticChamberDetails] = useState([])
  const [thermalShockDetails, setThermalShockDetails] = useState([])
  const [cold, setCold] = useState('');
  const [hot, setHot] = useState('')
  const [testDuration, setTestDuration] = useState('')
  const classes = useStyles();
  const role = useSelector((store)=>{
    return store.userRoles
  });

  const [getThermalShock, getThermalShockResult] = useSubscription({
    query: thermalShockSubscription,
  })

  const { data: thermalShockData, 
    fetching: thermalShockFetching, 
    error: thermalShockError } = getThermalShock

    const [
        createThermalShockQryData,
        createThermalShockQryDataRecord,
      ] = useMutation(createThermalShockQry);

  // return current componentId
  const currentComponentId = (component) => {
    // console.log("component name in current component id", component)
    const filtered = component.componentDetails.filter(data => data.componentname === component.componentName)
    const obj = filtered[0] 
    return obj.componentid
  }

  const currentComponentThermalShockDetails = useCallback((component) => {
    const filtered = component.filter(data => data.componentid === currentComponentId(componentDataProp))
    console.log("Current component ro details", filtered)
    setCurrentData(filtered[0])
    return filtered[0]
  })

  const createClimaticChamberRecord = useCallback((data) => {
    createThermalShockQryDataRecord(data).then((result) => {
      if (result.error) {
        console.error("Oh no!", result.error);
        return false;
      }
        setDataSaved(true)
        return true;
    });
  });

  useEffect(() => {
    if (thermalShockData) setThermalShockDetails(thermalShockData.allThermalShockChamberDetails.nodes)
    currentComponentThermalShockDetails(thermalShockDetails)
    // setRowsPerPage(Object.keys(componentData).length)
  }, [thermalShockData])

  useEffect(() => {
    if(thermalShockDetails) {
      const filtered = thermalShockDetails.filter(data => data.componentid === currentComponentId(componentDataProp))
      console.log("Current component TC details", filtered[0])
      setCurrentData(filtered[0])
      if(filtered.length > 0) {
        setDataSaved(true)
      }
    }
  }, [thermalShockDetails])

  const handleChangeCold = (value) => {
    setCold(value);
  };

  const handleChangeHot = (value) => {
    setHot(value)
  }

  const handleChangeCycleTime = (value) => {
    setCycleTime(value)
  }

  const handleChangeTotalCycle = (value) => {
    setTotalCycle(value)
  }

  const handleTestDuration = (value) => {
    setTestDuration(value)
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault()
    // if(equipmentDuration && testDurationmax && testDurationmin && totalCycle && totalCycle && cycleTime === '') {
    //   setDataSaved(false)
    //   } else {
    //       setDataSaved(true)
    //   }
    const newdata = {
      Inpcomponentid: currentComponentId(componentDataProp),
      Inpcold: Number(cold),
      Inphot: Number(hot),
      Inpcycletime: Number(cycleTime),
      Inptestduration: Number(testDuration),
      Inptotalcycle: Number(totalCycle)
    }
    createClimaticChamberRecord(newdata)
  }  

  if (thermalShockFetching) return <p>Loading Subscription...</p>
  if (thermalShockError) return <p>Oh no... {thermalShockError.message}</p>

  return (
    <Card style={{marginTop: '2%'}}>
      <CardHeader
        action={
            <div>
            {role.roles === 3 && <MuiToggleButton style={{height: '30px', border: 'none'}}
             value="check"
             selected={!selected}
             selectedcolor="#BCE2BE"
             onChange={() => {
                 setSelected(!selected);
                 setToggleEnable(!toggleEnable)
             }}
             >
             <p style={{fontSize: '0.75rem', color: '#429D46', fontWeight: 'bold'}}>{toggleEnable ? "Disabled" : "Enabled"}</p>
             </MuiToggleButton>}
             <IconButton
             className={clsx(classes.expand, {
               [classes.expandOpen]: expanded,
             })}
             onClick={!toggleEnable ? handleExpandClick : null}
             aria-expanded={expanded}
             aria-label="show more"
           >
             <ExpandMoreIcon />
           </IconButton>
           
           </div>
        }
        title={<MDTypography variant="h6" fontWeight="medium">Thermal Shock Chamber</MDTypography>}
        subheader={dataSaved ? <MDTypography style={{color: 'green', fontSize: '14px', paddingTop: '1%'}}>Data saved</MDTypography> : <MDTypography style={{color: '#D9534F', fontSize: '14px', paddingTop: '1%'}}>No data saved</MDTypography>}
        // subheader={subheaderdata}
        />
      {!toggleEnable ? 
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <form onSubmit={(e) => handleFormSubmit(e)}>
        <CardContent>
          <MDBox pr={1}>
          <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={3}>
                <Autocomplete
                  defaultValue={currentdata ? currentdata.cold : cold}
                  disabled={currentdata ? true : null}
                  options={selectData.cycleTime}
                  onChange={(event, value) => handleChangeCold(value)}
                  renderInput={(params) => (
                    <FormField {...params} 
                      label="Cold" 
                      InputLabelProps={{ shrink: true }} 
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Autocomplete
                  defaultValue={currentdata ? currentdata.hot : hot}
                  disabled={currentdata ? true : null}
                  options={selectData.cycleTime}
                  onChange={(event, value) => handleChangeHot(value)}
                  renderInput={(params) => (
                    <FormField {...params} 
                    label="Hot" 
                    InputLabelProps={{ shrink: true }} 
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Autocomplete
                  defaultValue={currentdata ? currentdata.cycletime : cycleTime}
                  disabled={currentdata ? true : null}
                  options={selectData.cycleTime}
                  onChange={(event, value) => handleChangeCycleTime(value)}
                  renderInput={(params) => (
                    <FormField {...params} 
                    label="Cycle Time" 
                    InputLabelProps={{ shrink: true }} 
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Autocomplete
                  defaultValue={currentdata ? currentdata.totalcycle : totalCycle}
                  disabled={currentdata ? true : null}
                  options={selectData.cycleTime}
                  onChange={(event, value) => handleChangeTotalCycle(value)}
                  renderInput={(params) => (
                    <FormField {...params} 
                    label="Total Cycle" 
                    InputLabelProps={{ shrink: true }} 
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid  item xs={12} sm={12}>
          <Autocomplete
                  defaultValue={currentdata ? currentdata.testduration : testDuration}
                  disabled={currentdata ? true : null}
                  options={selectData.cycleTime}
                  onChange={(event, value) => handleTestDuration(value)}
                  renderInput={(params) => (
                    <FormField {...params} 
                    label="Test Duration" 
                    InputLabelProps={{ shrink: true }} 
                    />
                  )}
                />
          </Grid>
          </Grid>
          </MDBox>
        </CardContent>
        <CardActions className={classes.parentFlexRight}>
        {role.roles === 3 && <MDButton
                      variant="gradient" disabled={currentdata ? true : null} startIcon={<SaveAltIcon />}
                      color="dark" type="submit"
                      // onClick={!isLastStep ? handleNext : undefined}
                    >
                      {/* {isLastStep ? "send" : "next"} */}
                      Save
                    </MDButton>}
        </CardActions>
        </form>
      </Collapse> : null }
    </Card>
  );
}
