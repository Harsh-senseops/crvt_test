import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";
import { Typography } from "@mui/material";
import MDButton from "components/MDButton";
import { makeStyles } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import { CardHeader, TextField } from "@mui/material";
import { useMutation, useQuery, useSubscription } from "urql";
import alertAndLoaders from "utils/alertAndLoaders";
import Grid from "@mui/material/Grid";
import { GET_POST_DATA, UPDATE_PRE_RESULT, GET_ALL_PRE_DETAILS_BY_PARTCODE } from "apis/queries";
import { setNoOfSamples,setIsSampleTrue } from "reduxSlices/prePost";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    margin: "1%",
  },
  disabledTextField: {
    color: "gray",
    "& .MuiFormLabel-root": {
      color: "gray", // or black
    },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "gray",
    },
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
  parentFlexRight: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "2%",
    marginRight: "3%",
  },
}));

function isValueNull(obj, noOFSamples, str) {
  let objLen = Object.keys(obj);
  let newObj = {};
  let isEmpty = false;
  objLen.map((keys) => {
    if (obj[keys] === "") {
      isEmpty = true;
    }
  });

  if (isEmpty || noOFSamples !== objLen.length) {
    // console.log("ran");
    objLen.map((keys) => {
      newObj[keys] = str;
    });
    return { isEmpty, newObj };
  }
  return {
    isEmpty,
  };
}

