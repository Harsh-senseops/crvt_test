import React, { useRef, useState } from 'react';
import { useMutation, useSubscription } from "urql";
import PropTypes from 'prop-types';
import * as XLSX from "xlsx";
import { useCallback } from 'react';

import MDTypography from 'components/MDTypography';
import MDButton from 'components/MDButton';
import Grid from "@mui/material/Grid";

import { makeStyles } from '@mui/styles';

import './drop-file-input.css';
import { CREATE_VENDORS } from 'apis/queries';

import ImageConfig from '../config';
import uploadImg from "../../../../assets/cloud-upload-regular-240.png"

const createMasterPartListQry = `mutation ($InpSno: Int, $InpCommon:String, $InpHhhd:Boolean , $InpHhhg:Boolean, $InpHhhu:Boolean, $Inphm4N: Boolean, $Inphm5V: Boolean, $InpHm6C:Boolean, $InpPartcode: String, $InpRowlabels: Int, $InpPartname: String, $InpVendorName: String) {
    createMasterPartListDetail(
      input: {masterPartListDetail: { sno: $InpSno, common: $InpCommon, hhhd:$InpHhhd, hhhg:$InpHhhg, hhhu: $InpHhhu, hm4N: $Inphm4N, hm5V: $Inphm5V, hm6C: $InpHm6C, partcode: $InpPartcode, rowlabels: $InpRowlabels, partname: $InpPartname, vendorName: $InpVendorName }}
    ) {
      clientMutationId
    }
  }`

const createMasterListMutation = `mutation createMasterPartListDetail($InpCommon:String!) {
    createMasterPartListDetail(input: { masterPartListDetail: { common: $InpCommon }}) {
      clientMutationId
    }
  }
  `

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


function checkElement(val,array){
  
        const pos = array.map(e => e["vendor_code"]).indexOf(val);
        if(pos === -1){
            return false
        }
        
    
    return true
}


