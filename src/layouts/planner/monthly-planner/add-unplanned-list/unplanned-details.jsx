import React from "react";
import { Zoom } from "@mui/material";
import { Card, } from "@mui/material";

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
                
                  <div style={{ fontSize: "15px" }}>
                    <span style={{ background: "#F2BED1", padding: "0.1em" }}>{val.partName}</span>{" "}
                    can be assigned to{" "}
                    <span style={{ background: "#F79327", padding: "0.1em" }}>{val.chamber}</span>{" "}
                    in <span style={{ background: "#DB005B", padding: "0.1em" }}>{val.month}</span>
                  </div>
               
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
