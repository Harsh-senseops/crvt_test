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
import { ALL_PRETEST_COMPONENT } from "apis/queries";
import { GET_POST_DATA } from "apis/queries";
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

function isValueNull(obj, noOFSamples, str) {
    let objLen = Object.keys(obj);
    let newObj = {};
    let isEmpty = false;
    objLen.map((keys) => {
        if (obj[keys] === "") {
            isEmpty = true;
        }
    })

    if (isEmpty || noOFSamples !== objLen.length) {
        console.log("ran")
        objLen.map((keys) => {
            newObj[keys] = str
        })
        return { isEmpty, newObj }
    }
    return {
        isEmpty,
    }
}

export default function PreResult({ partId }) {
    const [parameters, setParameters] = useState(null)
    const [show, setShow] = React.useState(false)
    const [showSamples, setShowSamples] = useState(false);
    const [noOfSamples, setNoOSamples] = useState([])
    const prePostStore = useSelector((store) => {
        return store.prePost;
    })

    const classes = useStyles();
    const [plannerByName, rexPlannerByName] = useQuery({
        query: ALL_PRETEST_COMPONENT
    })
    const [preTableData, rexPreTableData] = useSubscription({
        query: GET_POST_DATA,
        variables:{partId}
    });
    const dispatch = useDispatch();

    useEffect(() => {
        if (preTableData.data) {
            if (preTableData.data) {
                console.log(preTableData.data)
                setParameters(preTableData.data.allCrvtPostResultTables?.nodes);
            }
        }
    }, [preTableData.data])
    useEffect(() => {
        if (plannerByName.data) {
            if (plannerByName.data) {
                
            }
        }
    }, [plannerByName.data])

    const saveValues = () => {

    };

    const onCancel = () => {
        setShow(prev => !prev);
        rexFatchPreData({ requestPolicy: "network-only" });
    }

    const onEdit = () => {
        setShow(prev => !prev);
        rexFatchPreData({ requestPolicy: "network-only" });
    
    }

    console.log(parameters)
    return (
        <>
            <Card style={{ margin: "12px" }}>
                <MDTypography variant="h6" fontWeight="medium">Pre Test Values</MDTypography>

                {/* {parameters && parameters.parameters.map((p_val, i) => {
                    return (
                        <Grid>
                            {prePostStore.noOFSamples.length === 0 || undefined ? "" :
                    <> <Grid container marginBottom={2} style={{ display: "flex", justifyContent: "space-around" }}>
                        {prePostStore.noOFSamples.map((val) => {
                            return (
                                <Grid lg={3}>
                                    <MDTypography variant="h6" fontWeight="small" style={{ textAlign: "center" }}>N{val}</MDTypography>
                                </Grid>
                            )
                        })}
                    </Grid>
                        <Grid className={classes.parentFlexRight}>
                            {!show ? <MDButton color="info"
                                onClick={onEdit}>
                                Edit
                            </MDButton> : <div style={{ display: "flex", gap: "15px" }}>
                                <MDButton color="error" onClick={saveValues}>
                                    Save
                                </MDButton>
                                <MDButton color="dark" onClick={onCancel}>
                                    Cancel
                                </MDButton>
                            </div>}
                        </Grid>
                    </>}
                        </Grid>)
                })} */}
               
            </Card>
        </>
    )
}