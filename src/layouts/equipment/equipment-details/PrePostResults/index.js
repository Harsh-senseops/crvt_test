import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import Card from "@mui/material/Card";
import { DialogActions, DialogTitle } from "@mui/material";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import clsx from "clsx";
import Collapse from "@mui/material/Collapse";
import { makeStyles } from "@mui/styles";
import MDBox from "components/MDBox";
import { useMutation, useQuery, useSubscription } from "urql";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { CardHeader, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import PreResult from "./PreResult";
import PostResult from "./PostResult";
import MDDialog from "components/MDDilouge";
import { useDispatch, useSelector } from "react-redux";
import alertAndLoaders from "utils/alertAndLoaders";
import { PRE_POST_DETAILS } from "apis/queries";
import UploadImage from "./PostResult/UploadImage/uploadImage";
import { setNoOfSamples, setPrePostIndex, setIsSampleTrue } from "reduxSlices/prePost";
import MDHoverSearch from "components/MDHoverSearch";
import MDLoader from "components/MDLoader";
let toCheckArray = [35, 15, 30, 33, 21, 13, 41, 7, 28, 10, 27, 11, 20, 14, 38, 39, 9];
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    margin: "1%",
  },
  disabledTextField: {
    color: "gray",
    "& .MuiFormLabel-root": {
      color: "gray",
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
let initialSampleState = [
  { value: 1, color: "#2D3D59" },
  { value: 2, color: "#2D3D59" },
  { value: 3, color: "#2D3D59" },
  { value: 4, color: "#2D3D59" },
];

const searchPrePost = (data, searchTerm) => {
  const filteredData = data.filter((item) =>
    item.partCode.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return filteredData;
};

function PrePostResult() {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [change, setChange] = useState(initialSampleState);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [preData, setPreData] = useState();
  const [expand, setExpand] = useState(null);
  const [dataCheck, setDataCheck] = useState(false);
  // let doesDataExist = toCheckArray.find((val) => val === preData[Index].partId);
  const prePostStore = useSelector((store) => {
    return store.prePost;
  });
  const [preTableData, rexPreTableData] = useQuery({
    query: PRE_POST_DETAILS,
  });
  const [partId, setPartId] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (preTableData.data) {
      setPreData(preTableData.data.allCrvtPrePostResults?.nodes);
    }
  }, [preTableData.data, searchTerm]);

  const sampleSelect = (index) => {
    let tempArray = [...change];
    for (let i = 0; i < tempArray.length; i++) {
      if (i === index) {
        tempArray[i].color = "#EC407A";
      } else {
        tempArray[i].color = "#2D3D59";
      }
    }
    setChange(tempArray);
  };
  const handleClose = () => {
    setOpen(false);
    setIsExpanded(false);
    dispatch(setIsSampleTrue(false));
  };
  const handleCardCollapse = () => {
    setOpen(false);
    setExpand(null);
    dispatch(setIsSampleTrue(false));
  };
  const saveSamples = () => {
    for (let i = 0; i < change.length; i++) {
      if (change[i].color === "#EC407A") {
        setOpen(false);
        dispatch(setIsSampleTrue(false));
        dispatch(setNoOfSamples(change[i].value));
        break;
      }
    }
    dispatch(setIsSampleTrue(false));
  };
  const handleExpand = (Index) => {
    let doesDataExist = toCheckArray.find((val) => val === preData[Index].partId);
    if (expand === Index) {
      setExpand(null);
      console.log(preTableData[Index]);
      dispatch(setNoOfSamples(null));
      dispatch(setIsSampleTrue(false));
    } else {
      if (!doesDataExist || preData[Index].pre || preData[Index].post) {
        setOpen(false);
        dispatch(setIsSampleTrue(false));
        setExpand(Index);
        setDataCheck(false);
        dispatch(setNoOfSamples([]));
        return;
      }
      setExpand(Index);
      setOpen(true);
      setDataCheck(true);
      dispatch(setNoOfSamples([]));
    }
  };
  return (
    <DashboardLayout>
      <MDBox width="calc(100% - 48px)" position="absolute" top="1.75rem">
        <DashboardNavbar dark absolute />
      </MDBox>
      <MDBox pt={10} pb={3}>
        <Card style={{ background: "#394259" }}>
          <div style={{ padding: "1em" }}>
            <MDHoverSearch onInputChange={(value) => setSearchTerm(value)} />
          </div>
          <MDBox>
            {preData ? (
              preData.map((val, i) => {
                return (
                  <Card key={i} sx={{ margin: "12px" }}>
                    <CardHeader
                      onClick={() => {
                        handleExpand(i);
                      }}
                      sx={{
                        transition: "all 250ms",
                        ":hover": {
                          boxShadow: 20,
                          cursor: "pointer",
                          backgroundColor: "#384158 !important",
                          borderRadius: "10px",
                          transform: "scale(1.02)",
                        },
                      }}
                      action={
                        <div>
                          <IconButton
                            className={clsx(classes.expand, {
                              [classes.expandOpen]: expand === i,
                              [classes.expandOpen]: isExpanded,
                            })}
                            sx={{
                              "& .MuiInputBase-input.Mui-disabled": {
                                WebkitTextFillColor: "gray",
                              },
                            }}
                            // onClick={() => setExpanded(!expanded)}
                            aria-expanded={expand === i}
                            aria-label="show more"
                            color="info"
                          >
                            <ExpandMoreIcon />
                          </IconButton>
                        </div>
                      }
                      title={
                        <MDTypography variant="h6" fontWeight="medium">
                          {val.crvtComponentDetailByPartId.partName} - {val.partCode}
                        </MDTypography>
                      }
                    />

                    <Collapse in={expand === i} timeout="auto" unmountOnExit>
                      {toCheckArray.find((val1) => val1 === val.partId) ? (
                        <>
                          <Card style={{ background: "#394259", margin: "10px" }}>
                            <Grid container lg={12} xl={12}>
                              <Grid xs={12} sm={12}>
                                <PreResult
                                  Id={val.partId}
                                  partCode={val.partCode}
                                  // params={val.pre}
                                />
                              </Grid>
                            </Grid>
                          </Card>
                          <Card style={{ background: "#394259", margin: "10px" }}>
                            <Grid container lg={12} xl={12}>
                              <Grid xs={12} sm={12}>
                                <PostResult
                                  Id={val.partId}
                                  partCode={val.partCode}
                                  // params={val.post}
                                />
                              </Grid>
                            </Grid>
                          </Card>
                        </>
                      ) : (
                        <MDTypography
                          variant="h6"
                          fontWeight="medium"
                          style={{ textAlign: "center", padding: "1em 0px" }}
                        >
                          No Details Found &#128533;
                        </MDTypography>
                      )}
                    </Collapse>
                  </Card>
                );
              })
            ) : (
              <MDDialog open={true}>
                <MDLoader />
              </MDDialog>
            )}
          </MDBox>
        </Card>
      </MDBox>
      <MDDialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">Select Samples</DialogTitle>
        <div style={{ display: "flex", justifyContent: "space-around", width: "280px" }}>
          {change.map((val, i) => {
            return (
              <div
                key={i}
                onClick={() => sampleSelect(i)}
                style={{
                  background: val.color,
                  borderRadius: "8px",
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <MDTypography variant="h6" fontWeight="medium">
                  {val.value}
                </MDTypography>
              </div>
            );
          })}
        </div>
        <DialogActions style={{ marginTop: "20px" }}>
          <MDButton color="error" onClick={() => handleCardCollapse()}>
            Cancel
          </MDButton>
          <MDButton color="success" onClick={saveSamples}>
            Save
          </MDButton>
        </DialogActions>
      </MDDialog>
      <Footer />
    </DashboardLayout>
  );
}

export default PrePostResult;