import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CancelIcon from "@mui/icons-material/Cancel";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { useMutation, useQuery, useSubscription } from "urql";
import { UPLOAD_POST_IMAGES } from "apis/queries";
import alertAndLoaders from "utils/alertAndLoaders";
import { useDispatch } from "react-redux";
import { IMAGE_FETCH } from "apis/queries";
import CheckIcon from '@mui/icons-material/Check';

const useStyles = makeStyles((theme) => ({
  parentFlexRight: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "2%",
    marginRight: "3%",
  },
}));

export default function UploadImage({ partCode }) {
  const classes = useStyles();
  const [selectedImage, setSelectedImage] = useState([]);
  const [uploadImage, upoadImageResults] = useMutation(UPLOAD_POST_IMAGES);
  const [fetchedImage, setFetchedImage] = useState(false);
  const [fetchImage, rexFetchImage] = useSubscription({
    query: IMAGE_FETCH,
    variables: { partCode },
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (fetchImage.data) {
      if (fetchImage.data?.crvtPostResultTableByPartCode?.postImages) {
        setFetchedImage(true);
        // console.log(fetchImage.data?.crvtPostResultTableByPartCode?.postImages)
        let data = JSON.parse(fetchImage.data?.crvtPostResultTableByPartCode.postImages);
        setSelectedImage([]);
        for (let key in data) {
          setSelectedImage((prev) => [...prev, data[key]]);
          // console.log(data[key])
        }
      }
    }
  }, [fetchImage.data]);

  const handleUpload = async () => {
    let arr = [];
    selectedImage.map(async (val) => {
      if (typeof val === "string") {
        arr.push(val);
      }
      await getBase64(val).then((res) => {
        arr.push(res);
      });
    });

    setTimeout(() => {
      // console.log(arr.length, arr)
      let obj = {};
      arr.map((val, i) => {
        obj[`img${i + 1}`] = val;
      });
      upoadImageResults({
        partCode: partCode,
        postImages: JSON.stringify(obj),
      }).then((res) => {
        // console.log(res)
        if (res.data) {
          alertAndLoaders("UNSHOW_ALERT", dispatch, "Images Are Uploaded... ", "success");
        } else if (res.error) {
          alertAndLoaders("UNSHOW_ALERT", dispatch, "Something Went Wrong... ", "error");
        }
      });
    }, 2000);
  };
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result.split(",")[1]); // Extract the actual Base64-encoded data
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    let tempArray = [...selectedImage];
    tempArray.splice(index, 1);
    setSelectedImage(tempArray);
    // console.log(index, "RE")
  };
  console.log(typeof selectedImage[0], typeof selectedImage[1], selectedImage);
  // console.log(selectedImage[0]&&selectedImage[0].split(',', 2));
  return (
    <>
      <Box>
        <Card>
          <CardHeader
            title={
              <MDTypography variant="h6" fontWeight="medium">
                Upload Image
              </MDTypography>
            }
          />
          <Card style={{ background: "#394259", margin: "12px", alignItems: "center" }}>
            <Grid
              style={{
                position: "relative",
                marginTop: "12px",
                width: "36rem",
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
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                {!selectedImage[0] ? (
                  <MDTypography variant="h1" fontWeight="regular" color="secondary">
                    <label htmlFor="inputImage1">
                      <AddPhotoAlternateOutlinedIcon />
                    </label>
                    <input
                      id="inputImage1"
                      type="file"
                      name="Image1"
                      onChange={(event) => {
                        setSelectedImage((prev) => [...prev, event.target.files[0]]);
                      }}
                      style={{ display: "none" }}
                    />
                  </MDTypography>
                ) : (
                  <div style={{ width: "30%", height: "100%" }}>
                    {typeof selectedImage[0] === "string" ? (
                        <>
                         <CheckIcon
                          className="cancel"
                          color="success"
                          style={{
                            position: "relative",
                            right: "-160px",
                            bottom: "-32px",
                          }}
                          onClick={() => removeImage(1)}
                        />
                      <img
                        alt="not found"
                        style={{ marginTop: "12px", width: "100%", height: "60%" }}
                        src={"data:image/png;base64," + selectedImage[0]}
                        />
                        </>
                    ) : (
                      <>
                        <CancelIcon
                          className="cancel"
                          color="error"
                          style={{
                            position: "relative",
                            right: "-160px",
                            bottom: "-32px",
                          }}
                          onClick={() => removeImage(0)}
                        />
                        <img
                          alt="not found"
                          style={{ marginTop: "12px", width: "100%", height: "60%" }}
                          src={URL.createObjectURL(selectedImage[0])}
                        />
                      </>
                    )}
                  </div>
                )}
                {!selectedImage[1] ? (
                  <MDTypography variant="h1" fontWeight="regular" color="secondary">
                    <label htmlFor="inputImage2">
                      <AddPhotoAlternateOutlinedIcon />
                    </label>
                    <input
                      id="inputImage2"
                      type="file"
                      name="Image2"
                      onChange={(event) => {
                        // console.log(event.target.files);
                        setSelectedImage((prev) => [...prev, event.target.files[0]]);
                      }}
                      style={{ display: "none" }}
                    />
                  </MDTypography>
                ) : (
                  <div style={{ width: "30%", height: "100%" }}>
                    {typeof selectedImage[1] === "string" ? (
                        <>
                        <CheckIcon
                          className="cancel"
                          color="success"
                          style={{
                            position: "relative",
                            right: "-160px",
                            bottom: "-32px",
                          }}
                          onClick={() => removeImage(1)}
                        />
                      <img
                        alt="not found"
                        style={{ marginTop: "12px", width: "100%", height: "60%" }}
                        src={"data:image/png;base64," + selectedImage[1]}
                        />
                        </>
                    ) : (
                      <>
                        <CancelIcon
                          className="cancel"
                          color="error"
                          style={{
                            position: "relative",
                            right: "-160px",
                            bottom: "-32px",
                          }}
                          onClick={() => removeImage(1)}
                        />
                        <img
                          alt="not found"
                          style={{ marginTop: "12px", width: "100%", height: "60%", }}
                          src={URL.createObjectURL(selectedImage[1])}
                        />
                      </>
                    )}
                  </div>
                )}
                {!selectedImage[2] ? (
                  <MDTypography variant="h1" fontWeight="regular" color="secondary">
                    <label htmlFor="inputImage3">
                      <AddPhotoAlternateOutlinedIcon />
                    </label>
                    <input
                      id="inputImage3"
                      type="file"
                      name="Image3"
                      onChange={(event) => {
                        // console.log(event.target.files);
                        setSelectedImage((prev) => [...prev, event.target.files[0]]);
                      }}
                      style={{ display: "none" }}
                    />
                  </MDTypography>
                ) : (
                  <div style={{ height: "100%", width: "30%" }}>
                    {typeof selectedImage[2] === "string" ? (
                        <>
                         <CheckIcon
                          className="cancel"
                          color="success"
                          style={{
                            position: "relative",
                            right: "-160px",
                            bottom: "-32px",
                          }}
                          onClick={() => removeImage(1)}
                        />
                      <img
                        alt="not found"
                        style={{ marginTop: "12px", width: "100%", height: "60%" }}
                        src={"data:image/png;base64," + selectedImage[2]}
                        />
                        </>
                    ) : (
                      <>
                        <CancelIcon
                          className="cancel"
                          color="error"
                          style={{
                            position: "relative",
                            right: "-160px",
                            bottom: "-32px",
                          }}
                          onClick={() => removeImage(2)}
                        />
                        <img
                          alt="not found"
                          style={{ marginTop: "12px", width: "100%", height: "60%" }}
                          src={URL.createObjectURL(selectedImage[2])}
                        />
                      </>
                    )}
                    {/* <img
                                                alt="not found"
                                                style={{ marginTop: "12px", width: "100%", height: "60%" }}
                                                src={typeof(selectedImage[2]) === "string" ? "data:image/png;base64,"+selectedImage[0] : URL.createObjectURL(selectedImage[2])}
                                            /> */}
                  </div>
                )}
              </div>
            </Grid>
            <Grid m={2}>
              <MDButton
                style={{ marginRight: "8px", background: "#1A73E8", color: "white" }}
                onClick={handleUpload}
              >
                Upload
              </MDButton>
              <MDButton
                style={{ background: "#1A73E8", color: "white" }}
                onClick={() => {
                  alert("Cancel");
                }}
              >
                Cancel
              </MDButton>
            </Grid>
          </Card>
        </Card>
      </Box>
    </>
  );
}
