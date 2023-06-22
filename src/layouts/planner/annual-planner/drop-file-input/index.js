import React, { useRef, useState } from "react";
import { useMutation, useSubscription } from "urql";
import PropTypes from "prop-types";
import * as XLSX from "xlsx";
import { useCallback } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { makeStyles } from "@mui/styles";
import Shower from "../shower";
import "./drop-file-input.css";
import { CREATE_VENDORS } from "apis/queries";

import ImageConfig from "../config";
import uploadImg from "../../../../assets/cloud-upload-regular-240.png";
import { useQuery } from "urql";
import { MAKE_YEARLY_PLANNER } from "apis/queries";

const createMasterPartListQry = `mutation ($InpSno: Int, $InpCommon:String, $InpHhhd:Boolean , $InpHhhg:Boolean, $InpHhhu:Boolean, $Inphm4N: Boolean, $Inphm5V: Boolean, $InpHm6C:Boolean, $InpPartcode: String, $InpRowlabels: Int, $InpPartname: String, $InpVendorName: String) {
    createMasterPartListDetail(
      input: {masterPartListDetail: { sno: $InpSno, common: $InpCommon, hhhd:$InpHhhd, hhhg:$InpHhhg, hhhu: $InpHhhu, hm4N: $Inphm4N, hm5V: $Inphm5V, hm6C: $InpHm6C, partcode: $InpPartcode, rowlabels: $InpRowlabels, partname: $InpPartname, vendorName: $InpVendorName }}
    ) {
      clientMutationId
    }
  }`;

const createMasterListMutation = `mutation createMasterPartListDetail($InpCommon:String!) {
    createMasterPartListDetail(input: { masterPartListDetail: { common: $InpCommon }}) {
      clientMutationId
    }
  }
  `;

//   const createMasterPartListQry = `mutation ($inpHhhd:Boolean , $inpHhhg:Boolean, $inpHhhu:Boolean, $inphm4N: Boolean, $inphm5V: Boolean, $inpHm6C:Boolean ) {
//     createMasterPartListDetail(
//       input: {masterPartListDetail: { hhhd:$inpHhhd, hhhg:$inpHhhg, hhhu: $inpHhhu, hm4N: $inphm4N, hm5V: $inphm5V, hm6C: $inpHm6C }}
//     ) {
//       clientMutationId
//     }
//   }`

//   const createMasterPartListQry = `mutation createMasterPartListDetail {
//     createMasterPartListDetail(
//       input: {masterPartListDetail: { common: "Common", hhhd: true, hhhg: true, hhhu: true, hm4N: true, hm5V: true, hm6C: true, partcode: "35010-AAB-0010", rowlabels: 100214, partname: "KEY SET", vendorName: "SANDHAR AUTOMOTIVES GURGAON" }}
//     ) {
//       clientMutationId
//     }
//   }`

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
  const [excelFile, setExcelFile] = useState(null);
  const [vendors, setVendors] = useState([]);
  const [shouldPause,setShouldPause] = useState(true);
  const [makePlanner,setMakePlanner] = useState(false);
  const [createYearlyPlanner,rexYearlyPlanner] = useQuery({
    query:MAKE_YEARLY_PLANNER,
    variables:{makePlanner},
    // pause:shouldPause
  })
  console.log(createYearlyPlanner);
  const [showDragAndDrop,setDragAndDrop] = useState(true)
  const [createMasterPartListQryData, createMasterPartListQryDataRecord] =
    useMutation(createMasterPartListQry);

  const [createVendorRes, createVendor] = useMutation(CREATE_VENDORS);

  const [createMasterListMutationData, createMasterListMutationRecord] =
    useMutation(createMasterListMutation);

  // console.log("Create master part list qry data", createMasterPartListQryData)

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");

  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const convertExcelToJson = (file) => {    
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
    
        reader.onload = (e) => {
          try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
    
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
              const mergedCells = worksheetToPrint['!merges'];
              mergedCells.map((val)=>{
                const start = val.s;
                const end = val.e;
                for(let i = start.r;i<=end.r;i++){
                    if(i===start.r){
                        jsonData["MASTER PART LIST"][i]["COMMON"] = `common ${start.r}`
                    }else{
                        jsonData["MASTER PART LIST"][i]["COUNT"] = "false"
                    }
                }
                // console.log(jsonData["MASTER PART LIST"][start.r]["COMMON"],jsonData["MASTER PART LIST"][end.r])
             })
    
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
    let v = [];
    const file = event.target.files[0];
    if (file) {
      const updatedList = [file];
      setFileList(updatedList);
      convertExcelToJson(file).then((jsonData) => {
        setData(jsonData["MASTER PART LIST"]);
        jsonData["MASTER PART LIST"].map((val) => {
          if (checkElement(val["Vendor Code"], v)) {
            return;
          }
          v.push({
            vendor_name: val["Vendor Name"],
            vendor_code: val["Vendor Code"],
          });
        });
      })
      .catch((error) => {
        console.error("Error converting Excel to JSON:", error);
      });
    }
    setVendors(v);
    console.log(data)
  }

  const fileRemove = () => {
    const updatedList = [];
    setFileList(updatedList);
    // const {onFileChange} = props
    // onFileChange(updatedList)
    props.onFileChange(updatedList);
  };

  const createMasterPartListRecord = useCallback((data) => {
    createMasterPartListQryDataRecord(data).then((result) => {
      if (result.error) {
        console.error("Oh no master part list error!", result.error);
        return false;
      }
      console.log("Data saved successfully");
      return true;
    });
  });

  //Convert input to boolean
  const booleanConversion = (data) => {
    // console.log("Boolean converion data", data)
    if (data == 1) {
      return true;
    } else {
      return false;
    }
  };

  const pushData = (e) =>{
    e.preventDefault();
    const updatedList = [];
    setFileList(updatedList);
    // const {onFileChange} = props
    // onFileChange(updatedList)
    props.onFileChange(updatedList);
    setDragAndDrop(false)
    setMakePlanner(true)
    rexYearlyPlanner();
    localStorage.setItem("showdad","false")
  }

  return (
    <>
     {showDragAndDrop? <Grid mb={6} mt={2}>
        {fileList.length > 0 ? (
          <div className="drop-file-preview">
            <MDTypography variant="h5" fontWeight="medium">
              Ready to upload
            </MDTypography>
            {/* <p style={{fontSize:"10px"}}>{JSON.stringify(data)}</p> */}
            <form>
              {fileList.map((item, index) => (
                <div className="drop-file-preview__item">
                  <img src={ImageConfig[item.type.split("/")[1]] || ImageConfig.default} alt="" />
                  <div className="drop-file-preview__item__info">
                    <MDTypography variant="button" fontWeight="regular">
                      {item.name}
                    </MDTypography>
                    {/* <p>{item.size}B</p> */}
                  </div>
                  {/* <button type='button' className="drop-file-preview__item__del" onClick={() => fileRemove(item)}>x</button> */}
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
              backgroundColor: "#EEF1FF",
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
      </Grid>:""}
    </>
  );
};

DropFileInput.propTypes = {
  onFileChange: PropTypes.func,
};

export default DropFileInput;
