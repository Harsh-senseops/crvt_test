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
import { CardActions,TextField } from '@mui/material';
import { useSubscription, useMutation,useQuery } from 'urql'

import Grid from "@mui/material/Grid";

import {useSelector} from "react-redux";
import { REPEATED_OPERATION_TEST_DETAILS } from 'apis/queries';
import { SAVE_REPEATED_OPERATION_DETAILS } from 'apis/queries';
import { ADD_REPEATED_OPERATION_STATUS } from 'apis/queries';
import { ADD_EQUIPMENT_UPDATE_HISTORY } from 'apis/queries';


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

export default function RepeatedOperation({details,componentName,id}) {
  const [expanded, setExpanded] = React.useState(false);
  const [selected, setSelected] = useState(false);
  const [toggleEnable, setToggleEnable] = useState(false)
  const [enabled, setEnabled] = useState(true)
  const [cycleTime, setCycleTime] = useState({ oldData: "", newData: "" });
  const [simultaneously, setSimultaneously] = useState({ oldData: "", newData: "" })
  const [testDurationMin, setTestDurationMin] = useState({ oldData: "", newData: "" })
  const [testDurationMax, setTestDurationMax] = useState({ oldData: "", newData: "" })
  const [oldData,setOldData]=useState("")
  const [totalCycle, setTotalCycle] = useState({ oldData: "", newData: "" })
  const [equipmentRunning, setEquipmentRunning] = useState({ oldData: "", newData: "" })
  const [sampleQty,setSampleQty]=useState({ oldData: "", newData: "" })
  const classes = useStyles();
  const role = useSelector((store)=>{
    return store.userRoles
  });
  const [saveRepeatedOperationDetailsRes,saveRepeatedOperationDetails] = useMutation(SAVE_REPEATED_OPERATION_DETAILS)
  const [repeatedOperationdeailsByID, rexDustDetailByID] = useSubscription({
    query: REPEATED_OPERATION_TEST_DETAILS,
    variables: { partName: id }
  })  
  const[repeatedOperationStatusRes,saveRepeatedOperationStatus]=useMutation(ADD_REPEATED_OPERATION_STATUS)
  const [equipmentHistoryRes, saveEquipmentHistory] = useMutation(ADD_EQUIPMENT_UPDATE_HISTORY)



  useEffect(() => {
    if (repeatedOperationdeailsByID.data) {
      let constValues = JSON.parse(repeatedOperationdeailsByID.data.repeatedOperationTestDetailByPartName.testDetails, "datadetails")
      setOldData({eName:constValues.name,running:constValues["7daysrunning"]})

      setTotalCycle({newData:constValues.total_cycle,oldData:constValues.total_cycle})
      setCycleTime({newData:constValues.cycle_time,oldData:constValues.cycle_time})
      setTestDurationMin({newData:constValues.test_duration_hr.min,oldData:constValues.test_duration_hr.min})
      setTestDurationMax({newData:constValues.test_duration_hr.max,oldData:constValues.test_duration_hr.max})
      setEquipmentRunning({newData:constValues.equipment_running,oldData:constValues.equipment_running})
      setSimultaneously({newData:constValues.simultaneously,oldData:constValues.simultaneously})
      setSampleQty({newData:constValues.sample_qty,oldData:constValues.sample_qty})

      
    }
    details.map((val)=>{
      let data=""
      if(val.partName == componentName){
        
          setToggleEnable(true)
          if(val.repeatedOperationTestDetailsByPartName.nodes.length !== 0){
            data = JSON.parse(val.repeatedOperationTestDetailsByPartName.nodes[0].testDetails)
          }
          setCycleTime({newData:data.cycle_time,oldData:data.cycle_time})
          setTestDurationMax({newData:data.test_duration_hr.max,oldData:data.test_duration_hr.max})
          setTestDurationMin({newData:data.test_duration_hr.min,oldData:data.test_duration_hr.min})

          setTotalCycle({newData:data.total_cycle,oldData:data.total_cycle})
          setSimultaneously({newData:data.simultaneously,oldData:data.simultaneously})
          setEquipmentRunning({newData:data.equipment_running,oldData:data.equipment_running})
          setSampleQty({newData:data.sample_qty,oldData:data.sample_qty})
        
          if(JSON.parse(val.repeatedOperationTestDetailsByPartName.nodes[0].status) === 1){
            setToggleEnable(true)
            setEnabled(true)

          }else{
            setToggleEnable(false)
            setEnabled(false)
          }  
      }
    })
  }, [details,repeatedOperationdeailsByID])
  
  const saveData = () =>{
   
   let data =  JSON.stringify({
    name:oldData.eName,
    cycle_time:parseInt(cycleTime.newData),
    total_cycle:parseInt(totalCycle.newData),
equipment_running:parseInt(equipmentRunning.newData),
simultaneously:parseInt(simultaneously.newData),
test_duration_hr:{min:parseInt(testDurationMin.newData),max:parseInt(testDurationMax.newData)},
"7daysrunning":oldData.running,
sample_qty:parseInt(sampleQty.newData)
    })

    saveRepeatedOperationDetails({
      testDetails:data,
      partName:id
    }).then((res)=>{
      if(res.data){
        let obj = {   "Cycle Time":cycleTime,
        "Total Cycle":totalCycle,
        "Equipment Running (Hour)":equipmentRunning,
        "Simultaneously":simultaneously,
        "Test Duration (Min)":testDurationMin,
        "Test Duration (Max)":testDurationMax,
        "Sample Quantity":sampleQty
          } 
          saveEquipmentHistory(
            {
              componentId: id,
              employeeCode: role.empCode,
              testType: "Repeated Operation Test",
              updateValues: handleCompare(obj)
            }
          ).then((res)=>{
            console.log(res);
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

  const toggleTrue=()=>{
    setEnabled(!enabled);

    saveRepeatedOperationStatus({
      partName:id,
      status:(!toggleEnable ? 1 : 0)
    }).then((res)=>{

    })
      
  }

  return (
    <>
    <Card style={{marginTop: '2%'}}>
      <CardHeader
        action={
            <div>
            {role.roles === 3 && <MuiToggleButton style={{height: '30px', border: 'none'}}
             value="check"
             selected={!selected}
             selectedcolor="#BCE2BE"
             onChange={toggleTrue}
             >
             <p style={{fontSize: '0.75rem', color: toggleEnable ? '#429D46':'#d50000', fontWeight: 'bold'}}>{toggleEnable ? "Enabled" : "Disabled"}</p>
             </MuiToggleButton>}
             <IconButton
             className={clsx(classes.expand, {
               [classes.expandOpen]: expanded,
             })}
             onClick={()=>setExpanded(!expanded)}
             aria-expanded={expanded}
             aria-label="show more"
           >
             <ExpandMoreIcon />
           </IconButton>
           </div>
        }
        title={<MDTypography variant="h6" fontWeight="medium">Repeated Operation</MDTypography>}
        subheader={toggleEnable ? <MDTypography style={{color: 'green', fontSize: '14px', paddingTop: '1%'}}> Repeated Operation is Enabled</MDTypography> : <MDTypography style={{color: '#D9534F', fontSize: '14px', paddingTop: '1%'}}>No Repeated Operation Test</MDTypography>}
        // subheader={subheaderdata}
        />
      
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <form onSubmit={(e) => handleFormSubmit(e)}>
        <CardContent>
          <MDBox pr={1}>
          
            <Grid container spacing={3}>
              <Grid item xs={12} sm={3}>
                <TextField 
                onChange={(e) => setCycleTime(prevData => ({
                  ...prevData,
                  newData: e.target.value
                }))}   
                disabled={role.roles === 1 || role.roles === 2 || !enabled} 
                value={cycleTime.newData}
                label="Cycle Time"
                />
              </Grid>
              <Grid item xs={12} sm={3}>
               
                <TextField 
                onChange={(e) => setTotalCycle(prevData => ({
                  ...prevData,
                  newData: e.target.value
                }))} 
                disabled={role.roles === 1 || role.roles === 2 || !enabled} 
                value={totalCycle.newData}
                label="Total Cycle"
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                
                <TextField 
                onChange={(e) => setTestDurationMax(prevData => ({
                  ...prevData,
                  newData: e.target.value
                }))}   
                disabled={role.roles === 1 || role.roles === 2 || !enabled} 
                value={testDurationMax.newData}
                label="Test Duration(Max)"
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                
                <TextField 
                onChange={(e) => setTestDurationMin(prevData => ({
                  ...prevData,
                  newData: e.target.value
                }))}   
                disabled={role.roles === 1 || role.roles === 2 || !enabled} 
                value={testDurationMin.newData}
                label="Test Duration(Min)"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                
                <TextField 
                onChange={(e) => setEquipmentRunning(prevData => ({
                  ...prevData,
                  newData: e.target.value
                }))}   
                disabled={role.roles === 1 || role.roles === 2 || !enabled} 
                value={equipmentRunning.newData}
                label="Equipment Running (Hour)"
                />
              </Grid>
              <Grid  item xs={12} sm={4}>
          
                <TextField 
                onChange={(e) => setSimultaneously(prevData => ({
                  ...prevData,
                  newData: e.target.value
                }))}   
                disabled={role.roles === 1 || role.roles === 2 || !enabled} 
                value={simultaneously.newData}
                label="Simultaneously"
                />
               </Grid>
                <Grid  item xs={12} sm={4}>
                
                      <TextField 
                      onChange={(e) => setSampleQty(prevData => ({
                        ...prevData,
                        newData: e.target.value
                      }))}   
                      disabled={role.roles === 1 || role.roles === 2 || !enabled} 
                      value={sampleQty.newData}
                      label="Sample Quantity"
                      />
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
                    </MDButton>:null}
        </CardActions>
        </form>
      </Collapse> 
    </Card>
    </>
  );
}
