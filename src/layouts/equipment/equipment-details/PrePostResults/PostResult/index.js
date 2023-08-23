import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import Card from "@mui/material/Card";
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import MDBox from "components/MDBox";
import { CardHeader, TextField } from "@mui/material";
import { useMutation, useQuery, useSubscription } from "urql";
import Collapse from '@mui/material/Collapse';
import Grid from "@mui/material/Grid";
import alertAndLoaders from "utils/alertAndLoaders";
import { ALL_COMPONENT } from "apis/queries";
import { UPDATE_POST_RESULT } from "apis/queries";
import { CREATE_POST_RESULT } from "apis/queries";
import { FATCH_POST_RESULT } from "apis/queries";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '100%',
        margin: '1%'
    },
    disabledTextField: {
        color: "gray",
        "& .MuiFormLabel-root": {
            color: "gray" // or black
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

export default function PreResult({ partCode }) {
    const [expanded, setExpanded] = React.useState(false);
    const [show, setShow] = useState(false)
    const [pledge, setPledge] = useState(true)
    const [component, setComponent] = useState(true)
    const [ptcurrent, setPtCurrent] = useState({})
    const [ptfrequency, setPtFreuency] = useState({})
    const [ptinsulation, setPtInsulation] = useState({})
    const [ptsound, setPtSound] = useState({})
    const classes = useStyles();
    const [updatePostData, updatePostDataResults] = useMutation(UPDATE_POST_RESULT);
    const [createPostData, createPostDataResults] = useMutation(CREATE_POST_RESULT);

    const prePostStore = useSelector((store) => {
        return store.prePost;
    })
    const [fatchPostData, rexFatchPostData] = useSubscription({
        query:FATCH_POST_RESULT,
        variables: { partCode:partCode}
    })

    const [plannerByName, rexPlannerByName] = useQuery({
        query: ALL_COMPONENT
    })
    const dispatch = useDispatch();

    useEffect(() => {
        if (fatchPostData.data) {
            if (fatchPostData.data.postResultTableByPartCode) {
                let data=fatchPostData.data.postResultTableByPartCode
                setPtCurrent(JSON.parse(data.ptCurrent))
                setPtFreuency(JSON.parse(data.ptFrequency))
                setPtInsulation(JSON.parse(data.ptInsulationRs))
                setPtSound(JSON.parse(data.ptSoundLvl))
            }

        }
        if (plannerByName.data) {
            if (plannerByName.data.allPreResultTables) {
                let data = plannerByName.data.allPreResultTables
                setPledge(true)
            } else {
                setPledge(false)
            }
        }
    }, [plannerByName.data, fatchPostData.data])

    const saveValues = () => {
        let currentVal = JSON.stringify(ptcurrent)
        let frequencyVal = JSON.stringify(ptfrequency)
        let insulationVal = JSON.stringify(ptinsulation)
        let soundVal = JSON.stringify(ptsound)
        if (pledge === true) {
            updatePostDataResults({
                partCode: partCode,
                ptCurrent: currentVal,
                ptFrequency: frequencyVal,
                ptInsulationRs: insulationVal,
                ptSoundLvl: soundVal
            }).then((res) => {
                console.log(res);
                if (res.data !== null) {
                    alertAndLoaders("UNSHOW_ALERT", dispatch, "Post Test Results Are Saved... ", "success");
                } else if (res.error) {
                    alertAndLoaders("UNSHOW_ALERT", dispatch, "Something Went Wrong... ", "error");
                }
            });
        } else {
            createPostDataResults({
                partCode: partCode,
                ptCurrent: currentVal,
                ptFrequency: frequencyVal,
                ptInsulationRs: insulationVal,
                ptSoundLvl: soundVal

            }).then((res) => {
                console.log(res);
                if (res.data) {
                    alertAndLoaders("UNSHOW_ALERT", dispatch, "Post Test Results Are Saved... ", "success");
                } else if (res.error) {
                    alertAndLoaders("UNSHOW_ALERT", dispatch, "Something Went Wrong... ", "error");
                }
            });
        }
    }

    return (
        <>
            <Card style={{ margin: "12px" }}>
                <CardHeader
                    title={<MDTypography variant="h6" fontWeight="medium">Post Test Values</MDTypography>}
                />
                {prePostStore.noOFSamples.length === 0 || undefined ? "" :
                    <> <Grid container marginBottom={2} style={{ display: "flex", justifyContent: "space-around" }}>
                        {prePostStore.noOFSamples.map((val) => {
                            return (
                                <Grid>
                                    <MDTypography variant="h6" fontWeight="small" style={{ textAlign: "center" }}>N{val}</MDTypography>
                                </Grid>
                            )
                        })}
                    </Grid>
                        <Grid style={{ alignItems: "center" }}>
                            <MDTypography style={{ marginLeft: "15px" }} variant="h6" fontWeight="small">
                                Current:
                            </MDTypography>
                        </Grid>
                        <Grid container marginBottom={2} style={{ display: "flex", justifyContent: "space-evenly" }} >
                            {prePostStore.noOFSamples.map((val) => {
                                const handleChange = (event) => {
                                    const { name, value } = event.target;
                                    setPtCurrent((prevValues) => ({
                                        ...prevValues,
                                        [name]: value,
                                    }));
                                };
                                return (
                                    <Grid sm={2} m={1}>
                                        {show ? <TextField name={`n${val}`}
                                            value={ptcurrent?ptcurrent[`n${val}`] : ''}
                                            onChange={handleChange} /> : <MDTypography variant="h6" fontWeight="small" style={{ textAlign: "center", background: "#394259", padding: "5px 0px", borderRadius: "8px" }}>{ptcurrent?ptcurrent[`n${val}`] : "N/A"}</MDTypography>}
                                    </Grid>
                                    
                                )
                            })}
                        </Grid>
                        <Grid style={{ alignItems: "center" }}>
                            <MDTypography style={{ marginLeft: "15px" }} variant="h6" fontWeight="small">
                                Sound:
                            </MDTypography>
                        </Grid>
                        <Grid container marginBottom={2} style={{ display: "flex", justifyContent: "space-evenly" }} >
                            {prePostStore.noOFSamples.map((val) => {
                                const handleChange = (event) => {
                                    const { name, value } = event.target;
                                    setPtSound((prevValues) => ({
                                        ...prevValues,
                                        [name]: value,
                                    }));
                                };
                                return (
                                    <Grid sm={2} m={1}>
                                        {show ? <TextField name={`n${val}`}
                                            value={ptsound?ptsound[`n${val}`] : ''}
                                            onChange={handleChange} /> : <MDTypography variant="h6" fontWeight="small" style={{ textAlign: "center", background: "#394259", padding: "5px 0px", borderRadius: "8px" }}>{ptsound?ptsound[`n${val}`] : "N/A"}</MDTypography>}
                                    </Grid>
                                    
                                )
                            })}
                        </Grid>
                        <Grid >
                            <MDTypography style={{ marginLeft: "15px" }} variant="h6" fontWeight="small">
                                Frequency:
                            </MDTypography>
                        </Grid>
                        <Grid container marginBottom={2} style={{ display: "flex", justifyContent: "space-evenly" }} >
                            {prePostStore.noOFSamples.map((val) => {
                                const handleChange = (event) => {
                                    const { name, value } = event.target;
                                    setPtFreuency((prevValues) => ({
                                        ...prevValues,
                                        [name]: value,
                                    }));
                                };
                                return (
                                    <Grid sm={2} m={1}>
                                        {show ? <TextField name={`n${val}`}
                                            value={ptfrequency?ptfrequency[`n${val}`] : ''}
                                            onChange={handleChange} /> : <MDTypography variant="h6" fontWeight="small" style={{ textAlign: "center", background: "#394259", padding: "5px 0px", borderRadius: "8px" }}>{ptfrequency?ptfrequency[`n${val}`] : "N/A"}</MDTypography>}
                                    </Grid>
                                    
                                )
                            })}
                        </Grid>
                        <Grid >
                            <MDTypography style={{ marginLeft: "15px" }} variant="h6" fontWeight="small">
                                Insulation Resistance:
                            </MDTypography>
                        </Grid>
                        <Grid container marginBottom={2} style={{ display: "flex", justifyContent: "space-evenly" }} >
                            {prePostStore.noOFSamples.map((val) => {
                                const handleChange = (event) => {
                                    const { name, value } = event.target;
                                    setPtInsulation((prevValues) => ({
                                        ...prevValues,
                                        [name]: value,
                                    }));
                                };
                                return (
                                    <Grid sm={2} m={1}>
                                        {show ? <TextField name={`n${val}`}
                                            value={ptinsulation?ptinsulation[`n${val}`] : ''}
                                            onChange={handleChange} /> : <MDTypography variant="h6" fontWeight="small" style={{ textAlign: "center", background: "#394259", padding: "5px 0px", borderRadius: "8px" }}>{ptinsulation?ptinsulation[`n${val}`] : "N/A"}</MDTypography>}
                                    </Grid>
                                    
                                )
                            })}
                        </Grid>
                        <Grid className={classes.parentFlexRight}>
                            <MDButton color="info"
                                onClick={() => setShow(!show)}
                            >
                                {show ? "Cancel" : "Edit"}
                            </MDButton>
                            {show ? <MDButton color="info" style={{ marginLeft: "5px" }}
                                onClick={saveValues}
                            >
                                Save
                            </MDButton> : null}
                        </Grid></>}
            </Card>
        </>

    )
}