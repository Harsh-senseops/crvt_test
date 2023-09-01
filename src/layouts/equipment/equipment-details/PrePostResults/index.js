import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import Card from "@mui/material/Card";
import { DialogActions, DialogTitle } from "@mui/material";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import clsx from 'clsx';
import Collapse from '@mui/material/Collapse';
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
import { PRE_TABLE_DATA } from "apis/queries";
import { UPDATE_DIFF_DATA } from "apis/queries";
import alertAndLoaders from "utils/alertAndLoaders";
import { ALL_COMPONENT } from "apis/queries";
import { FATCH_DIFF_RESULTS } from "apis/queries";
import { FATCH_DIFFERENCE } from "apis/queries";
import UploadImage from "./PostResult/UploadImage/uploadImage";
import { setNoOfSamples } from "reduxSlices/prePost";


const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '100%',
        margin: '1%'
    },
    disabledTextField: {
        color: "gray",
        "& .MuiFormLabel-root": {
            color: "gray"
        },
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "gray"
        },
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
let initialSampleState = [{ value: 1, color: "#2D3D59", }, { value: 2, color: "#2D3D59", }, { value: 3, color: "#2D3D59", }, { value: 4, color: "#2D3D59" }]

export default function PrePostResult({ }) {
    // const [expanded, setExpanded] = React.useState(false);
    const [show, setShow] = useState(false)
    const [partDetails, setPartDetails] = useState([])
    const [change, setChange] = useState(initialSampleState)
    const classes = useStyles();
    const [diffData, setDiffData] = useState([])
    const [open, setOpen] = useState(false)
    const [pledge, setPledge] = useState(true)
    const [sound, setSound] = useState(null)
    const [preData, setPreData] = useState(null)
    const [frequency, setFrequency] = useState(null)
    const [shouldPause, setShouldPause] = useState(true)
    const prePostStore = useSelector((store) => {
        return store.prePost;
    })
    const [selectedImage, setSelectedImage] = useState(null);

    const [isExpandedIndex, setIsExpandedIndex] = useState(0)
    const [partCode, setPartCode] = useState(null);
    const [plannerByName, rexPlannerByName] = useQuery({
        query: ALL_COMPONENT,
        pause: shouldPause
    })
    const [preTableData, rexPreTableData] = useQuery({
        query: PRE_TABLE_DATA
    })
    const dispatch = useDispatch();

    const [fatchDiffData, rexFatchDiffData] = useSubscription({
        query: FATCH_DIFF_RESULTS,
        variables: { partCode: partCode }
    })
    const [fatchDifference, rexFatchDifference] = useQuery({
        query: FATCH_DIFFERENCE
    })

    const [updateDiff, updateDiffResults] = useMutation(UPDATE_DIFF_DATA);

    useEffect(() => {
        if (fatchDifference.data) {
            let data = fatchDifference.data.allCrvtPostResultTables.nodes
            setDiffData(data)
        }
    }, [fatchDifference.data])

    useEffect(() => {
        if (fatchDiffData.data) {
            if (fatchDiffData.data.crvtPostResultTableByPartCode) {
                let data = fatchDiffData.data.crvtPostResultTableByPartCode
                setSound(JSON.parse(data.diffSound) || null)
                setFrequency(JSON.parse(data.diffFrequency) || null)
            }
        }
        if (!plannerByName.data) {
            setShouldPause(false)
        }
        if (preTableData.data) {
            setPreData(preTableData.data.allCrvtPreResultTables.nodes)
        }
        if (plannerByName.data) {
            let tempArray = [];
            plannerByName.data.allCrvtPreResultTables.nodes.map((val) => {
                tempArray.push({
                    partName: val.partName,
                    partCode: val.partCode,
                    isExpanded: false,
                }) && !val.frequency && !val.insulatioRs
                    && !val.soundLvl
            })
            setPartDetails(tempArray)
            setShouldPause(true)
        }
    }, [plannerByName.data, preTableData.data])

    const handleExchange = (e) => {
        e.stopPropagation()
        setShow(!show)
    }
    const sampleSelect = (index) => {
        let tempArray = [...change];
        for (let i = 0; i < tempArray.length; i++) {
            if (i === index) {
                tempArray[i].color = "#EC407A"
            } else {
                tempArray[i].color = "#2D3D59"
            }
        }
        setChange(tempArray)
    }
    const handleExpanded = (index, partCode) => {
        diffData.map((val) => {
            if (val.partCode === partCode) {
                setSound(val.diffSound ? JSON.parse(val.diffSound) : null)
                setFrequency(val.diffFrequency ? JSON.parse(val.diffFrequency) : null)
            }
        })
        setPartCode(partCode)
        if (!partDetails[index].isExpanded) {
            preData && preData.map((val, i) => {
                if (index === i && !val.current && !val.frequency && !val.insulatioRs && !val.soundLvl && !frequency && !sound) {
                    setOpen(true)
                }
            })
        } else {
            dispatch(setNoOfSamples(0))
        }
        setIsExpandedIndex(index)
        setPartDetails((prevTestData) => prevTestData.map((val, i) => ({
            ...val,
            isExpanded: i === index ? !val.isExpanded : false,
        }))
        );
    }
    const handleClose = () => {
        setOpen(false)
    }
    const saveSamples = () => {
        for (let i = 0; i < change.length; i++) {
            if (change[i].color === "#EC407A") {
                setOpen(false)
                dispatch(setNoOfSamples(change[i].value))
                break;
            }
        }
    }
    const saveDiffResults = () => {
        let frequencyVal = JSON.stringify(frequency)
        let soundVal = JSON.stringify(sound)
        if (pledge === true) {
            updateDiffResults({
                partCode: partCode,
                diffFrequency: frequencyVal,
                diffSound: soundVal
            }).then((res) => {
                console.log(res);
                if (res.data) {
                    alertAndLoaders("UNSHOW_ALERT", dispatch, "Difference Results Are Saved... ", "success");
                } else if (res.error) {
                    alertAndLoaders("UNSHOW_ALERT", dispatch, "Something Went Wrong... ", "error");
                }
            });
        }
    }
    return (
        <DashboardLayout>
            <MDBox width="calc(100% - 48px)" position="absolute" top="1.75rem">
                <DashboardNavbar dark absolute />
            </MDBox>
            <MDBox pt={10} pb={3} >
                <Card style={{ background: '#394259' }}>
                    {partDetails.length !== 0 && partDetails.map((val, i) => {
                        return (
                            <MDBox>
                                <Card sx={{ margin: "12px", }} >
                                    <CardHeader
                                        onClick={() => handleExpanded(i, val.partCode)}
                                        sx={{
                                            transition: "all 250ms",
                                            ":hover": {
                                                boxShadow: 20,
                                                cursor: 'pointer',
                                                backgroundColor: "#384158 !important",
                                                borderRadius: "10px",
                                                transform: "scale(1.02)",
                                            },
                                        }}
                                        action={
                                            <div>
                                                <IconButton
                                                    className={clsx(classes.expand, { [classes.expandOpen]: val.isExpanded, })}
                                                    sx={{
                                                        "& .MuiInputBase-input.Mui-disabled": {
                                                            WebkitTextFillColor: "gray",
                                                        },
                                                    }}
                                                    // onClick={() => setExpanded(!expanded)}
                                                    aria-expanded={val.isExpanded}
                                                    aria-label="show more"
                                                    color='info'
                                                >
                                                    <ExpandMoreIcon />
                                                </IconButton>
                                            </div>
                                        }
                                        title={<MDTypography variant="h6" fontWeight="medium">{val.partName} - {val.partCode}</MDTypography>}
                                    />
                                    <MDDialog
                                        open={open}
                                        onClose={handleClose}
                                    >
                                        <DialogTitle id="alert-dialog-title">
                                        Select Samples
                                        </DialogTitle>
                                        <div style={{ display: "flex", justifyContent: "space-around", width: "280px" }}>
                                            {change.map((val, i) => {
                                                return (
                                                    <div onClick={() => sampleSelect(i)} style={{ background: val.color, borderRadius: "8px", width: "50px", height: "50px", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer" }}>
                                                        <MDTypography variant="h6" fontWeight="medium">{val.value}</MDTypography>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <DialogActions style={{ marginTop: "20px" }}>
                                            <MDButton color='error' onClick={handleClose}>Cancal</MDButton>
                                            <MDButton color='success' onClick={saveSamples} autoFocus>Save</MDButton>
                                        </DialogActions>
                                    </MDDialog>
                                    <Collapse in={val.isExpanded} timeout="auto" unmountOnExit>
                                        <Card style={{ background: '#394259', margin: "10px" }}>
                                            <Grid container lg={12} xl={12}>
                                                <Grid xs={6} sm={6}>
                                                    <PreResult partCode={val.partCode} />
                                                </Grid>
                                                <Grid sm={6} xs={6}>
                                                    <PostResult partCode={val.partCode} />
                                                </Grid>

                                            </Grid>
                                            <Card style={{ margin: "12px" }}>
                                                <CardHeader
                                                    title={<MDTypography variant="h6" fontWeight="medium"> Difference</MDTypography>}
                                                />
                                                <Grid container lg={12}>
                                                    <Grid lg={6} >
                                                        <Grid style={{ alignItems: "center" }}>
                                                            <MDTypography style={{ marginLeft: "15px" }} variant="h6" fontWeight="small">
                                                                Sound:
                                                            </MDTypography>
                                                        </Grid>
                                                        <Grid container marginBottom={2} style={{ display: "flex", justifyContent: "space-evenly" }} >
                                                            {prePostStore.noOFSamples.map((val, i) => {
                                                                const handleChange = (event) => {
                                                                    console.log(frequency)
                                                                    const { name, value } = event.target;
                                                                    setSound((prevValues) => ({
                                                                        ...prevValues,
                                                                        [name]: value,
                                                                    }));
                                                                };
                                                                return (
                                                                <Grid key={i} sm={2} m={1}>
                                                                     {show ? <TextField name={`n${val}`}
                                                                     value={sound ? sound[`n${val}`] : ''}
                                                                     onChange={handleChange} /> : <MDTypography variant="h6" fontWeight="small" style={{ textAlign: "center", background: "#394259", padding: "5px 0px", borderRadius: "8px" }}>{sound ? sound[`n${val}`] : "N/A"} </MDTypography>}
                                                                </Grid>
                                                                )
                                                            })}
                                                        </Grid>
                                                    </Grid>
                                                    <Grid lg={6}>
                                                        <Grid style={{ alignItems: "center" }}>
                                                            <MDTypography style={{ marginLeft: "15px" }} variant="h6" fontWeight="small">
                                                                Frequency:
                                                            </MDTypography>
                                                        </Grid>
                                                        <Grid container marginBottom={2} style={{ display: "flex", justifyContent: "space-evenly" }} >
                                                            {prePostStore.noOFSamples.map((val, i) => {
                                                                const handleChange = (event) => {
                                                                    const { name, value } = event.target;
                                                                    // let freq = frequency ?  frequency[`n${val}`] : "N/A"
                                                                    setFrequency((prevValues) => ({
                                                                        ...prevValues,
                                                                        [name]: value,
                                                                    }));
                                                                };
                                                                return (
                                                                <Grid key={i} sm={2} m={1}>
                                                                    {show ? <TextField name={`n${val}`}
                                                                    value={frequency ? frequency[`n${val}`] : ''}
                                                                    onChange={handleChange} /> : <MDTypography variant="h6" fontWeight="small" style={{ textAlign: "center", background: "#394259", padding: "5px 0px", borderRadius: "8px" }}>{frequency ? frequency[`n${val}`] : "N/A"}</MDTypography>}
                                                                </Grid>
                                                                )
                                                            })}
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid className={classes.parentFlexRight}>
                                                    <MDButton color="info"
                                                        onClick={(e) => handleExchange(e)}
                                                    >
                                                        {show ? "Cancel" : "Edit"}
                                                    </MDButton>
                                                    {show ?
                                                    <MDButton color="info" style={{ marginLeft: "5px" }}
                                                        onClick={saveDiffResults}>
                                                        Save
                                                    </MDButton> : null}
                                                </Grid>
                                            </Card>
                                            <Grid sm={6} xs={6} style={{ margin: "12px" }}>
                                                <UploadImage partCode={val.partCode} />
                                            </Grid>
                                        </Card>
                                    </Collapse>
                                </Card>
                        </MDBox>
                        )
                    })}
                </Card>
            </MDBox>
            <Footer />
        </DashboardLayout>
    )
}