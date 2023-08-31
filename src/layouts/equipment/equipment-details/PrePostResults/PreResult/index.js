import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { makeStyles } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import { CardHeader, TextField } from "@mui/material";
import { useMutation, useQuery, useSubscription } from "urql";
import Grid from "@mui/material/Grid";
import { ALL_COMPONENT } from "apis/queries";
import { PRE_CURRENT,PRE_FREQUENCY,PRE_INSULATION,PRE_SOUND } from "apis/queries";
import alertAndLoaders from "utils/alertAndLoaders";
import { FATCH_PRE_RESULT } from "apis/queries";
import { setNoOfSamples } from "reduxSlices/prePost";

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
    const [show, setShow] = React.useState(false)
    const [pledge, setPledge] = useState(true)
    const [current, setCurrent] = useState({})
    const [frequency, setFrequency] = useState({})
    const [sound, setSound] = useState({})
    const [insulation, setInsulation] = useState({})
    const [showSamples, setShowSamples] = useState(false);
    const [noOfSamples, setNoOSamples] = useState([])
    const [updatePreCurrent, updatePreCurrentResults] = useMutation(PRE_CURRENT);
    const [updatePreFrequency, updatePreFrequencyResults] = useMutation(PRE_FREQUENCY);
    const [updatePreInsulation, updatePreInsulationResults] = useMutation(PRE_INSULATION);
    const [updatePreSound, updatePreSoundResults] = useMutation(PRE_SOUND);
    const prePostStore = useSelector((store) => {
        return store.prePost;
    })
    const classes = useStyles();
    const [plannerByName, rexPlannerByName] = useQuery({
        query: ALL_COMPONENT
    })
    const [fatchPreData, rexFatchPreData] = useSubscription({
        query: FATCH_PRE_RESULT,
        variables: { partCode: partCode }
    })
    const dispatch = useDispatch();

    useEffect(() => {
        if (fatchPreData.data) {
                if (fatchPreData.data.preResultTableByPartCode) {
                    let data = fatchPreData.data.preResultTableByPartCode
                    let flag = true;
                    if (JSON.parse(data?.current) && flag) {
                        let len = Object.keys(JSON.parse(data?.current)).length;
                        dispatch(setNoOfSamples(len))
                        flag = false
                    } else if (JSON.parse(data?.frequency) && flag) {
                        let len = Object.keys(JSON.parse(data?.frequency)).length;
                        dispatch(setNoOfSamples(len))
                        flag = false
                    } else if (JSON.parse(data?.insulationRs) && flag) {
                        let len = Object.keys(JSON.parse(data?.insulationRs)).length;
                        dispatch(setNoOfSamples(len))
                        flag = false
                    }
                    else if (JSON.parse(data?.soundLvl) && flag) {
                        let len = Object.keys(JSON.parse(data?.soundLvl)).length;
                        dispatch(setNoOfSamples(len))
                        flag = false
                    }
                    setCurrent(JSON.parse(data?.current) || "")
                    setFrequency(JSON.parse(data?.frequency) || "")
                    setSound(JSON.parse(data?.soundLvl) || "")
                    setInsulation(JSON.parse(data?.insulationRs) || "")
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
    }, [plannerByName.data, fatchPreData.data])

    const saveValues = () => {
        let currentVal = current === "" ? null : JSON.stringify(current);
        let frequencyVal = frequency === "" ? null : JSON.stringify(frequency);
        let insulationVal = insulation === "" ? null : JSON.stringify(insulation);
        let soundVal = sound === "" ? null : JSON.stringify(sound);
        if (currentVal) {
            for (let i = 0; i < prePostStore.noOFSamples.length; i++) {
                if (!current[`n${i + 1}`]) {
                    alertAndLoaders(
                        "UNSHOW_ALERT",
                        dispatch,
                        "Please ensure that all current fields are filled",
                        "warning"
                    );
                    return;
                }
            }
            updatePreCurrentResults({
                partCode: partCode,
                current: currentVal,
            }).then((res) => {
                console.log(res);
                if (res.data) {
                    alertAndLoaders("UNSHOW_ALERT", dispatch, "Pre Test Current Values Are Saved... ", "success");
                } else if (res.error) {
                    alertAndLoaders("UNSHOW_ALERT", dispatch, "Something Went Wrong... ", "error");
                }
            });
        }
        if (soundVal) {
            for (let i = 0; i < prePostStore.noOFSamples.length; i++) {
                if (!sound[`n${i + 1}`]) {
                    alertAndLoaders(
                        "UNSHOW_ALERT",
                        dispatch,
                        "Please ensure that all sound fields are filled",
                        "warning"
                    );
                    return;
                }
            }
            updatePreSoundResults({
                partCode: partCode,
                soundLvl: soundVal
            }).then((res) => {
                console.log(res);
                if (res.data) {
                    alertAndLoaders("UNSHOW_ALERT", dispatch, "Pre Test Sound Values Are Saved... ", "success");
                } else if (res.error) {
                    alertAndLoaders("UNSHOW_ALERT", dispatch, "Something Went Wrong... ", "error");
                }
            });
        }
        if (insulationVal) {
            for (let i = 0; i < prePostStore.noOFSamples.length; i++) {
                console.log(insulation[`n${i + 1}`], i + 1);
                if (!insulation[`n${i + 1}`]) {
                    alertAndLoaders(
                        "UNSHOW_ALERT",
                        dispatch,
                        "Please ensure that all insulation fields are filled",
                        "warning"
                    );
                    return;
                }
            }
            updatePreInsulationResults({
                partCode: partCode,
                insulationRs: insulationVal,
            }).then((res) => {
                console.log(res);
                if (res.data) {
                    alertAndLoaders("UNSHOW_ALERT", dispatch, "Pre Test Insulation Values Are Saved... ", "success");
                } else if (res.error) {
                    alertAndLoaders("UNSHOW_ALERT", dispatch, "Something Went Wrong... ", "error");
                }
            });
        }
        if (frequencyVal) {
            for (let i = 0; i < prePostStore.noOFSamples.length; i++) {
                if (!frequency[`n${i + 1}`]) {
                    alertAndLoaders(
                        "UNSHOW_ALERT",
                        dispatch,
                        "Please ensure that all frequency fields are filled",
                        "warning"
                    );
                    return;
                }
            }
            updatePreFrequencyResults({
                partCode: partCode,
                frequency: frequencyVal,
            }).then((res) => {
                console.log(res);
                if (res.data) {
                    alertAndLoaders("UNSHOW_ALERT", dispatch, "Pre Test Frequency Values Are Saved... ", "success");
                } else if (res.error) {
                    alertAndLoaders("UNSHOW_ALERT", dispatch, "Something Went Wrong... ", "error");
                }
            });
        }
    };

    const handleSamples = (event) => {
        // alert(event.target.value)
        for (let i = 1; i <= event.target.value; i++) {
            setNoOSamples(prev => [...prev, i])
        }
        setShowSamples(true)
    }
    return (
        <>
            <Card style={{ margin: "12px" }}>
                <CardHeader
                    title={<MDTypography variant="h6" fontWeight="medium">Pre Test Values</MDTypography>}
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
                            {prePostStore.noOFSamples.map((val, id) => {
                                const handleChange = (event) => {
                                    const { name, value } = event.target;
                                    setCurrent((prevValues) => ({
                                        ...prevValues,
                                        [name]: value,
                                    }));
                                };
                                return (
                                    <Grid sm={2} m={1}>
                                        {show ? <TextField name={`n${val}`}
                                            value={current ? current[`n${val}`] : ''}
                                            onChange={handleChange} /> : <MDTypography variant="h6" fontWeight="small" style={{ textAlign: "center", background: "#394259", padding: "5px 0px", borderRadius: "8px" }}>{current ? current[`n${val}`] : "N/A"}</MDTypography>}
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
                                    setSound((prevValues) => ({
                                        ...prevValues,
                                        [name]: value,
                                    }));
                                };
                                return (
                                    <Grid sm={2} m={1}>
                                        {show ? <TextField name={`n${val}`}
                                            value={sound ? sound[`n${val}`] : ''}
                                            onChange={handleChange} /> : <MDTypography variant="h6" fontWeight="small" style={{ textAlign: "center", background: "#394259", padding: "5px 0px", borderRadius: "8px" }}>{sound ? sound[`n${val}`] : "N/A"}</MDTypography>}
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
                                    setFrequency((prevValues) => ({
                                        ...prevValues,
                                        [name]: value,
                                    }));
                                };
                                return (
                                    <Grid sm={2} m={1}>
                                        {show ? <TextField name={`n${val}`}
                                            value={frequency ? frequency[`n${val}`] : ''}
                                            onChange={handleChange} /> : <MDTypography variant="h6" fontWeight="small" style={{ textAlign: "center", background: "#394259", padding: "5px 0px", borderRadius: "8px" }}>{frequency ? frequency[`n${val}`] : "N/A"}</MDTypography>}
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
                                    setInsulation((prevValues) => ({
                                        ...prevValues,
                                        [name]: value,
                                    }));
                                };
                                return (
                                    <Grid sm={2} m={1}>
                                        {show ? <TextField name={`n${val}`}
                                            value={insulation ? insulation[`n${val}`] : ''}
                                            onChange={handleChange} /> : <MDTypography variant="h6" fontWeight="small" style={{ textAlign: "center", background: "#394259", padding: "5px 0px", borderRadius: "8px" }}>{insulation ? insulation[`n${val}`] : "N/A"}</MDTypography>}
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
                        </Grid>
                    </>}
            </Card>
        </>
    )
}