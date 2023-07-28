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
import "./index.css"

function ComponentsTable() {
  const [componentDetails, setComponentDetails] = useState([])
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [formtitle, setFormtitle] = useState(null)
  const columns = [
    {
      title: "Component",
      field: "partName",
      editable: "never",
      defaultSort: 'asc',

      headerStyle:
      {
        background: '#202940',
        color: "#FFF !important",
        borderRadius: "12px 0px 0px 12px",
        

      },
    }];
  const actionsCellStyle = {
    backgroundColor: '#202940',
    borderRadius: "0px 12px 12px 0px",
    color: 'white',
  };
  const [partId, setPartID] = useState("");

  const [getEquipment, getEquipmentResult] = useSubscription({
    query: EQUIPMENT_DETAILS
  })

  const { data: equipmentData, fetching: equipmentFetching, error: equipmentError } = getEquipment

  useEffect(() => {
    if (equipmentData) setComponentDetails(equipmentData.allComponentDetails.nodes)
  }, [equipmentData])

  const handleEdit = (rowdata) => {
    setFormtitle(rowdata.partName)
    setDetailsOpen(true)
    setPartID(rowdata.dustTestDetailsByPartName.nodes[0].partName)
  }
  const handleFormClose = () => {
    setDetailsOpen(false)
  }
  if (equipmentFetching) return <p style={{ color: "dark", fontWeight: "bold" }}>Loading Component...</p>
  if (equipmentError) return <p>Oh no... {equipmentError.message}</p>

  return (
    <Grid >
      {detailsOpen ?
        <Grid item xs={12} md={12} lg={12} ml={3} mr={3} mb={3}>
          <Card style={{ background: '#394259' }}>
            <MDBox>
              <Card style={{ backgroundColor: 'transparent', shadowOpacity: "10px", boxShadow: 'inherit', margin: "15px" }}>
                <CardHeader
                  action={
                    <IconButton
                      color="warning"
                      onClick={handleFormClose}
                      aria-label="show more"
                    >
                      <CloseIcon />
                    </IconButton>
                  }
                  titleTypographyProps={{ variant: 'subtitle1' }}
                  title={<MDTypography style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white' }}>{formtitle}</MDTypography>}
                />
                <Divider variant="middle" />
                <Dust componentName={formtitle} details={componentDetails} id={partId} />
                <OvenTest componentName={formtitle} details={componentDetails} id={partId} />
                <RepeatedOperation componentName={formtitle} details={componentDetails} id={partId} />
                <ShowerTesting componentName={formtitle} details={componentDetails} id={partId} />
                <ThermalShockChamber componentName={formtitle} details={componentDetails} id={partId} />
                <ThermalCycleTestDetail componentName={formtitle} details={componentDetails} id={partId} />
                <VibrationTest componentName={formtitle} details={componentDetails} id={partId} />
                {/* <Report componentName = {formtitle} componentDetails={componentDetails} /> */}
              </Card>
            </MDBox>
          </Card>
        </Grid> :
          <Grid ml={3} mb={3} mr={3} style={{ background: '#394259', borderRadius: 12 }} >
            <MaterialTable
              style={{ borderRadius: 12, background: '#394259', color: "white", borderBottom: "none" }}
              columns={columns}
              data={componentDetails}
              actions={[
                {
                  icon: () => <EditIcon
                  color="error" />,
                  tooltip: 'Edit machine data',
                  onClick: (event, rowdata) => { handleEdit(rowdata) }
                }
              ]}
              options={{
                lableRowsPerPage:"",
                pageSize: 10,
                actionsColumnIndex: -1,
                paginationType:'stepped',
                showFirstLastPageButtons: false,
                showFirstLastPageButtons: false,
                pageSizeOptions: [1],
                showTitle: false,
                rowStyle: rowData => ({ fontSize: '1.01rem', }),
                headerStyle: actionsCellStyle,
              }}
            />
          </Grid>
      }
    </Grid>
  )
}

export default ComponentsTable;