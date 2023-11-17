import React from "react";
// import PreTest from "./PreTest";
import PostTest from "./PostTest";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import MDTypography from "components/MDTypography";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '100%',
        margin: '1%'
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
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

export default function PrePostTest({ id }) {
    const [expanded, setExpanded] = React.useState(false);

    const classes = useStyles();
    
    return (
        <>
            <Card style={{ marginTop: '2%' }}>
                <CardHeader
                        onClick={() => setExpanded(!expanded)}
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
                                className={clsx(classes.expand, {
                                    [classes.expandOpen]: expanded,
                                })}
                                // onClick={() => setExpanded(!expanded)}
                                aria-expanded={expanded}
                                aria-label="show more"
                                color='info'
                            >
                                <ExpandMoreIcon />
                            </IconButton>
                        </div>
                    }
                    title={<MDTypography variant="h6" fontWeight="medium">Pre and Post Test</MDTypography>}
                    subheader={<MDTypography style={{ color: '#FB8C00', fontSize: '14px', paddingTop: '1%' }}>Configure Pre-Post Test Details</MDTypography>}
                />
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <form onSubmit={(e) => handleFormSubmit(e)}>
                        <CardContent>
                            <Card style={{ background: '#394259' }} >
                                {/* <PreTest id={id}/> */}
                                <PostTest id={id} />
                            </Card>
                        </CardContent>

                    </form>
                </Collapse>
            </Card >
        </>
    )
}