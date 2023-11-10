import * as React from "react";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { makeStyles } from "@mui/styles";
import { useMutation, useSubscription } from "urql";
import Grid from "@mui/material/Grid";
import { GET_POST_DATA, UPDATE_POST_TEST } from "apis/queries";
import {  useDispatch,useSelector } from "react-redux";
import alertAndLoaders from "utils/alertAndLoaders";
import { Typography } from "@mui/material";

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
  const [updatePostTest, updatePostTestResult] = useMutation(UPDATE_POST_TEST);
  
  const [preTestDetailsById, rexPreTestDetailsById] = useSubscription({
    query: GET_POST_DATA,
    variables: { componentId: id },
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (preTestDetailsById.data) {
      if(preTestDetailsById.data.crvtPostTestTableByComponentId?.ptParameter){
        setParameters(JSON.parse(preTestDetailsById.data.crvtPostTestTableByComponentId?.ptParameter));
      }
    }
  }, [preTestDetailsById.data]);

  const updateInput = (event, p_index, c_index) => {
    let tempObj = { ...parameters };
    tempObj.parameters[p_index].conditions[c_index].value.a_value = event.target.value;
    setParameters(tempObj);
  };

  const updateMax = (event, p_index, c_index) => {
    let tempObj = { ...parameters };
    tempObj.parameters[p_index].conditions[c_index].value.max = event.target.value;
    setParameters(tempObj);
  };

  const updateMin = (event, p_index, c_index) => {
    let tempObj = { ...parameters };
    tempObj.parameters[p_index].conditions[c_index].value.min = event.target.value;
    setParameters(tempObj);
  };

  const saveData = () => {
    let parametersVal = JSON.stringify(parameters);
    updatePostTestResult({
      componentId: id,
      ptParameter: parametersVal,
    }).then((res) => {
      console.log(res);
      if (res.data) {
        alertAndLoaders("UNSHOW_ALERT", dispatch, "Pre Test Values Are Saved... ", "success");
      } else if (res.error) {
        alertAndLoaders("UNSHOW_ALERT", dispatch, "Something Went Wrong... ", "error");
      }
    });
  };

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
       {parameters?<Grid p={2} container spacing={3}>
          {parameters &&
            parameters?.parameters?.map((val, p_index) => {
              return (
                <Grid item ml="20px" xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Grid>
                    <MDTypography
                      style={{marginBottom: "6px",fontSize: "18px",display: "flex",justifyContent: "center",alignItems: "center",
                      }}
                    >
                      {val.t_name}
                    </MDTypography>
                  </Grid>
                  <Grid container style={{ justifyContent: "left", alignContent: "center" }}>
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                      <Typography fontWeight="700" fontSize="14px" color="whitesmoke">
                        {val.p_name}
                      </Typography>
                    </Grid>
                  </Grid>
                  {val?.conditions?.map((val, c_index) => {
                    return (
                      <Grid container justifyContent="left" alignItems="center">
                        <Grid item ml={2} xs={12} sm={12} md={3} lg={3} xl={3}>
                          <Typography fontWeight="500" fontSize="12px" color="whitesmoke">
                            {val.c_name} :
                          </Typography>
                        </Grid>
                        <Grid item mr={6} xs={12} sm={12} md={6} lg={6} xl={6}>
                          <Grid container justifyContent="space-around" alignItems="center">
                            <Grid item style={{padding:val.value.min?"":"0px 30px"}} xs={4} sm={4} md={2} lg={val.value.min && val.value.max ? 2:12} xl={val.value.min && val.value.max  ? 2:12}>
                              {showInputs ? (
                                <input
                                  onChange={(event) => updateInput(event, p_index, c_index)}
                                  value={val.value.a_value}
                                  style={{ height: "30px", width: "90%" }}
                                />
                              ) : (
                               <>
                               <MDTypography
                            style={{fontSize: "12px",display: "flex",alignItems: "center",justifyContent: "center",color: "#ffffff70",
                            }}
                          >
                            Initial
                          </MDTypography>
                               
                                <MDTypography
                                                                   variant="h6" fontWeight="small" style={{ textAlign: "center", background: "#394259", padding: "6px 5px", borderRadius: "8px" }}

                                  >
                                  {val.value.a_value}
                                </MDTypography>
                                  </> 
                              )}
                            </Grid>
                           { val.value.min && val.value.max?<><Grid item xs={4} sm={4} md={2} lg={2} xl={2}>
                              {showInputs ? (
                                <input
                                onChange={(event) => updateMin(event, p_index, c_index)}
                                value={val.value.min}
                                style={{ height: "30px", width: "90%" }}
                                />
                              ) : (<>
                              <MDTypography
                                style={{fontSize: "12px",display: "flex",alignItems: "center",justifyContent: "center",color: "#ffffff70",
                                }}
                              >
                                min
                              </MDTypography>
                                <MDTypography
                                                                   variant="h6" fontWeight="small" style={{ textAlign: "center", background: "#394259", padding: "6px 5px", borderRadius: "8px" }}

                                >
                                  {val.value.min}
                                </MDTypography>
                                </>
                              )}
                            </Grid>
                            <Grid item xs={4} sm={4} md={2} lg={2} xl={2}>
                              {showInputs ? (
                                <input
                                onChange={(event) => updateMax(event, p_index, c_index)}
                                  value={val.value.max}
                                  style={{ height: "30px", width: "90%" }}
                                />
                              ) : (<>
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
                                <MDTypography
                                 variant="h6" fontWeight="small" style={{ textAlign: "center", background: "#394259", padding: "6px 5px", borderRadius: "8px" }}
                                  // style={{
                                  //   background: "#394258",
                                  //   display: "flex",
                                  //   justifyContent: "center",
                                  //   borderRadius: "4px",
                                  //   fontSize: "13px",
                                  // }}
                                >
                                  {val.value.max}
                                </MDTypography>
                                </>
                              )}
                            </Grid></>:""}
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
            <MDButton color="info" onClick={saveData}>
              Save
            </MDButton>
          </Grid>
        </Grid>: 
        <Grid style={{display:"flex",alignItems:"center",justifyContent:"center "}}>
          <MDTypography variant="h6"  style={{marginBottom:"20px", display:"flex",justifyContent:"center",alignItems:"center"}}>
             No Data Available
          </MDTypography>
        </Grid>}
      </Card>
    </>
  );
}
