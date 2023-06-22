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
import { useQuery,useSubscription } from "urql";
import { OVEN_YEARLY_PLANNER } from "apis/queries";
// import "./index.css"

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

export default function Oven() {
  const [expanded, setExpanded] = React.useState(false);
  const [shouldPause, setShouldPause] = React.useState(false);
  const [ovenYearlyPlanner, rexOvenYearlyPlanner] = useSubscription({
    query: OVEN_YEARLY_PLANNER,
    // pause: shouldPause,
  });
  const { data, fetching, error } = ovenYearlyPlanner;
  const [data1, setData] = React.useState([]);
  const [db, setDb] = React.useState([]);
  React.useEffect(() => {
    if (data) {
      setShouldPause(true);
    }
    if (ovenYearlyPlanner.data) {
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
      ovenYearlyPlanner.data.allOvenYearlyPlanners.nodes.map((val, i) => {
        let parsed = JSON.parse(val.testDetails);
        if (parsed.length >= 12) {
          tempArr.push({ name: val.componentName, samples: Array(12).fill(val.samples) });
        } else {
          console.log(parsed,val);
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
          tempArr.push({ name: val.componentName, samples: monthsArray });
        }
      });

      const sortedArray = tempArr.sort((a, b) => a.name.localeCompare(b.name));

      setData(sortedArray);
    //   setShouldPause(false);
    }
  }, [ovenYearlyPlanner]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
//   console.log(db);
  return (
    <>
      <MDBox p={3} pt={1} pb={3}>
        <Card>
          <MDBox p={3} lineHeight={1}>
            <CardActions disableSpacing>
              Oven
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse style={{ padding: "0px" }} in={expanded} timeout="auto" unmountOnExit>
              {data1.length !== 0 ?<TableContainer>
                <Table>
                  <TableRow style={{ background: "#003e66" }}>
                    {columns.map((column, i) => (
                      <TableCell style={{color:"whitesmoke",fontWeight:"bold"}} key={i}>{column}</TableCell>
                    ))}
                  </TableRow>
                  <TableBody>
                    {data1
                      ? data1.map((val, index) => {
                          return (
                            <TableRow style={{
                                background: index % 2 === 0 ? "#d8e4e9" : "",
                                textAlign: "center",
                              }} key={index}>
                              <TableCell>{val.name}</TableCell>
                              {val.samples.map((val2, i) => {
                                return (
                                  <TableCell>
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
              </TableContainer>:"No yearly planner created"}
            </Collapse>
          </MDBox>
        </Card>
      </MDBox>
    </>
  );
}
