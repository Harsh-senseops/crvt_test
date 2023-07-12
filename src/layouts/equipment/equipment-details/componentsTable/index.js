import MaterialTable from "material-table";
import { useSubscription, useMutation, useQuery } from 'urql'
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import EditIcon from '@mui/icons-material/Edit';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Grid } from "@mui/material";
import Divider from '@mui/material/Divider';
import RepeatedOperation from "../RepeatedOperation";
import VibrationTest from "../VibrationTest";
import ShowerTesting from "../ShowerTesting";
import ThermalCycleTestDetail from "../ThermalCycleTest";
import ThermalShockChamber from "../ThermalShockChamber";
import Dust from "../Dust";
import { EQUIPMENT_DETAILS } from "apis/queries";
import OvenTest from "../OvenTest";



function ComponentsTable() {
    const [componentDetails, setComponentDetails] = useState([])
    const [detailsOpen, setDetailsOpen] = useState(false)
    const [formtitle, setFormtitle] = useState(null)
    const columns = [{ title: "Component", field: "partName", editable: "never", defaultSort: 'asc' }];
    const [partId,setPartID]  = useState("");
    

      const [getEquipment, getEquipmentResult] = useSubscription({
        query: EQUIPMENT_DETAILS
      })

      const { data: equipmentData, fetching: equipmentFetching, error: equipmentError} = getEquipment


      useEffect(()=>{
        if (equipmentData) setComponentDetails(equipmentData.allComponentDetails.nodes)
      },[equipmentData])

      const handleEdit = (rowdata) => {
        setFormtitle(rowdata.partName)
        setDetailsOpen(true)
       setPartID(rowdata.dustTestDetailsByPartName.nodes[0].partName)   
      }
    
      const handleFormClose = () => {
        setDetailsOpen(false)
      }
      
      if (equipmentFetching) return <p style={{color:"dark" ,fontWeight:"bold"}}>Loading Component...</p>
      if (equipmentError) return <p>Oh no... {equipmentError.message}</p>


    return (
        <Grid container spacing={3} >
        <Grid item xs={detailsOpen ? 3 : 12} md={detailsOpen ? 3 : 12} lg={detailsOpen ? 3 : 12} ml={2} mb={2} mr={detailsOpen ? 0 : 2} >
        <MaterialTable

          style={{borderRadius:12}}
          columns={columns}  
          data={componentDetails}  
          
          options={{
            lableRowsPerPage:'',
            pageSize: 10,
            actionsColumnIndex: -1, 
            showFirstLastPageButtons:false,
            showFirstLastPageButtons:false,
            pageSizeOptions: [1], 
            showTitle: false, 
            rowStyle: rowData => ({fontSize: '1.01rem',})
            

              }} 
          actions={!detailsOpen ? [
                {   
                    icon: () => <EditIcon />,
                    tooltip: 'Edit machine data',
                    onClick: (event, rowdata) => {handleEdit(rowdata)}
                }
            ] : null}
             />
            </Grid>
            <Grid item xs={8.1} md={8.1} lg={8.1}>
            {detailsOpen ? 
            <MDBox>
              <Card style={{ backgroundColor: 'transparent', shadowOpacity: 0, border: "none", boxShadow: "none" }}>
          <CardHeader
          action = {
          <IconButton
          
          onClick={handleFormClose}
          aria-label="show more"
        >
          <CloseIcon />
        </IconButton>
      }
      titleTypographyProps={{variant:'subtitle1' }}
      title={<MDTypography style={{fontSize: '1.2rem', fontWeight: 'bold', color: '#555555'}}>{formtitle}</MDTypography>}
    />
    {/* <Divider variant="middle"/> */}
    

      <Dust componentName = {formtitle} details={componentDetails}  id={partId} />
      <OvenTest componentName = {formtitle} details={componentDetails} id={partId} />
      <RepeatedOperation componentName = {formtitle} details={componentDetails} id={partId} />
      <ShowerTesting componentName = {formtitle} details={componentDetails} id={partId} />
      <ThermalShockChamber componentName={formtitle} details={componentDetails} id={partId} />
      <ThermalCycleTestDetail componentName={formtitle} details={componentDetails} id={partId} />
      <VibrationTest componentName = {formtitle} details={componentDetails} id={partId}/>
      
  
    {/* 
    <Report componentName = {formtitle} componentDetails={componentDetails} /> */}
      </Card>
            </MDBox>
          : null}
          </Grid>
          </Grid>
    )
}

export default ComponentsTable;