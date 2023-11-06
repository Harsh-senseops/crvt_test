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
import { ALL_PRETEST_COMPONENT, } from "apis/queries";
import { setNoOfSamples } from "reduxSlices/prePost";
import { GET_POST_DATA } from "apis/queries";

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

export default function PostResult({ partId }) {
    const [show, setShow] = useState(false);
    const [parameters,setParameters]=useState(null)
    const classes = useStyles();

    const prePostStore = useSelector((store) => {
        return store.prePost;
    });
  
    const [plannerByName, rexPlannerByName] = useQuery({
        query: ALL_PRETEST_COMPONENT,
    });
    const [postTestDetailsById,rexPostTestDataById]=useSubscription({
        query: GET_POST_DATA,
        variables: { partId: partCode },
    })

    const dispatch = useDispatch();

    useEffect(() => {
        if (postTestDetailsById.data) {
            if(postTestDetailsById.data){
                console.log(postTestDetailsById.data)
              setParameters(JSON.parse(preTestDetailsById.data.crvtPostTestTableByComponentId?.ptParameter));
            }
          }
        
    }, [postTestDetailsById.data]);

    const saveValues = () => {
        
    };

    return (
        <>
            <Card style={{ margin: "12px" }}>
                <CardHeader
                    title={<MDTypography variant="h6" fontWeight="medium">Post Test Values</MDTypography>}
                />
                {prePostStore.noOFSamples.length === 0 || undefined ? "" :

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
                        </Grid>}
            </Card>
        </>
    );
}
