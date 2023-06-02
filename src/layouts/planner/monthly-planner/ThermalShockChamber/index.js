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
import MaterialTable from "material-table";

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

export default function ThermalShockChamber(dateValue) {
  const [expanded, setExpanded] = React.useState(false);
  const [selected, setSelected] = useState(false);
  const [toggleEnable, setToggleEnable] = useState(false)
  const classes = useStyles();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const columns = [
    { title: "Part Code", field: "partcode", editable: "never" },
    { title: "Part Name", field: "partname", editable: "never" },
    { title: "Vendor Name", field: "vendorname", editable: "never" },
    { title: "Plant Details", field: "plantdetails", editable: "never" },
    { title: "Test Type", field: "testtype", editable: "never" },
    { title: "Testing Plan", field: "testingplan", editable: "never" },
];

  console.log("Date value in RO", dateValue)

  return (
    <Card>
      <CardHeader
        action={
            <div>
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
        subheader={<MDTypography style={{color: 'green', fontSize: '14px', paddingTop: '1%'}}>0 components scheduled</MDTypography>}
        />
      {!toggleEnable ? 
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <MDBox pr={1}>
            <MaterialTable 
                columns={columns}
            />
          </MDBox>
        </CardContent>
      </Collapse> : null }
    </Card>
  );
}