function PreResult({ Id, partCode }) {
  const [parameters, setParameters] = useState("");
  const [show, setShow] = React.useState(false);
  const [pData, setPdata] = useState(false);
  const [values, setValues] = useState("");
  const [newValues, setNewValues] = useState(null);

  const prePostStore = useSelector((store) => {
    return store.prePost;
  });
  const classes = useStyles();

  const [postTableData, rexPostTableData] = useQuery({
    query: GET_POST_DATA,
    variables: { componentId: Id },
  });

  const [preTableDataByPartId, rexPreDataByPartId] = useSubscription({
    query: GET_ALL_PRE_DETAILS_BY_PARTCODE,
    variables: { partCode },
  });

  const [storePreDetailsRes, storePreDetails] = useMutation(UPDATE_PRE_RESULT);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      postTableData.data &&
    //   prePostStore.noOFSamples.length !== 0 &&
      !newValues &&
      preTableDataByPartId.data
    ) {
      if (preTableDataByPartId.data?.crvtPreResultTableByPartCode?.prResParameter) {
        setParameters(
          JSON.parse(preTableDataByPartId.data?.crvtPreResultTableByPartCode?.prResParameter)
        );
        // console.log(parameters)
        dispatch(setIsSampleTrue(false))
      } else {
        if (postTableData.data.crvtPostTestTableByComponentId?.ptParameter) {
            // console.log("I from amigo")
            dispatch(setIsSampleTrue(true))
            if(!prePostStore.noOFSamples || prePostStore.noOFSamples.length !== 0){
                dispatch(setIsSampleTrue(false))
            }
          setPdata(true);
          let tempArray = {
            ...JSON.parse(postTableData.data.crvtPostTestTableByComponentId?.ptParameter),
          };
          tempArray.parameters.map((val1) => {
            val1.conditions.map((c_val) => {
              c_val.value = [];
              if(prePostStore.noOFSamples !== null){
              prePostStore.noOFSamples.map((val) => {
                c_val.value.push({ a_value: "N/A" });
              })};
            });
          });
          setParameters(tempArray);      
        } else {
          setPdata(false);
        }
      }
    }
  }, [postTableData.data, prePostStore.noOFSamples, preTableDataByPartId.data]);

  const handleValues = (e, pindex, cindex, c_valuesIndex) => {
    e.preventDefault();
    let tempObj = { ...parameters };
    tempObj.parameters[pindex].conditions[cindex].value[c_valuesIndex].a_value = e.target.value;
    setParameters(tempObj);
    setNewValues(true);
  };
  const saveValues = () => {
    let data = JSON.stringify(parameters);
    storePreDetails({
      partCode,
      prResParameter: data,
    }).then((res) => {
      // console.log(res);
      // console.log(res);
      if (res.data) {
        alertAndLoaders("UNSHOW_ALERT", dispatch, "Pre Test Results Are Saved... ", "success");
      }
      if (res.error) {
        console.log(res.error)
      }
    });
    // alert("Data saved");
  };

  const onCancel = () => {
    setShow((prev) => !prev);
  };

  const onEdit = () => {
    setShow((prev) => !prev);
  };
  return (
    <>
      <Card style={{ margin: "12px" }}>
        <Grid m={2}>
          <MDTypography variant="h6" fontWeight="medium">
            Pre Test Values
          </MDTypography>
        </Grid>
        <Grid>
          
          {!parameters ?  <MDTypography variant="h6" fontWeight="medium" style={{display:"flex",justifyContent:"center",alignItems:"center",marginBottom:"10px"}}>
           No details found
          </MDTypography> :
          <Grid>
            {  parameters?.parameters?.map((pval, pindex) => {
              return (
                  <Grid key={pindex} item ml="20px" xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Grid container style={{ justifyContent: "left", alignContent: "center" }}>
                    <Grid item xs={12} sm={12} md={3} lg={6} xl={6}>
                      <Typography marginTop={2} fontWeight="700" fontSize="14px" color="whitesmoke">
                        {pval.p_name}
                      </Typography>
                    </Grid>
                  </Grid>
                  {pval &&
                    pval.conditions.map((cval, cindex) => {
                      return (
                        <>
                          <Grid key={cindex} container lg={12}>
                            <Grid
                              sx={{ display: "flex", alignItems: "center" }}
                              item
                              ml={2}
                              xs={3}
                              sm={3}
                              md={3}
                              lg={3}
                              xl={3}
                            >
                              <Typography
                                display="flex"
                                alignItems="center"
                                fontWeight="500"
                                fontSize="12px"
                                color="whitesmoke"
                              >
                                {cval.c_name} :
                              </Typography>
                            </Grid>
                            <Grid
                              ml={2}
                              lg={8}
                              marginBottom={2}
                              style={{ display: "flex", justifyContent: "space-between" }}
                            >
                              {cval.value.map((c_values, c_valuesIndex) => {
                                return (
                                  <Grid key={c_valuesIndex}>
                                    <Grid
                                      margin="0px 30px"
                                      display="flex"
                                      justifyContent="center"
                                      alignItems="center"
                                      sm={3}
                                      xs={12}
                                      lg={12}
                                    >
                                      {show ? (
                                        <TextField
                                          value={c_values.a_value === "N/A" ? "" : c_values.a_value}
                                          // value={values}
                                          onChange={(e) =>
                                            handleValues(e, pindex, cindex, c_valuesIndex)
                                          }
                                        />
                                      ) : (
                                        <MDTypography
                                          variant="h6"
                                          fontWeight="small"
                                          style={{
                                            textAlign: "center",
                                            background: "#394259",
                                            padding: "10px 25px",
                                            borderRadius: "8px",
                                          }}
                                        >
                                          {c_values.a_value  === "" ?"N/A":c_values.a_value}
                                        </MDTypography>
                                      )}
                                    </Grid>
                                  </Grid>
                                );
                              })}
                            </Grid>
                          </Grid>
                        </>
                      );
                    })}
                   
                </Grid>
                
              );
            })}
            <Grid className={classes.parentFlexRight}>
                {!show ? (
                  <MDButton color="info" onClick={onEdit}>
                    Edit
                  </MDButton>
                ) : (
                  <div style={{ display: "flex", gap: "15px" }}>
                    <MDButton color="error" onClick={saveValues}>
                      Save
                    </MDButton>
                    <MDButton color="dark" onClick={onCancel}>
                      Cancel
                    </MDButton>
                  </div>
                )}
              </Grid>
          </Grid>
            
            }
        </Grid>
        {/* <Grid>
          {prePostStore.noOFSamples.length === 0 || undefined ? (
             <MDTypography variant="h6" fontWeight="medium">
             No details found
           </MDTypography>
          ) : (
            <>
              <Grid className={classes.parentFlexRight}>
                {!show ? (
                  <MDButton color="info" onClick={onEdit}>
                    Edit
                  </MDButton>
                ) : (
                  <div style={{ display: "flex", gap: "15px" }}>
                    <MDButton color="error" onClick={saveValues}>
                      Save
                    </MDButton>
                    <MDButton color="dark" onClick={onCancel}>
                      Cancel
                    </MDButton>
                  </div>
                )}
              </Grid>
            </>
          )}
        </Grid> */}
      </Card>
    </>
  );
}
export default React.memo(PreResult);
