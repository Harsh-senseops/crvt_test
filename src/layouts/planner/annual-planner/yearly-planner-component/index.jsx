import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MDBox from "components/MDBox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { useQuery, useSubscription } from "urql";
import {useSelector,useDispatch} from "react-redux"
import DataTable from "examples/Tables/DataTable";
import { setShouldPause } from "reduxSlices/yearlyPlanner";
import { useCallback } from 'react';

const columns = [ 
  "Components",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
  "Jan",
  "Feb",
  "Mar",
];

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function YearlyPlannerComponent({name,query,allPlanners}) {
  const [expanded, setExpanded] = React.useState(false);
  // const [shouldPause, setShouldPause] = React.useState(false);
  const yearlyPlannerStore = useSelector((store)=>{
    return store.yearlyPlanner
  });
  const dispatch = useDispatch();
  const [dustYearlyPlanner] = useSubscription({
    query: query
    // pause: yearlyPlannerStore.shouldPause
  });
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    if(data.length === 0){
      dispatch(setShouldPause(false))
    }
    if (dustYearlyPlanner.data) {
      const monthNames = [
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
        "January",
        "February",
        "March",
      ];
      let tempArr = [];
      dustYearlyPlanner.data[allPlanners].nodes.map((val, i) => {
        let parsed = JSON.parse(val.testDetails);
        if (parsed.length >= 12) {
          tempArr.push({
            name: val.componentDetailByComponentId.partName,
            samples: Array(12).fill(val.samples),
          });
        } else {
          let monthsArray = [];
          let index = 0;
          monthNames.map((val) => {
            if (index === parsed.length) {
              monthsArray.push("");
              return;
            }
            let [startDay, day] = parsed[index].startDate.split("-");
            if (val === startDay) {
              monthsArray.push(parsed[index].samples);
              index++;
            } else {
              monthsArray.push("");
            }
          });
          tempArr.push({ name: val.componentDetailByComponentId.partName, samples: monthsArray });
        }
      });

      const sortedArray = tempArr.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      setData(sortedArray);
      dispatch(setShouldPause(false))
    }
  }, [dustYearlyPlanner]);

  const handleExpandClick = useCallback(() => {
    setExpanded((prevExpanded) => !prevExpanded);
  }, []);
  
  console.log(dustYearlyPlanner.data)
  return (
    <>
      <MDBox p={3} pt={1} pb={3}>
        <Card>
          <MDBox p={3} lineHeight={1}>
            <CardActions disableSpacing>
              {name}
              {/* Dust */}
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <span style={{fontSize:"15px",color:"green"}}>Total Components found {data.length}</span>
            <Collapse style={{ padding: "0px" }} in={expanded} timeout="auto" unmountOnExit>
              {data.length !== 0 ? (
                <TableContainer style={{marginTop:"20px"}}>
                  <Table>
                    <TableRow style={{ background: "#003e66" }}>
                      {columns.map((column, i) => (
                        <TableCell key={i} style={{color:"whitesmoke",fontWeight:"bold"}}>{column}</TableCell>
                      ))}
                    </TableRow>
                    <TableBody>
                      {data
                        ? data.map((val, index) => {
                            return (
                              <TableRow style={{
                                  background: index % 2 === 0 ? "#d8e4e9" : "",
                                  textAlign: "center",
                                }} key={index}>
                                <TableCell>{val.name}</TableCell>
                                {val.samples.map((val2, i) => {
                                  return (
                                    <TableCell style={{textAlign:"center"}}>
                                      {val2}
                                    </TableCell>
                                  );
                                })}
                              </TableRow>
                            );
                          })
                        : "Loading"}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                "No yearly planner created"
              )}
            </Collapse>
          </MDBox>
        </Card>
      </MDBox>
    </>
  );
}