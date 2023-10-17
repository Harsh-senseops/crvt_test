import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import Card from "@mui/material/Card";

import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { makeStyles } from "@mui/styles";
import MDBox from "components/MDBox";
import { useMutation, useQuery, useSubscription } from "urql";

import Grid from "@mui/material/Grid";
import { CREATE_PRE_TEST } from "apis/queries";
import { GET_PRE_DATA } from "apis/queries";
import { useSelector, useDispatch } from "react-redux";
import alertAndLoaders from "utils/alertAndLoaders";
import { UPDATE_PRE_TEST } from "apis/queries";
import { Box, TextField, Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    margin: "1%",
  },
  customSelect: {
    color: "#FFFF",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
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
}));

export default function PreTest({ id }) {
  const classes = useStyles();
  const [parameters, setParameters] = useState(null);
  const [showInputs, setShowInputs] = useState(false);
  const [preTestDetailsById, rexPreTestDetailsById] = useSubscription({
    query: GET_PRE_DATA,
    variables: { id },
  });
  useEffect(() => {
    if (preTestDetailsById.data) {
      setParameters(JSON.parse(preTestDetailsById.data.crvtPreTestTableByComponentId.parameters));
    }
  }, [preTestDetailsById]);

  const setMinValues = (event, index) => {
    console.log(parameters);
    let tempParameters = { ...parameters };
    tempParameters.parameters[index].value.min = event.target.value;
    setParameters(tempParameters);
    console.log(index);
  };

  const setMaxValues = (event, index) => {
    console.log(parameters);
    let tempParameters = { ...parameters };
    tempParameters.parameters[index].value.max = event.target.value;
    setParameters(tempParameters);
    console.log(index);
  };

  const onCancel = () => {
    setShowInputs((prev)=>!prev)
    rexPreTestDetailsById({requestPolicy:"cache-and-network"})
  }
  return (
    <>
      <Card style={{ margin: "10px" }}>
        <MDTypography variant="h6" fontWeight="medium" marginLeft="20px" marginTop="20px">
          Pre Test configurations
        </MDTypography>
        <Grid p={2} container spacing={3}>
          {parameters &&
            parameters.parameters.map((val, i) => {
              return (
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Grid container justifyContent="center" alignItems="center">
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                      <Typography></Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                      <Typography fontWeight="300" fontSize="12px" color="whitesmoke">
                        MIN
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                      <Typography fontWeight="300" fontSize="11px" color="whitesmoke">
                        MAX
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                      <Typography fontWeight="700" fontSize="14px" color="whitesmoke">
                        {val.name} :
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                      {showInputs ? (
                        <TextField
                          sx={{ width: "80%" }}
                          value={val.value.min}
                          onChange={(e) => setMinValues(e, i)}
                        />
                      ) : (
                        <Typography
                          textAlign="center"
                          fontWeight="700"
                          fontSize="16px"
                          color="whitesmoke"
                          sx={{ background: "#344767", width: "50%", borderRadius: "4px" }}
                        >
                          {val.value.min}
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                      {showInputs ? (
                        <TextField sx={{ width: "80%" }} value={val.value.max} onChange={(e) => setMaxValues(e, i)} />
                      ) : (
                        <Typography
                          textAlign="center"
                          fontWeight="700"
                          fontSize="16px"
                          color="whitesmoke"
                          sx={{ background: "#344767", width: "50%", borderRadius: "4px" }}
                        >
                          {val.value.max}
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              );
            })}
          <Grid gap={2} spacing={6} mt={3} container alignItems="flex-end" justifyContent="center">
            {showInputs ? (
              <MDButton color="info" onClick={onCancel}>
                Cancel
              </MDButton>
            ) : (
              <MDButton color="info" onClick={() => setShowInputs((prev) => !prev)}>
                Edit
              </MDButton>
            )}
            <MDButton color="info">Save</MDButton>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}