const DropFileInput = props => {

    const wrapperRef = useRef(null);
    const [data,setData] = useState([]);
    const [fileList, setFileList] = useState([]);
    const [excelFile, setExcelFile] = useState(null);
    const [vendors,setVendors] = useState([]);

    const [
        createMasterPartListQryData,
        createMasterPartListQryDataRecord,
      ] = useMutation(createMasterPartListQry);

      const [createVendorRes,createVendor] = useMutation(CREATE_VENDORS)

    const [createMasterListMutationData, createMasterListMutationRecord] = useMutation(createMasterListMutation)


    // console.log("Create master part list qry data", createMasterPartListQryData)

    const onDragEnter = () => wrapperRef.current.classList.add('dragover');

    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

    const onDrop = () => wrapperRef.current.classList.remove('dragover');

    // const onFileDrop = (e) => {
    //     const newFile = e.target.files[0];
    //     const fileTypesAllowed = [
    //         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    //         "application/vnd.oasis.opendocument.spreadsheet",
    //       ];

    //     if (newFile) {
    //         const selectedFileType = newFile.type;
    //         if (fileTypesAllowed.includes(selectedFileType)) {
    //           const updatedList = [newFile];
    //           setFileList(updatedList);
    //         //   const {onFileChange} = props
    //         //   onFileChange(updatedList)
    //           props.onFileChange(updatedList);
    //           const reader = new FileReader();
    //           reader.readAsArrayBuffer(newFile);
    //           reader.onload = (event) => setExcelFile(event.target.result);
    //         } else {
    //           console.log("Please select excel sheet")
    //         }
    //       } else {
    //         setExcelFile(null);
    //     }
    // }

    // function convertExcelToJson(file) {
    //     return new Promise((resolve, reject) => {
    //       const reader = new FileReader();
      
    //       reader.onload = (e) => {
    //         const data = new Uint8Array(e.target.result);
    //         const workbook = XLSX.read(data, { type: 'array' });
      
    //         const jsonData = {};
      
    //         workbook.SheetNames.forEach((sheetName) => {
    //           const worksheet = workbook.Sheets[sheetName];
    //           const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      
    //           const rows = sheetData.slice(1); // Exclude the header row
    //           const header = sheetData[0];
    //           const convertedData = rows.map((row) =>
    //             header.reduce((obj, key, index) => {
    //               obj[key] = row[index];
    //               return obj;
    //             }, {})
    //           );
      
    //           jsonData[sheetName] = convertedData;
    //         });
      
    //         resolve(jsonData);
    //       };
      
    //       reader.onerror = (error) => {
    //         reject(error);
    //       };
      
    //       reader.readAsArrayBuffer(file);
    //     });
    //   }

    const convertExcelToJson = (file) => {
        const reader = new FileReader();
      
        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          const headers = jsonData[0]; // Get the header row
          const fixedValueColumnName = 'FixedColumn'; // Modify 'FixedColumn' to the actual column name with the fixed value
      
          const fixedValueColumnIndex = headers.indexOf(fixedValueColumnName); // Get the index of the fixed value column
      
          const fixedValue = jsonData[1][fixedValueColumnIndex]; // Get the fixed value from the second row
      
          const result = jsonData.slice(1).map((row) =>
            headers.reduce(
              (obj, key, index) => ({
                ...obj,
                [key]: index === fixedValueColumnIndex ? fixedValue : row[index],
              }),
              {}
            )
          );
          console.log(result);
          // Here, you can set the JSON data to state or perform any other desired operation
        };
      
        reader.readAsArrayBuffer(file);
      };
      
      
      
      function handleFileChange(event) {
        let v = [];
        const file = event.target.files[0];
        if (file) {
              const updatedList = [file];
              setFileList(updatedList);
            }
      
        if (file) {
          convertExcelToJson(file)
            .then((jsonData) => {
              setData(jsonData["MASTER PART LIST"]);
              jsonData["MASTER PART LIST"].map((val)=>{
                if(checkElement(val["Vendor Code"],v)){
                    return
                }
                v.push({
                    vendor_name:val["Vendor Name"],
                    vendor_code:val["Vendor Code"]
                })
                console.log(val)
              })
            })
            .catch((error) => {
              console.error('Error converting Excel to JSON:', error);
            });
        }

setVendors(v);
      }

    const fileRemove = () => {
        const updatedList = [];
        setFileList(updatedList);
        // const {onFileChange} = props
        // onFileChange(updatedList)
        props.onFileChange(updatedList);
    }

    const createMasterPartListRecord = useCallback((data) => {
        createMasterPartListQryDataRecord(data).then((result) => {
          if (result.error) {
            console.error("Oh no master part list error!", result.error);
            return false;
          }
            console.log("Data saved successfully")
            return true;
        });
      });

    //Convert input to boolean
    const booleanConversion = (data) => {
        // console.log("Boolean converion data", data)
        if(data == 1) {
            return true
        } else {
            return false
        }
    }

    // const handleFileSubmit = (e) => {
    //     e.preventDefault()
    //     console.log("File submit clicked")

    //     const workBook = XLSX.read(excelFile, { type: "buffer", cellDates: true });
    //     const workSheetName = workBook.SheetNames[0];
    //     const workSheet = workBook.Sheets[workSheetName];
    //     const dataXLSX = XLSX.utils.sheet_to_json(workSheet, {
    //     blankrows: false,
    //     defval: "",
    //     });
    //     const exceldataa = dataXLSX
    //     console.log("Excel dataa", exceldataa)
    //     setFileList([])

    //     if(exceldataa) {
    //         exceldataa.forEach((record) => {
    //             // console.log("record in excel data loop", record)
    //             const createDataLoop = {
    //                 InpSno: record["S.NO"],
    //                 InpCommon: (record.Common).toString(),
    //                 InpHhhd: booleanConversion(record.HHHD),
    //                 InpHhhg: booleanConversion(record.HHHG),
    //                 InpHhhu: booleanConversion(record.HHHU),
    //                 Inphm4N: booleanConversion(record.HM4N),
    //                 Inphm5V: booleanConversion(record.HM5V),
    //                 InpHm6C: booleanConversion(record.HM6C),
    //                 InpPartcode: record["Part Code"],
    //                 InpRowlabels: record["Row Labels"],
    //                 InpPartname: record["Part Name"],
    //                 InpVendorName: record["Vendor Name"]
    //             }
    //             console.log("Create data loop", createDataLoop)
    //             createMasterPartListRecord(createDataLoop)
    //         })
    //     }
    //     // const createData = {
    //     //     InpCommon: "Common",
    //     //     InpHhhd: true,
    //     //     InpHhhg: true,
    //     //     InpHhhu: true,
    //     //     Inphm4N: true,
    //     //     Inphm5V: true,
    //     //     InpHm6C: true,
    //     //     InpPartcode: "35010-AAB-0010",
    //     //     InpRowlabels: 100214,
    //     //     InpPartname: "KEY SET",
    //     //     InpVendorName: "SANDHAR AUTOMOTIVES GURGAON"
    //     // }

    //     // console.log("Create data", createData)
    //     // props.onFileChange([]);
    
    //     // createMasterListMutationRecord({InpCommon: "test common1"}).then((result) => {
    //     //     if (result.error) {
    //     //       console.error("Oh no!", result.error);
    //     //       return false;
    //     //     }
    //     //       console.log("Data saved successfully")
    //     //       return true;
    //     //   });
    //     // createMasterPartListRecord(createData)
    // }

    // console.log("File list", fileList)

    // const pushData = (e) => {
    // e.preventDefault();
    //     vendors.map((val)=>{
    //         createVendor({
    //             vendorCode:val.vendor_code.toString(),
    //             vendorName:val.vendor_name
    //         })
    //     //    console.log(val)
    //     })
    //     alert("Data added")
    //     console.log(createVendorRes)
    // }

    console.log(data)

    return (
        <>
        <Grid mb={6} mt={2}>
            {
                fileList.length > 0 ? (
                    <div className="drop-file-preview">
                        <MDTypography variant="h5" fontWeight="medium">Ready to upload</MDTypography>
                        <form onSubmit={handleFileChange}>
                        {
                            fileList.map((item, index) => (
                                <div className="drop-file-preview__item">
                                    <img src={ImageConfig[item.type.split('/')[1]] || ImageConfig.default} alt="" />
                                    <div className="drop-file-preview__item__info">
                                        <MDTypography variant="button" fontWeight="regular">{item.name}</MDTypography>
                                        {/* <p>{item.size}B</p> */}
                                    </div>
                                    {/* <button type='button' className="drop-file-preview__item__del" onClick={() => fileRemove(item)}>x</button> */}
                                </div>
                            ))
                        }
                        
                        <MDButton color='light' onClick={() => fileRemove()}>
                            Cancel
                        </MDButton>
                        <MDButton color='info' type='submit' onClick={(e) => pushData(e)}>
                            Upload
                        </MDButton>
                        </form>
                    </div>
                ) : (
                    <div style={{
                        position: 'relative',
                        width: '30rem',
                        height: '200px',
                        border: '2px dashed #277BC0',
                        borderRadius: '20px',             
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',             
                        backgroundColor: '#EEF1FF'
                   }}
                       ref={wrapperRef}
                       className="drop-file-input"
                       onDragEnter={onDragEnter}
                       onDragLeave={onDragLeave}
                       onDrop={onDrop}
                   >
                       <div className="drop-file-input__label">
                           <img src={uploadImg} alt="" />
                           <MDTypography variant="h5" fontWeight="regular" color="secondary">Drag & Drop Master Part List file here</MDTypography>
                       </div>
                       <input type="file"  accept=".xlsx" value="" onChange={handleFileChange}/>
                   </div>
                )
            }
            </Grid>
        </>
    );
}

DropFileInput.propTypes = {
    onFileChange: PropTypes.func
}

export default DropFileInput;
