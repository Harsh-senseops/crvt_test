import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import EXIF from "exif-js";
import "./drop-file-input.css";
import ImageConfig from "layouts/planner/annual-planner/config";
import { useMutation } from "urql";

const upLoadPhoto = `
mutation UploadPhoto($file: Upload!, $emp_code: String!) {
    uploadPhoto(file: $file, emp_code: $emp_code) {
      filename
      emp_code
      name
    }
  }
`;
const getBase64 = (file) => {
  return new Promise((resolve) => {
    let fileInfo;
    let baseURL = "";
    // Make new FileReader
    let reader = new FileReader();

    // Convert the file to base64 text
    reader.readAsDataURL(file);

    // on reader load somthing...
    reader.onload = () => {
      // Make a fileInfo Object
      baseURL = reader.result;
    //   console.log(baseURL);
      resolve(baseURL);
    };
  });
};
const DropFileInput = (props) => {
  const wrapperRef = useRef(null);

  const [fileList, setFileList] = useState([]);

  const [metadata, setMetadata] = useState(null);

  const [baseImg,setBaseImg] = useState("")

  const [uploadPhotoRes, uploadPhoto] = useMutation(upLoadPhoto);

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");

  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  // const onFileDrop = (e) => {
  //     const newFile = e.target.files[0];
  //     if (newFile) {
  //         const updatedList = [...fileList, newFile];
  //         setFileList(updatedList);
  //         props.onFileChange(updatedList);
  //     }
  //     // let fd = new FormData();
  //     // fd.append("file",fileList[0])
  //     // console.log(fd);
  // }

  const handleImageUpload = (event) => {
    const newFile = event.target.files[0];
    if (newFile) {
      const updatedList = [...fileList, newFile];
      setFileList(updatedList);
      console.log(newFile)
      console.log(fileList)
      props.onFileChange(updatedList);
      getBase64(newFile)
      .then((result) => {
    //     file["base64"] = result;
   //     console.log("File Is", file);
       setBaseImg(result)
    // console.log(result)
      })
      .catch((err) => {
        console.log(err);
      });
    }
  };

//   const uploadFile = () => {
//     uploadPhoto({ file: fileList[0], emp_code: "test_data1" }).then((res) => {
//       alert(JSON.stringify(res.error));
//       console.log;
//     });
//   };

  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    props.onFileChange(updatedList);
  };
  return (
    <>
      <div
        style={{ float: "left" }}
        // ref={wrapperRef}
        // className="drop-file-input"
        // onDragEnter={onDragEnter}
        // onDragLeave={onDragLeave}
        // onDrop={onDrop}
      >
        <input type="file" value="" onChange={handleImageUpload} />
      </div>
      {fileList.length > 0 ? (
        <div className="drop-file-preview">
          <p className="drop-file-preview__title">Ready to upload</p>
          {fileList.map((item, index) => (
            <div
              // key={index}
              className="drop-file-preview__item"
            >
              <img src={ImageConfig[item.type.split("/")[1]] || ImageConfig.default} alt="" />
              <div className="drop-file-preview__item__info">
                <p>{item.name}</p>
                <p>{item.size}B</p>
              </div>
              <button
                type="button"
                className="drop-file-preview__item__del"
                onClick={() => fileRemove(item)}
              >
                x
              </button>
            </div>
          ))}
          {/* {JSON.stringify(baseImg)} */}
          {/* <img src={baseImg} /> */}
          <button onClick={props.uploadFile}>upload</button>
        </div>
      ) : null}
    </>
  );
};

DropFileInput.propTypes = {
  onFileChange: PropTypes.func,
};

export default DropFileInput;
