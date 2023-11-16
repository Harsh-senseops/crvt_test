import React, { useRef, useState } from "react";
import { useMutation, useSubscription } from "urql";
import PropTypes from "prop-types";
import * as XLSX from "xlsx";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Grid from "@mui/material/Grid";
import "./drop-file-input.css";
import { CREATE_VENDORS } from "apis/queries";
import masterPartDetailsMaker from "utils/masterPartListCalculation";
import ImageConfig from "../config";
import uploadImg from "../../../../assets/cloud-upload-regular-240.png";
import { useQuery } from "urql";
import {
  MAKE_YEARLY_PLANNER,
  PART_CODE_DETAILS,
  ADD_YEARLY_HISTORY,
  ADD_NOTIFICATION,
} from "apis/queries";
import * as yearlyPlanner from "../../../../reduxSlices/yearlyPlanner";
import { useDispatch, useSelector } from "react-redux";
import alertAndLoaders from "utils/alertAndLoaders";
import Backdrop from "@mui/material/Backdrop";
import { Box, Card, CardContent } from "@mui/material";

function checkElement(val, array) {
  const pos = array.map((e) => e["vendor_code"]).indexOf(val);
  if (pos === -1) {
    return false;
  }
  return true;
}

const DropFileInput = (props) => {
  const [open, setOpen] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const wrapperRef = useRef(null);
  const [data, setData] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [fileName, setFileName] = useState("");
  const [shouldPause, setShouldPause] = useState(true);
  const [makePlanner, setMakePlanner] = useState(false);
  const [masterPartDetails, setMasterPartListDetails] = useState("");

  const store = useSelector((store) => {
    return store.userRoles;
  });
  const dispatch = useDispatch();
  const [showDragAndDrop, setDragAndDrop] = useState(true);

  const [createVendorRes, createVendor] = useMutation(CREATE_VENDORS);
  const [addNotificationRes, createNotification] = useMutation(ADD_NOTIFICATION);
  const [createYearlyHistoryRes, createHistory] = useMutation(ADD_YEARLY_HISTORY);
  const [createYearlyPlannerRed, createYearlyPlanner] = useMutation(MAKE_YEARLY_PLANNER);

  const [partCodeDetails, createPartCodeDetails] = useMutation(PART_CODE_DETAILS);

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");

  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const convertExcelToJson = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      setFileName(file.name);
      dispatch(yearlyPlanner.setFileName(file.name));
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });

          const jsonData = {};
          workbook.SheetNames.forEach((sheetName) => {
            const worksheet = workbook.Sheets[sheetName];
            const sheetData = XLSX.utils.sheet_to_json(worksheet, {
              header: 1,
            });
            jsonData[sheetName] = sheetData.map((row) => {
              const rowData = {};
              row.forEach((cell, columnIndex) => {
                const columnName = sheetData[0][columnIndex];
                rowData[columnName] = cell;
              });
              return rowData;
            });
          });
          const worksheetToPrint = workbook.Sheets["MASTER PART LIST"];
          const mergedCells = worksheetToPrint["!merges"];
          mergedCells.map((val) => {
            const start = val.s;
            const end = val.e;
            for (let i = start.r; i <= end.r; i++) {
              if (i === start.r) {
                jsonData["MASTER PART LIST"][i]["COMMON"] = `common ${start.r}`;
              } else {
                jsonData["MASTER PART LIST"][i]["COUNT"] = "false";
              }
            }
          });
          resolve(jsonData);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsArrayBuffer(file);
    });
  };

  function handleFileChange(event) {
    let tempArr = [];
    const file = event.target.files[0];
    if (file) {
      // let tempMasterPartList = [];
      const updatedList = [file];
      setFileList(updatedList);
      convertExcelToJson(file)
        .then((jsonData) => {
          setMasterPartListDetails(masterPartDetailsMaker(jsonData["MASTER PART LIST"]));
          setData(jsonData["MASTER PART LIST"]);
          jsonData["MASTER PART LIST"].map((val) => {
            if (checkElement(val["Vendor Code"], tempArr)) {
              return;
            }
            tempArr.push({
              vendor_name: val["Vendor Name"],
              vendor_code: val["Vendor Code"],
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setVendors(tempArr);
  }

  const fileRemove = () => {
    const updatedList = [];
    setFileList(updatedList);
    props.onFileChange(updatedList);
  };

  //Convert input to boolean
  const booleanConversion = (data) => {
    if (data == 1) {
      return true;
    } else {
      return false;
    }
  };

  const pushData = async (e) => {
    e.preventDefault();
    const updatedList = [];
    setFileList(updatedList);
    props.onFileChange(updatedList);
    setDragAndDrop(false);
    setMakePlanner(true);

    if (masterPartDetails.length === 0) {
      alertAndLoaders("UNSHOW_ALERT", dispatch, "The master part list is inaccurate.", "warning");
      return;
    }
    setOpen(true);
    let timer = setInterval(() => {
      setProgress((prev) => {
        let newProgress = prev + 1;
        if (prev === 100) {
          setOpen(false);
          clearInterval(timer);
          alertAndLoaders(
            "UNSHOW_ALERT",
            dispatch,
            "Successfully Created Yearly Planner",
            "success"
          );
          newProgress = 0;
        }
        return newProgress;
      });
    }, 40);

    createYearlyPlanner().then((res) => {
      masterPartDetails.map((val, i) => {
        val.partCode.map(async (val1) => {
          await createPartCodeDetails({
            he6t: val1.details.HE6T,
            hhhd: val1.details.HHHD,
            hhhg: val1.details.HHHG,
            hhhu: val1.details.HHHU,
            hm4n: val1.details.HM4N,
            hm5v: val1.details.HM5V,
            hm6c: val1.details.HM6C,
            partCode: val1.partCode,
            partName: val.partName,
            count: val.partCount,
            vendorDetails: JSON.stringify(val1.details.vendorsInfo),
          }).then((res) => {
            if (!res.data?.createCrvtPartCodeDetail) {
              //handle error situation over here
            } else if (res.data?.createCrvtPartCodeDetail) {
              console.log(i);
              dispatch(yearlyPlanner.setShouldPause(false));
            }
          });
        });
      });
      createNotification({
        empCode: store.empCode,
        message: "New Planner Created",
        notificationFrom: "Planner",
        description: `New Planner was created by the user ${store.empCode}`,
      });
    });

    createHistory({
      fileName,
      empCode: store.empCode,
    }).then((result) => {
      if (result.error) {
        console.log(result.error);
      }
    });
  };

  return (
    <>
      <Grid mb={6} mt={2}>
        {fileList.length > 0 ? (
          <Box className="drop-file-preview">
            <Card>
              <CardContent style={{ textAlign: "center" }}>
                <MDTypography variant="h5" fontWeight="medium" style={{}}>
                  Ready to Upload
                </MDTypography>
                {fileList.map((item, index) => (
                  <div
                    className="drop-file-preview__item"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <img src={ImageConfig[item.type.split("/")[1]] || ImageConfig.default} alt="" />
                    <div className="drop-file-preview__item__info">
                      <MDTypography variant="button" fontWeight="regular">
                        {item.name}
                      </MDTypography>
                    </div>
                  </div>
                ))}
                <MDButton color="error" type="submit" onClick={(e) => pushData(e)}>
                  Upload
                </MDButton>
                <MDButton style={{ marginLeft: "20px" }} color="dark" onClick={() => fileRemove()}>
                  Cancel
                </MDButton>
              </CardContent>
            </Card>
          </Box>
        ) : (
          <div
            style={{
              position: "relative",
              width: "30rem",
              height: "200px",
              border: "2px dashed #277BC0",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#394259",
            }}
            ref={wrapperRef}
            className="drop-file-input"
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
          >
            <div className="drop-file-input__label">
              <img src={uploadImg} alt="" />
              <MDTypography variant="h5" fontWeight="regular" color="secondary">
                Drag & Drop Master Part List file here
              </MDTypography>
            </div>
            <input type="file" accept=".xlsx" value="" onChange={handleFileChange} />
          </div>
        )}

        <Backdrop
          sx={{
            background: "#rgba(32, 41, 64, 0.75)",
            color: "whitesmoke",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={open}
        >
          <Card
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "60%",
              height: "90px",
              background: "#394259",
              marginLeft: "280px",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "-6px",
              }}
            >
              <div
                style={{
                  width: "70%",
                  height: "12px",
                  background: "#202940",
                  borderRadius: "12px",
                }}
              >
                <div
                  style={{
                    width: `${progress}%`,
                    background: "#F44335",
                    borderRadius: "12px",
                    transition: "width 0.2s",
                    height: "12px",
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "10px",
                      float: "right",
                      fontWeight: "bolder",
                      color: "whitesmoke",
                      paddingBottom: "5px",
                      position: "relative",
                      bottom: "2px",
                    }}
                  >
                    {progress + "%"}
                  </span>
                </div>
              </div>
              <br />
              <MDTypography
                variant="h5"
                fontWeight="regular"
                style={{
                  color: "whitesmoke",
                  position: "relative",
                  bottom: "-10px",
                }}
              >
                Creating yearly planner...
              </MDTypography>
            </div>
          </Card>
        </Backdrop>
      </Grid>
    </>
  );
};

DropFileInput.propTypes = {
  onFileChange: PropTypes.func,
};

export default DropFileInput;
