import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import MDTypography from "components/MDTypography";
import MDButton from 'components/MDButton';
import { Grid } from '@mui/material';
import { makeStyles } from "@mui/styles";
import { Box } from '@mui/material';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';

const useStyles = makeStyles((theme) => ({

    parentFlexRight: {
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: '2%',
        marginRight: '3%'
    },
}))

export default function UploadImage() {
    const classes = useStyles();

    return (
        <>
            <Box >
                <Card>
                    <CardHeader
                        title={<MDTypography variant="h6" fontWeight="medium">Upload Image</MDTypography>}
                    />
                    <Card style={{ background: "#394259", margin: "12px", alignItems: "center" }}>
                        <Grid
                            style={{
                                position: "relative",
                                marginTop:"12px",
                                width: "30rem",
                                height: "200px",
                                border: "2px dashed #277BC0",
                                borderRadius: "20px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "#394259",
                            }}
                            className="drop-file-input"
                        >
                            <div className="drop-file-input__label">
                                <MDTypography variant="h1" fontWeight="regular" color="secondary">
                                <AddPhotoAlternateOutlinedIcon/>
                                </MDTypography>
                            </div>
                            <input type="file" value="" />
                        </Grid>
                        <Grid m={2}>
                            <MDButton style={{ marginRight: "8px", background:"#1A73E8",color:"white" }}>
                                Upload
                            </MDButton>
                            <MDButton style={{background:"#1A73E8",color:"white"}}>
                                Cancel
                            </MDButton>
                        </Grid>
                    </Card>
                </Card>
            </Box>
        </>
    );
}
