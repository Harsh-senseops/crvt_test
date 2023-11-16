import MaterialTable from "material-table";
import { useSubscription, useMutation, useQuery } from 'urql'
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import { TablePagination } from '@mui/material';
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
import PrePostTest from "../PrePostTest";
import { setShouldPause } from "reduxSlices/yearlyPlanner";
import MDLoader from "components/MDLoader";
import MDDialog from "components/MDDilouge";

function ComponentsTable() {
  const [componentDetails, setComponentDetails] = useState([])
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [formtitle, setFormtitle] = useState(null);
  const [pause, shouldPause] = useState(true);
  const [data, setData] = useState(false)
  const [open,setOpen]=useState(true)
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
      },
    }];

  const actionsCellStyle =
  {
    backgroundColor: '#202940',
    borderRadius: "0px 12px 12px 0px",
    color: 'white',
  };
  const [partId, setPartID] = useState("");

  const [getEquipment, getEquipmentResult] = useQuery({
    query: EQUIPMENT_DETAILS,
  })

  useEffect(() => {
    if (shouldPause) {
      setShouldPause(false);
    }
    if (getEquipment.data) {
      setComponentDetails(getEquipment.data.allCrvtComponentDetails?.nodes)
      setShouldPause(true)
      setData(true)
      setOpen(false)
    }
  }, [getEquipment.data, shouldPause])

  const handleEdit = (rowdata) => {
    setFormtitle(rowdata.partName)
    setDetailsOpen(true)
    setPartID(rowdata.crvtDustTestDetailsByPartName.nodes[0]?.partName)
  }
  const handleFormClose = () => {
    setDetailsOpen(false)
  }

  return (
    <Grid >
      {detailsOpen ?
        <Grid item xs={12} md={12} lg={12} ml={3} mr={3} mb={3}>
          <Card style={{ background: '#394259' }} >
            <MDBox >
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
                <PrePostTest details={componentDetails} id={partId} />
                <Dust componentName={formtitle} details={componentDetails} id={partId} />
                <OvenTest componentName={formtitle} details={componentDetails} id={partId} />
                <RepeatedOperation componentName={formtitle} details={componentDetails} id={partId} />
                <ShowerTesting componentName={formtitle} details={componentDetails} id={partId} />
                <ThermalCycleTestDetail componentName={formtitle} details={componentDetails} id={partId} />
                <ThermalShockChamber componentName={formtitle} details={componentDetails} id={partId} />
                <VibrationTest componentName={formtitle} details={componentDetails} id={partId} />
                {/* <Report componentName = {formtitle} componentDetails={componentDetails} /> */}
              </Card>
            </MDBox>
          </Card>
        </Grid> :
        <Grid ml={3} mb={3} mr={3} style={{ background: '#394259', borderRadius: 12 }} >
          {data ?
            <MaterialTable
              style={{ borderRadius: 12, background: '#394259', color: "white", borderBottom: "none" }}
              columns={columns}
              data={componentDetails}
              actions={[
                {
                  icon: () => <EditIcon
                    color="error" />,
                  tooltip: 'Edit chamber data',
                  onClick: (event, rowdata) => { handleEdit(rowdata) }
                }
              ]}
              options={{
                lableRowsPerPage: "",
                pageSize: 10,
                actionsColumnIndex: -1,
                paginationType: 'stepped',
                showFirstLastPageButtons: false,
                showFirstLastPageButtons: false,
                pageSizeOptions: [1],
                showTitle: false,
                rowStyle: rowData => ({ fontSize: '1.01rem', }),
                headerStyle: actionsCellStyle,
              }}
            /> :
            <MDDialog open={open}>
              <MDLoader/>
            </MDDialog>
          }
        </Grid>
      }
    </Grid>
  )
}
export default ComponentsTable;