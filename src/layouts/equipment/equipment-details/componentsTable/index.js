import MaterialTable from "material-table";
import { useSubscription, useMutation } from 'urql'
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
// import EditIcon from '@mui/icons-material/Edit';

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import EditIcon from '@mui/icons-material/Edit';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Grid } from "@mui/material";
import Divider from '@mui/material/Divider';
import RepeatedOperation from "../RepeatedOperation";
import ShowerTesting from "../ShowerTesting";
import ClimaticChamber from "../ClimaticChamber";
import ThermalShockChamber from "../ThermalShockChamber";
import Dust from "../Dust";
import Report from "../Report";

const getComponentName = `subscription {
    allComponents {
      nodes {
        componentid
        componentname
      }
    }
  }`

function ComponentsTable() {
    const [componentDetails, setComponentDetails] = useState([])
    const [detailsOpen, setDetailsOpen] = useState(false)
    const [formtitle, setFormtitle] = useState(null)
    const columns = [{ title: "Component", field: "componentname", editable: "never", defaultSort: 'asc' }];

    const [getComponent, getComponentResult] = useSubscription({
        query: getComponentName,
      })

      const { data: componentData, fetching: componentFetching, error: componentError } = getComponent

      useEffect(() => {
        if (componentData) setComponentDetails(componentData.allComponents.nodes)
        // setRowsPerPage(Object.keys(componentData).length)
      }, [componentData])

      const handleEdit = (rowdata) => {
        console.log(rowdata.componentname)
        setFormtitle(rowdata.componentname)
        // setTableWidth(30)
        setDetailsOpen(true)
      }
    
      const handleFormClose = () => {
        setDetailsOpen(false)
        // setTableWidth(98)
      }

      if (componentFetching) return <p>Loading Subscription...</p>
      if (componentError) return <p>Oh no... {componentError.message}</p>

      console.log("Component data", componentData)

    return (
        <Grid container spacing={3}>
        <Grid item xs={detailsOpen ? 3.5 : 12} md={detailsOpen ? 3.5 : 12} lg={detailsOpen ? 3.5 : 12} ml={2} mb={2} mr={detailsOpen ? 0 : 2}>
        <MaterialTable
          columns={columns}  
          data={componentDetails}  
          options={{
            // headerStyle: {backgroundColor: '#555555',color: '#FFF', width: '100%'}, 
            actionsColumnIndex: -1, 
            // pageSize: rowsPerPage, 
            pageSizeOptions: [13], 
            showTitle: false, 
            rowStyle: rowData => ({
              // backgroundColor: (rowData.tableData.id % 2 === 1) ? '#F7F7F7' : '#FFF',
              fontSize: '1rem'
              })
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
            {/* </div> */}
            <Grid item xs={8.1} md={8.1} lg={8.1}>
            {detailsOpen ? 
            <MDBox>
              <Card style={{ backgroundColor: 'transparent', shadowOpacity: 0, border: "none", boxShadow: "none" }}>
          <CardHeader
      action = {
          <IconButton
          // className={clsx(classes.expand, {
          //   [classes.expandOpen]: expanded,
          // })}
          onClick={handleFormClose}
          // aria-expanded={expanded}
          aria-label="show more"
        >
          <CloseIcon />
        </IconButton>
      }
      titleTypographyProps={{variant:'subtitle1' }}
      title={<MDTypography style={{fontSize: '1.2rem', fontWeight: 'bold', color: '#555555'}}>{formtitle}</MDTypography>}
    />
    <Divider variant="middle"/>
    <ClimaticChamber componentName = {formtitle} componentDetails={componentDetails} />
    <Dust componentName = {formtitle} componentDetails={componentDetails} />
    <RepeatedOperation componentName = {formtitle} componentDetails={componentDetails}/>
    <ShowerTesting componentName = {formtitle} componentDetails={componentDetails}/>
    <ThermalShockChamber componentName = {formtitle} componentDetails={componentDetails} />
    <Report componentName = {formtitle} componentDetails={componentDetails} />
    </Card>
            </MDBox>
          : null}
          </Grid>
          </Grid>
    )
}

export default ComponentsTable;