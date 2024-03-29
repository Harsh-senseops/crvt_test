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
import Grid from "@mui/material/Grid";
import alertAndLoaders from "utils/alertAndLoaders";
import {
  GET_DEFAULT_PRE_POST_DATA,
  UPDATE_POST_RESULT,
  GET_ALL_PRE_POST_DETAILS_BY_PARTCODE,
} from "apis/queries";
import { setNoOfSamples, setIsSampleTrue } from "reduxSlices/prePost";
import UploadImage from "./UploadImage/uploadImage";

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

function PostResult({ Id, partCode }) {
  const [show, setShow] = useState(false);
  const [ptData, setPtData] = useState(false);
  const [parameters, setParameters] = useState(null);
  const [newValues, setNewValues] = useState(null);

  const classes = useStyles();

  const prePostStore = useSelector((store) => {
    return store.prePost;
  });

  const [postParams, rexPostParams] = useQuery({
    query: GET_DEFAULT_PRE_POST_DATA,
    variables: { componentId: Id },
  });

  const [preTableData, rexPreTableData] = useSubscription({
    query: GET_ALL_PRE_POST_DETAILS_BY_PARTCODE,
    variables: { partCode },
  });

  const [storePostDetailsRes, storePostDetails] = useMutation(UPDATE_POST_RESULT);

  const dispatch = useDispatch();

  const onCancel = () => {
    setShow((prev) => !prev);
    // rexFatchPreData({ requestPolicy: "network-only" });
  };

  const onEdit = () => {
    setShow((prev) => !prev);
    // rexFatchPreData({ requestPolicy: "network-only" });
  };

  useEffect(() => {
    if (postParams.data?.crvtPrePostDefaultValueByComponentId && preTableData.data && !newValues) {
      if (preTableData.data?.crvtPrePostResultByPartCode?.post) {
        setParameters(JSON.parse(preTableData.data?.crvtPrePostResultByPartCode?.post));
      } else {
        let tempArray = {
          ...JSON.parse(postParams.data?.crvtPrePostDefaultValueByComponentId?.ptParameter),
        };
        // if(preTableData.data?.crvtPrePostResultByPartCode?.pre){
        //   dispatch(setNoOfSamples(JSON.parse(preTableData.data?.crvtPrePostResultByPartCode?.pre).parameters[0].conditions[0].value.length))
        // }
        tempArray.parameters.map((val1) => {
          val1.conditions.map((c_val) => {
            c_val.value = [];
            if (prePostStore.noOFSamples !== null) {
              prePostStore.noOFSamples.map((val) => {
                c_val.value.push({ a_value: "N/A" });
              });
            }
          });
        });
        setParameters(tempArray);
      }
    }
  }, [postParams.data, preTableData.data]);

  useEffect(() => {
    if (preTableData.data?.crvtPrePostResultByPartCode?.pre) {
      dispatch(
        setNoOfSamples(
          JSON.parse(preTableData.data?.crvtPrePostResultByPartCode?.pre).parameters[0]
            .conditions[0].value.length
        )
      );
    }
  }, [preTableData.data]);

  const handleValues = (e, pindex, cindex, c_valIndex) => {
    e.preventDefault();
    let tempObj = { ...parameters };
    tempObj.parameters[pindex].conditions[cindex].value[c_valIndex].a_value = e.target.value;
    setParameters(tempObj);
    setNewValues(true);
  };
  const saveValues = () => {
    let data = JSON.stringify(parameters);
    storePostDetails({
      partCode,
      post: data,
    }).then((res) => {
      if (res.data) {
        alertAndLoaders("UNSHOW_ALERT", dispatch, "Post Test Results Are Saved... ", "success");
      }
      if (res.error) {
        console.log(res.error);
      }
    });
  };

  return (
    <>
      <Card style={{ margin: "12px" }}>
        <Grid m={2}>
          <MDTypography variant="h6" fontWeight="medium">
            Post Test Values
          </MDTypography>
        </Grid>
        <Grid>
          {!parameters ? (
            <MDTypography
              variant="h6"
              fontWeight="medium"
              style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            >
              No details found
            </MDTypography>
          ) : (
            <Grid>
              <Grid container>
                <Grid item xs={4} sm={12} md={3} lg={4} xl={4}></Grid>
                <Grid
                  item
                  xs={7}
                  sm={12}
                  md={3}
                  lg={7}
                  xl={7}
                  style={{ display: "flex", justifyContent: "space-between", }}
                >
                {prePostStore.noOFSamples && prePostStore.noOFSamples.map((val)=>{
                  return(
                    <MDTypography
                    variant="h6"
                    fontWeight="large"
                    style={{
                      textAlign: "center",
                      padding: "10px 25px",
                      borderRadius: "8px",
                      // marginRight:"25%"
                    }}
                  >
                    N{val}
                </MDTypography>
                  )
                })}
                </Grid>
              </Grid>
              {parameters?.parameters?.map((pval, pindex) => {
                return (
                  <Grid key={pindex} item ml="20px" xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Grid container style={{ justifyContent: "left", alignContent: "center" }}>
                      <Grid item xs={12} sm={12} md={3} lg={6} xl={6}>
                        <Typography
                          marginTop={2}
                          fontWeight="700"
                          fontSize="14px"
                          color="whitesmoke"
                        >
                          {pval.p_name}
                        </Typography>
                      </Grid>
                    </Grid>

                    {pval &&
                      pval?.conditions.map((cval, cindex) => {
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
                                {cval?.value.map((c_values, c_valIndex) => {
                                  return (
                                    <Grid key={c_valIndex}>
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
                                            value={
                                              c_values.a_value === "N/A" ? "" : c_values.a_value
                                            }
                                            onChange={(e) =>
                                              handleValues(e, pindex, cindex, c_valIndex)
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
                                            {c_values.a_value === "" ? "N/A" : c_values.a_value}
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
              <Card style={{ background: "#394259", margin: "10px" }}>
                <Grid container lg={12} xl={12}>
                  <Grid xs={12} sm={12}>
                    <UploadImage Id={Id} partCode={partCode} />
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          )}
        </Grid>
      </Card>
    </>
  );
}
export default React.memo(PostResult);
