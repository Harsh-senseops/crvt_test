import React from "react";
import { Zoom } from "@mui/material";
import MDCard from "components/MDCard";
import MDTypography from "components/MDTypography";
import { Card, Icon } from "@mui/material";

const style = {
  color: "black",
  fontSize: "20px",
  // fontWeight:"bold"
};
export default function UnplannedListDetails({ data, showElement }) {
  return (
    <Zoom in={showElement}>
      <section style={{ padding: "1em" }}>
        {data.length !== 0 &&
          data.map((val) => {
            if (!val.chamber.includes("not assigned")) {
              return (
                <Card
                  sx={{
                    background: "#DDE6ED",
                     marginBottom: "1em", 
                     padding: "0.8em",
                    transition: "all 250ms",
                    ":hover": {
                      boxShadow: 20,
                      cursor: "pointer",
                      backgroundColor: "#384158 !important",
                      borderRadius: "10px",
                      transform: "scale(1.02)",
                      color:"white"
                    },
                  }}
                  style={{  }}
                >
                  {/* DDE6ED */}
                  {/* <MDTypography>
                {val.chamber}
                </MDTypography>
                <span>
                  <Icon style={{ color: "red" }}>event_upcoming</Icon>
                  {val.month}
                </span>
                <MDTypography>
                  {val.partCode}
                  {val.partName}
                  {val.vendor}
                  {JSON.stringify(val?.schdeuledComponentsDetails)}
                </MDTypography> */}
                  {/* {JSON.stringify(val?.schdeuledComponentsDetails)} */}
                  {/* {!val.schdeuledComponentsDetails?.monthlyDetails ? "null" : "hola"} */}
                  {/* <div style={{display:"flex"}}>
                    <div style={{background:"#F2BED1",padding:"",width:"130px"}}>Chamber</div>
                    <span>: {val.chamber}</span>
                  </div>
                  <div style={{display:"flex"}}>
                    <div style={{background:"#F2BED1",padding:"",width:"130px"}}>Part Name</div>
                    <span>: {val.chamber}</span>
                  </div> */}
                  <div style={{ fontSize: "15px" }}>
                    <span style={{ background: "#F2BED1", padding: "0.1em" }}>{val.partName}</span>{" "}
                    can be assigned to{" "}
                    <span style={{ background: "#F79327", padding: "0.1em" }}>{val.chamber}</span>{" "}
                    in <span style={{ background: "#DB005B", padding: "0.1em" }}>{val.month}</span>
                  </div>
                  {/* <span style={style}><span style={{background:"#F2BED1",padding:"0.1em",width:"130px"}}>Chamber</span> : {val.chamber}</span>
                  <span style={style}><div style={{background:"#F2BED1",padding:"0.2em",width:"130px"}}>Part Name</div> : {val.partName}</span>
                  <span style={style}>
                    <Icon style={{ color: "red" }}>event_upcoming</Icon>
                    {"   "}
                    {val.month}
                  </span> */}
                </Card>
              );
            } else {
              return (
                <Card sx={{
                  background: "#545B77",
                   marginBottom: "1em",
                    padding: "0.8em" ,
                    ":hover":{
                      cursor:"no-drop"
                    },
                    fontSize: "15px"
                }}>
                  {val.chamber}
                </Card>
              );
            }
          })}
      </section>
    </Zoom>
  );
}
