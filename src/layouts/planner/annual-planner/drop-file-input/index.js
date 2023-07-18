import React, { useRef, useState } from "react";
import { useMutation, useSubscription } from "urql";
import PropTypes from "prop-types";
import * as XLSX from "xlsx";
import { useCallback } from "react";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Grid from "@mui/material/Grid";
import "./drop-file-input.css";
import { CREATE_VENDORS } from "apis/queries";
import masterPartDetailsMaker from "utils/masterPartListCalculation";
import ImageConfig from "../config";
import uploadImg from "../../../../assets/cloud-upload-regular-240.png";
import { useQuery } from "urql";
import { MAKE_YEARLY_PLANNER, PART_CODE_DETAILS,ADD_YEARLY_HISTORY } from "apis/queries";
import * as yearlyPlanner from "../../../../reduxSlices/yearlyPlanner";
import { useDispatch,useSelector } from "react-redux";

function checkElement(val, array) {
  const pos = array.map((e) => e["vendor_code"]).indexOf(val);
  if (pos === -1) {
    return false;
  }

  return true;
}

const DropFileInput = (props) => {
  const wrapperRef = useRef(null);
  const [data, setData] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [fileName,setFileName] = useState("")
  const [shouldPause, setShouldPause] = useState(true);
  const [makePlanner, setMakePlanner] = useState(false);
  const [masterPartDetails, setMasterPartListDetails] = useState("");
  const store = useSelector((store)=>{
    return store.userRoles
  })
  const [createYearlyPlanner, rexYearlyPlanner] = useQuery({
    query: MAKE_YEARLY_PLANNER,
    variables: { makePlanner },
    // pause:shouldPause
  });
  const dispatch = useDispatch();
  // console.log(createYearlyPlanner);
  const [showDragAndDrop, setDragAndDrop] = useState(true);

  const [createVendorRes, createVendor] = useMutation(CREATE_VENDORS);
  const [createYearlyHistoryRes, createHistory] = useMutation(ADD_YEARLY_HISTORY);

  const [partCodeDetails, createPartCodeDetails] = useMutation(PART_CODE_DETAILS);

  // console.log("Create master part list qry data", createMasterPartListQryData)

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
            const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
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
      let tempMasterPartList = [];
      const updatedList = [file];
      setFileList(updatedList);
      convertExcelToJson(file)
        .then((jsonData) => {
          masterPartDetailsMaker(tempMasterPartList, jsonData["MASTER PART LIST"]);
          setMasterPartListDetails(tempMasterPartList);
          tempMasterPartList = [];
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
          console.error("Error converting Excel to JSON:", error);
        });
    }
    setVendors(tempArr);
  }

  const fileRemove = () => {
    const updatedList = [];
    setFileList(updatedList);
    // const {onFileChange} = props
    // onFileChange(updatedList)
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

  const pushData = (e) => {
    e.preventDefault();
    const updatedList = [];
    setFileList(updatedList);
    props.onFileChange(updatedList);
    setMakePlanner(true);
    rexYearlyPlanner()
    
    //   createHistory({
    //     fileName,
    //     empCode:store.empCode
    //   }).then((result)=>{
    //     console.log(result,"result1234")
    //   })

    // masterPartDetails.map((val) => {
    //   val.partCode.map((val1) => {
    //     createPartCodeDetails({
    //       he6t: val1.details.HE6T,
    //       hhhd: val1.details.HHHD,
    //       hhhg: val1.details.HHHG,
    //       hhhu: val1.details.HHHU,
    //       hm4n: val1.details.HM4N,
    //       hm5v: val1.details.HM5V,
    //       hm6c: val1.details.HM6C,
    //       partCode: val1.partCode,
    //       partName: val.partName,
    //       count: val.partCount,
    //       vendorDetails: JSON.stringify(val1.details.vendorsInfo),
    //     }).then((res) => {
    //       dispatch(yearlyPlanner.setShouldPause(false))
    //     });
    //     // console.log(typeof(val1.details.HHHD),val.partName,val1.partCode,JSON.stringify(val1.details.vendorsInfo))
    //   });
    // });
  };

  return (
    <>
        <Grid mb={6} mt={2}>
          {fileList.length > 0 ? (
            <div className="drop-file-preview">
              <MDTypography variant="h5" fontWeight="medium">
                Ready to upload
              </MDTypography>
              <form>
                {fileList.map((item, index) => (
                  <div className="drop-file-preview__item">
                    <img src={ImageConfig[item.type.split("/")[1]] || ImageConfig.default} alt="" />
                    <div className="drop-file-preview__item__info">
                      <MDTypography variant="button" fontWeight="regular">
                        {item.name}
                      </MDTypography>
                    </div>
                  </div>
                ))}

                <MDButton color="light" onClick={() => fileRemove()}>
                  Cancel
                </MDButton>
                <MDButton color="info" type="submit" onClick={(e) => pushData(e)}>
                  Upload
                </MDButton>
              </form>
            </div>
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
        </Grid>
    </>
  );
};

DropFileInput.propTypes = {
  onFileChange: PropTypes.func,
};

export default DropFileInput;
