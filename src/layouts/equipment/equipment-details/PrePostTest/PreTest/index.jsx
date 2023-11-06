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
import { GET_POST_DATA } from "apis/queries";
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
    query: GET_POST_DATA,
    variables: { componentId: id },
  });
  useEffect(() => {
    if (preTestDetailsById.data) {
      console.log(JSON.parse(preTestDetailsById.data.crvtPostTestTableByComponentId.ptParameter));
      setParameters(JSON.parse(preTestDetailsById.data.crvtPostTestTableByComponentId.ptParameter));
    }
  }, [preTestDetailsById.data]);

  // const setMinValues = (event, index) => {
  //   console.log(parameters);
  //   let tempParameters = { ...parameters };
  //   tempParameters.parameters[index].value.min = event.target.value;
  //   setParameters(tempParameters);
  //   console.log(index);
  // };

  // const setMaxValues = (event, index) => {
  //   console.log(parameters);
  //   let tempParameters = { ...parameters };
  //   tempParameters.parameters[index].value.max = event.target.value;
  //   setParameters(tempParameters);
  //   console.log(index);
  // };

  const onCancel = () => {
    setShowInputs((prev) => !prev);
    rexPreTestDetailsById({ requestPolicy: "cache-and-network" });
  };
  return (
    <>
      <Card style={{ margin: "10px" }}>
        <MDTypography variant="h6" fontWeight="medium" marginLeft="20px" marginTop="20px">
          Pre Test configurations
        </MDTypography>
        <Grid p={2} container spacing={3}>
          {parameters &&
            parameters?.parameters?.map((val, i) => {
              return (
                <Grid item ml="20px" xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Grid>
                    <MDTypography
                      style={{ marginBottom:"6px",fontSize:"18px",display: "flex", justifyContent: "center", alignItems: "center" }}
                    >
                      {val.t_name}
                    </MDTypography>
                  </Grid>

                  <Grid></Grid>
                  <Grid container style={{ justifyContent: "left", alignContent: "center" }}>
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                      <Typography fontWeight="700" fontSize="14px" color="whitesmoke">
                        {val.p_name}
                      </Typography>
                    </Grid>
                    <Grid item mr={2} xs={12} sm={12} md={6} lg={6} xl={6}>
                      <Grid container justifyContent="space-around" alignItems="center">
                        <Grid Grid item xs={4} sm={4} md={2} lg={2} xl={2}>
                          <MDTypography
                            style={{
                              fontSize: "12px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#ffffff70",
                            }}
                          >
                            Initial
                          </MDTypography>
                        </Grid>
                        <Grid Grid item xs={4} sm={4} md={2} lg={2} xl={2}>
                          <MDTypography
                            style={{
                              fontSize: "12px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#ffffff70",
                            }}
                          >
                            min
                          </MDTypography>
                        </Grid>
                        <Grid Grid item xs={4} sm={4} md={2} lg={2} xl={2}>
                          <MDTypography
                            style={{
                              fontSize: "12px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#ffffff70",
                            }}
                          >
                            max
                          </MDTypography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  {val?.conditions?.map((val, i) => {
                    console.log(val)
                    return (
                      <Grid container justifyContent="left" alignItems="center">
                        <Grid item ml={2} xs={12} sm={12} md={3} lg={3} xl={3}>
                          <Typography fontWeight="500" fontSize="12px" color="whitesmoke">
                            {val.c_name} :
                          </Typography>
                        </Grid>
                        <Grid item mr={6} xs={12} sm={12} md={6} lg={6} xl={6}>
                          <Grid container justifyContent="space-around" alignItems="center">
                            <Grid item xs={4} sm={4} md={2} lg={2} xl={2}>
                              {showInputs ? (
                                <input style={{ height: "30px", width: "90%" }} />
                              ) : (
                                <MDTypography
                                  style={{
                                    background: "#394258",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: "4px",
                                    fontSize:"13px"

                                  }}
                                >
                                  {val.value.a_value}
                                </MDTypography>
                              )}
                            </Grid>
                            <Grid item xs={4} sm={4} md={2} lg={2} xl={2}>
                              {showInputs ? (
                                <input style={{ height: "30px", width: "90%" }} />
                              ) : (
                                <MDTypography
                                  style={{
                                    background: "#394258",
                                    display: "flex",
                                    justifyContent: "center",
                                    borderRadius: "4px",
                                    marginTop: "4px",
                                    fontSize:"13px"

                                  }}
                                >
                                {val.value.min}

                                </MDTypography>
                              )}
                            </Grid>
                            <Grid item xs={4} sm={4} md={2} lg={2} xl={2}>
                              {showInputs ? (
                                <input style={{ height: "30px", width: "90%" }} />
                              ) : (
                                <MDTypography
                                  style={{
                                    background: "#394258",
                                    display: "flex",
                                    justifyContent: "center",
                                    borderRadius: "4px",
                                    fontSize:"13px"
                                    
                                  }}
                                >
                                  {val.value.max}
                                </MDTypography>
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    );
                  })}
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
