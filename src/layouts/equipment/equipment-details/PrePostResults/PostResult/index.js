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
import alertAndLoaders from "utils/alertAndLoaders";
import { ALL_COMPONENT } from "apis/queries";
import { POST_CURRENT, POST_FREQUENCY, POST_INSULATION, POST_SOUND } from "apis/queries";
import { FATCH_POST_RESULT } from "apis/queries";
import { setNoOfSamples } from "reduxSlices/prePost";


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

export default function PostResult({ partCode }) {
    const [expanded, setExpanded] = React.useState(false);
    const [show, setShow] = useState(false);
    const [ptcurrent, setPtCurrent] = useState({});
    const [ptfrequency, setPtFrequency] = useState({});
    const [ptinsulation, setPtInsulation] = useState({});
    const [ptsound, setPtSound] = useState({});
    const classes = useStyles();
    const [updatePostCurrent, updatePostCurrentResults] = useMutation(POST_CURRENT);
    const [updatePostFrequency, updatePostFrequencyResults] = useMutation(POST_FREQUENCY);
    const [updatePostInsulation, updatePostInsulationResults] = useMutation(POST_INSULATION);
    const [updatePostSound, updatePostSoundResults] = useMutation(POST_SOUND);


    const prePostStore = useSelector((store) => {
        return store.prePost;
    });
    const [fatchPostData, rexFatchPostData] = useSubscription({
        query: FATCH_POST_RESULT,
        variables: { partCode: partCode },
    });

    const [plannerByName, rexPlannerByName] = useQuery({
        query: ALL_COMPONENT,
    });
    const dispatch = useDispatch();

    useEffect(() => {
        if (fatchPostData.data) {
            if (fatchPostData.data.crvtPostResultTableByPartCode) {
                let data = fatchPostData.data.crvtPostResultTableByPartCode
                let flag = true;
                if (JSON.parse(data?.ptCurrent) && flag) {
                    let len = Object.keys(JSON.parse(data?.ptCurrent)).length;
                    dispatch(setNoOfSamples(len))
                    flag = false
                } else if (JSON.parse(data?.ptFrequency) && flag) {
                    let len = Object.keys(JSON.parse(data?.ptFrequency)).length;
                    dispatch(setNoOfSamples(len))
                    flag = false
                } else if (JSON.parse(data?.ptInsulationRs) && flag) {
                    let len = Object.keys(JSON.parse(data?.ptInsulationRs)).length;
                    dispatch(setNoOfSamples(len))
                    flag = false
                }
                else if (JSON.parse(data?.ptSoundLvl) && flag) {
                    let len = Object.keys(JSON.parse(data?.ptSoundLvl)).length;
                    dispatch(setNoOfSamples(len))
                    flag = false
                }
                setPtCurrent(JSON.parse(data?.ptCurrent) || "")
                setPtFrequency(JSON.parse(data?.ptFrequency) || "")
                setPtSound(JSON.parse(data?.ptSoundLvl) || "")
                setPtInsulation(JSON.parse(data?.ptInsulationRs) || "")

            }
        }
        
    }, [plannerByName.data, fatchPostData.data]);

    const saveValues = () => {
        let currentVal = ptcurrent === "" ? null : JSON.stringify(ptcurrent);
        let frequencyVal = ptfrequency === "" ? null : JSON.stringify(ptfrequency);
        let insulationVal = ptinsulation === "" ? null : JSON.stringify(ptinsulation);
        let soundVal = ptsound === "" ? null : JSON.stringify(ptsound);
        if (currentVal) {
            for (let i = 0; i < prePostStore.noOFSamples.length; i++) {
                if (!ptcurrent[`n${i + 1}`]) {
                    alertAndLoaders(
                        "UNSHOW_ALERT",
                        dispatch,
                        "Please ensure that all current fields are filled",
                        "warning"
                    );
                    return;
                }
            }
            updatePostCurrentResults({
                partCode: partCode,
                ptCurrent: currentVal,

            }).then((res) => {
                console.log(res);
                if (res.data !== null) {
                    alertAndLoaders("UNSHOW_ALERT", dispatch, "Post Test Current Values Are Saved... ", "success");
                } else if (res.error) {
                    alertAndLoaders("UNSHOW_ALERT", dispatch, "Something Went Wrong... ", "error");
                }
            });
        }
        if (soundVal) {
            for (let i = 0; i < prePostStore.noOFSamples.length; i++) {
                if (!ptsound[`n${i + 1}`]) {
                    alertAndLoaders(
                        "UNSHOW_ALERT",
                        dispatch,
                        "Please ensure that all sound fields are filled",
                        "warning"
                    );
                    return;
                }
            }
            updatePostSoundResults({
                partCode: partCode,
                ptSoundLvl: soundVal,
            }).then((res) => {
                console.log(res);
                if (res.data !== null) {
                    alertAndLoaders("UNSHOW_ALERT", dispatch, "Post Test Sound Values Are Saved... ", "success");
                } else if (res.error) {
                    alertAndLoaders("UNSHOW_ALERT", dispatch, "Something Went Wrong... ", "error");
                }
            });
        }
        if (insulationVal) {
            for (let i = 0; i < prePostStore.noOFSamples.length; i++) {
                if (!ptinsulation[`n${i + 1}`]) {
                    alertAndLoaders(
                        "UNSHOW_ALERT",
                        dispatch,
                        "Please ensure that all insulation fields are filled",
                        "warning"
                    );
                    return;
                }
            }
            updatePostInsulationResults({
                partCode: partCode,
                ptInsulationRs: insulationVal,
            }).then((res) => {
                console.log(res);
                if (res.data !== null) {
                    alertAndLoaders("UNSHOW_ALERT", dispatch, "Post Test Insulation Values Are Saved... ", "success");
                } else if (res.error) {
                    alertAndLoaders("UNSHOW_ALERT", dispatch, "Something Went Wrong... ", "error");
                }
            });
        }
        if (frequencyVal) {
            for (let i = 0; i < prePostStore.noOFSamples.length; i++) {
                if (!ptfrequency[`n${i + 1}`]) {
                    alertAndLoaders(
                        "UNSHOW_ALERT",
                        dispatch,
                        "Please ensure that all frequency fields are filled",
                        "warning"
                    );
                    return;
                }
            }
            updatePostFrequencyResults({
                partCode: partCode,
                ptFrequency: frequencyVal,
            }).then((res) => {
                console.log(res);
                if (res.data !== null) {
                    alertAndLoaders("UNSHOW_ALERT", dispatch, "Post Test Frequency Values Are Saved... ", "success");
                } else if (res.error) {
                    alertAndLoaders("UNSHOW_ALERT", dispatch, "Something Went Wrong... ", "error");
                }
            });
        }
    };

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
                            {prePostStore.noOFSamples.map((val, id) => {
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
                                            value={ptcurrent ? ptcurrent[`n${val}`] : ''}
                                            onChange={handleChange} /> : <MDTypography variant="h6" fontWeight="small" style={{ textAlign: "center", background: "#394259", padding: "5px 0px", borderRadius: "8px" }}>{ptcurrent ? ptcurrent[`n${val}`] : "N/A"}</MDTypography>}
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
                                            value={ptsound ? ptsound[`n${val}`] : ''}
                                            onChange={handleChange} /> : <MDTypography variant="h6" fontWeight="small" style={{ textAlign: "center", background: "#394259", padding: "5px 0px", borderRadius: "8px" }}>{ptsound ? ptsound[`n${val}`] : "N/A"}</MDTypography>}
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
                                    setPtFrequency((prevValues) => ({
                                        ...prevValues,
                                        [name]: value,
                                    }));
                                };
                                return (
                                    <Grid sm={2} m={1}>
                                        {show ? <TextField name={`n${val}`}
                                            value={ptfrequency ? ptfrequency[`n${val}`] : ''}
                                            onChange={handleChange} /> : <MDTypography variant="h6" fontWeight="small" style={{ textAlign: "center", background: "#394259", padding: "5px 0px", borderRadius: "8px" }}>{ptfrequency ? ptfrequency[`n${val}`] : "N/A"}</MDTypography>}
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
                                            value={ptinsulation ? ptinsulation[`n${val}`] : ''}
                                            onChange={handleChange} /> : <MDTypography variant="h6" fontWeight="small" style={{ textAlign: "center", background: "#394259", padding: "5px 0px", borderRadius: "8px" }}>{ptinsulation ? ptinsulation[`n${val}`] : "N/A"}</MDTypography>}
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
    );
}
