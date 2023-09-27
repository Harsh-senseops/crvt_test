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
import { useSelector, useDispatch } from "react-redux";
import { setShouldPause,setYearlyPlanner } from "reduxSlices/yearlyPlanner";
import clsx from "clsx";
import MDTypography from "components/MDTypography";
import { makeStyles } from "@mui/styles";
import { CardHeader } from "@mui/material";
import loader from "assets/loader.gif";
import MDLoader from "components/MDLoader";

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
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    margin: "1%",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  formControl: {
    minWidth: 174,
  },
  formControltest: {
    minWidth: 174,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  parentFlexRight: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "2%",
    marginRight: "3%",
  },
}));
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return (
    <IconButton {...other} style={{ color: "#1A73E8", position: "relative", zIndex: "100" }} />
  );
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

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

const allYearlyPlanner = `query dustYearlyPlanner {
  allCrvtDustYearlyPlanners {
    nodes {
      crvtComponentDetailByComponentId {
        partName
      }
      componentId
      samples
      testDetails
      totalSamplesTested
    }
  }
   allCrvtOvenYearlyPlanners {
    nodes {
      crvtComponentDetailByComponentId {
        partName
      }
      componentId
      samples
      testDetails
      totalSamplesTested
    }
  }
    allCrvtRoYearlyPlanners {
    nodes {
      crvtComponentDetailByComponentId {
        partName
      }
      componentId
      samples
      testDetails
      totalSamplesTested
    }
  }
   allCrvtShowerYearlyPlanners {
    nodes {
      crvtComponentDetailByComponentId {
        partName
      }
      componentId
      samples
      testDetails
      totalSamplesTested
    }
  }
    allCrvtThermalCycleYearlyPlanners {
    nodes {
      crvtComponentDetailByComponentId {
        partName
      }
      componentId
      samples
      testDetails
      totalSamplesTested
    }
  }
   allCrvtThermalShockYearlyPalnners {
    nodes {
      crvtComponentDetailByComponentId {
        partName
      }
      componentId
      samples
      testDetails
      totalSamplesTested
    }
  }
    allCrvtVibrationYearlyPlanners {
    nodes {
      crvtComponentDetailByComponentId {
        partName
      }
      componentId
      samples
      testDetails
      totalSamplesTested
    }
  }
}`

 function YearlyPlannerComponent({ name, allPlanners, expanded }) {
  const yearlyPlannerStore = useSelector((store) => {
    return store.yearlyPlanner;
  });
  const [toggleEnable, setToggleEnable] = useState(false);

  const dispatch = useDispatch();
  const [yearlyPlanner] = useQuery({
    query: allYearlyPlanner,
  });

  React.useEffect(() => {
    let keys = Object.keys(yearlyPlannerStore.yearlyPlanner);
        if (yearlyPlanner.data) {
          keys.map((val)=>{
            if(!yearlyPlannerStore.yearlyPlanner[val]){
              let tempArr = [];
              yearlyPlanner.data[allPlanners].nodes.map((val, i) => {
                let parsed = JSON.parse(val.testDetails);
                if (parsed.length >= 12) {
                  tempArr.push({
                    name: val.crvtComponentDetailByComponentId.partName,
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
                  tempArr.push({
                    name: val.crvtComponentDetailByComponentId.partName,
                    samples: monthsArray,
                  });
                }
              });
        
              const sortedArray = tempArr.sort((a, b) => {
                return a.name.localeCompare(b.name);
              });
              // setData(sortedArray);
              dispatch(setYearlyPlanner({testName:allPlanners,data:sortedArray}))
              dispatch(setShouldPause(false));
            }
          })
        }
   
  }, [yearlyPlanner.data]);

  const classes = useStyles();

  return (
    <Card style={{ marginBottom: "0.7em", background: "#202940" }}>
      <CardHeader
        sx={{
          transition: "all 250ms",
          ":hover": {
            boxShadow: 20,
            cursor: "pointer",
            backgroundColor: "#384158 !important",
            borderRadius: "10px",
            transform: "scale(1.02)",
          },
        }}
        action={
          <div>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              aria-expanded={expanded}
              aria-label="show more"
              color="info"
            >
              <ExpandMoreIcon />
            </IconButton>
          </div>
        }
        title={
          <MDTypography variant="h6" fontWeight="medium">
            {name}
          </MDTypography>
        }
        subheader={
          <MDTypography
            style={{
              color: "lime",
              fontSize: "14px",
              paddingTop: "1%",
            }}
          >
             {yearlyPlannerStore.yearlyPlanner[allPlanners] ?"Total Components found " + yearlyPlannerStore.yearlyPlanner[allPlanners].length :<MDLoader/> }
          </MDTypography>
        }
      />
      {!toggleEnable && (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          {yearlyPlannerStore.yearlyPlanner[allPlanners]  ? (
            <TableContainer style={{ marginTop: "10px" }}>
              <Table>
                <TableRow style={{ background: "#003e66" }}>
                  {columns.map((column, i) => (
                    <TableCell key={i} style={{ color: "whitesmoke", fontWeight: "bold" }}>
                      {column}
                    </TableCell>
                  ))}
                </TableRow>
                <TableBody>
                  {yearlyPlannerStore.yearlyPlanner[allPlanners] 
                    ? yearlyPlannerStore.yearlyPlanner[allPlanners].map((val, index) => {
                        return (
                          <TableRow
                            style={{
                              background: index % 2 === 0 ? "#d8e4e9" : "white",
                              textAlign: "center",
                            }}
                            key={index}
                          >
                            <TableCell>{val.name}</TableCell>
                            {val.samples.map((val2, i) => {
                              return <TableCell style={{ textAlign: "center" }}>{val2}</TableCell>;
                            })}
                          </TableRow>
                        );
                      })
                    :<MDTypography style={{padding:"1em"}}>Loading...</MDTypography>}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <MDTypography style={{padding:"1em"}}>Loading...</MDTypography>
          )}
        </Collapse>
      )}
    </Card>
  );
}

export default React.memo(YearlyPlannerComponent)
