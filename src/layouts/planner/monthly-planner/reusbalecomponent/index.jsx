import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MDTypography from "components/MDTypography";
import clsx from "clsx";
import { makeStyles } from "@mui/styles";
import MDBox from "components/MDBox";
import DataTable from "examples/Tables/DataTable";
import { useMutation, useQuery, useSubscription } from "urql";
import AddPartCode from "../add-part-code";
import * as monthlyPlannerAction from "../../../../reduxSlices/monthlyPlanner";
import DialogSelectComponent from "../select-vendor";
import alertAndLoaders from "utils/alertAndLoaders";
import { PARTDEAILS_BY_PART_CODE } from "apis/queries";
import { ADD_MONTHLY_UPLOAD_HISTORY } from "apis/queries";
// import {useSelector} from "react-redux";

const columns = [
  { Header: "part name", accessor: "partName" },
  { Header: "part code", accessor: "partCode" },
  { Header: "vendor name", accessor: "vendorName" },
  { Header: "status", accessor: "status" },
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

function findIndex(arr, componentName) {
  let index = 0;
  arr.map((val, i) => {
    if (val.partName === componentName && val.partCode.length === 0) {
      return (index = i);
    }
  });
  return index;
}

function checkIsPartCodeEmpty(arr,name,code){
    console.log(arr)
	let flag = false
	for(let i = 0; i<arr.length; i++){
		if(arr[i].partName === name  && arr[i].partCode.length === 0){
			return {isTrue:true}
		}if(arr[i].partCode === code){
            return {isTrue:false,msg:"This part code already exists"}
        }
	}
	return {isTrue:false,msg:"Slot is full"}
}

const ReusabaleMonthlyPlannerTests = ({
  yearlyPlannerQuery,
  testName,
  allTestNameYearlyPlanner,
  mutation,
  monthlyPlannerByDate,
  allTestNameMonthlyPlanner,
}) => {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch();
  const [data, setData] = useState({ columns, rows: [] });
  const [toggleEnable, setToggleEnable] = useState(false);
  const [partCode, setPartCode] = useState("");
  const [shouldPause, setShouldPause] = useState(false);
  const [open, setOpen] = useState(false);
  const [option, setOption] = useState([]);
  const monthlyPlannerStore = useSelector((store) => store.monthlyPlanner);

  const userStore = useSelector((store) => store.userRoles);

  const [testNameYp] = useQuery({
    query: yearlyPlannerQuery,
    // pause: monthlyPlannerStore.shouldPause,
  });

  const [partDetails] = useQuery({
    query: PARTDEAILS_BY_PART_CODE,
    variables: { partCode },
    pause: shouldPause,
  });

  const [monthMP] = useSubscription({
    query: monthlyPlannerByDate,
    pause: shouldPause,
    variables: { month: monthlyPlannerStore.date.month },
  });

  const [addMonthlyUploadHistoryResult, addMonthlyUploadHistory] = useMutation(
    ADD_MONTHLY_UPLOAD_HISTORY
  );

  const handleExpandClick = useCallback(() => {
    setExpanded((prevState) => !prevState);
  }, []);
  useEffect(() => {
    if (partDetails.data?.partCodeDetailByPartCode === null && partCode.length !== 0) {
      alertAndLoaders("UNSHOW_ALERT", dispatch, `No Parts found in ${testName}.`, "warning");
      alert("Holla",JSON.stringify(partDetails.data?.partCodeDetailByPartCode))
      console.log(partDetails.data?.partCodeDetailByPartCode)
      setPartCode("");
    }
    if (partDetails.data?.partCodeDetailByPartCode) {
      const parseVendorsDetails = JSON.parse(
        partDetails.data.partCodeDetailByPartCode.vendorDetails
      );
      setOption(parseVendorsDetails);
      const partName = partDetails.data.partCodeDetailByPartCode.partName;
      const partCode = partDetails.data.partCodeDetailByPartCode.partCode;
      const index = data.rows.findIndex((obj) => obj.partName === partName);
      if (index !== -1) {
        if(checkIsPartCodeEmpty(data.rows,partName,partCode).isTrue === false){
            alertAndLoaders("UNSHOW_ALERT", dispatch, checkIsPartCodeEmpty(data.rows,partName,partCode).msg, "warning");
            setPartCode("");
        }else{
            setOpen(true);
            dispatch(
              monthlyPlannerAction.setDetailsToPush({
                partCode,
                partName,
                status: 1,
              })
            );
            dispatch(monthlyPlannerAction.setTestName(testName))
            setPartCode("");
        }
      }
       else {
        addMonthlyUploadHistory({
          partCode,
          description:`No Parts found in ${testName}.`,
          status: "failed",
          empCode: userStore.empCode,
        }).then((res)=>{
            if(res.error){
                alert("Failed To upadate")
                console.log(res.error)
            }else if(res.data){
                alertAndLoaders("UNSHOW_ALERT", dispatch, `No Parts found in ${testName}.`, "warning");
            }
        })
        setPartCode("");
      }
    }
  }, [partDetails.data, dispatch, data.rows]);

  useEffect(() => {
    if (data.testNameYp && data.rows.length === 0) {
      dispatch(monthlyPlannerAction.setShouldPause(false));
    }
    let tempArray = [];
    if (testNameYp.data && monthlyPlannerStore.date.year >= 2012) {
      dispatch(monthlyPlannerAction.setShouldPause(true));
      testNameYp.data[allTestNameYearlyPlanner]?.nodes.forEach((val, i) => {
        JSON.parse(val.testDetails).forEach((val2) => {
          const [month, year] = val2.startDate.split("-");
          if (month === monthlyPlannerStore.date.month) {
            tempArray[i] = [];
            for (let j = 0; j < val.samples; j++) {
              tempArray[i][j] = {
                partCode: "",
                partName: val.componentDetailByComponentId.partName,
                vendorName: "",
                status: "",
              };
              dispatch(monthlyPlannerAction.setSampleDetils({
                componentName:val.componentDetailByComponentId.partName,
                samples:val.samples,
                testName
              }))
            }
          }
        });
      });
    }
    let tempArry2 = tempArray.flat();
    if (monthMP.data && testNameYp.data) {
      dispatch(monthlyPlannerAction.setShouldPause(true));
      let mp = monthMP.data[allTestNameMonthlyPlanner]?.nodes || [];

      let index = 0;
      for (let i = 0; i < mp.length; i++) {
        index = findIndex(tempArry2, mp[i].partName);
        tempArry2[index].partCode = mp[i].partCode;
        tempArry2[index].status = "Progress";
        tempArry2[index].vendorName = JSON.parse(mp[i].vendorDetails).vendorName;
        tempArry2[index].samples === undefined || null ? 0 : tempArry2[index].samples += 1;
      }
      tempArry2.sort((a, b) => {
        if (a.partCode === "" && b.partCode !== "") {
          return 1; // a is null, b is not null, so a comes after b
        } else if (a.partCode !== "" && b.partCode === "") {
          return -1; // a is not null, b is null, so a comes before b
        } else if (a.partCode !== "" && b.partCode !== "") {
          // both a and b are not null, perform alphabetical comparison
          return a.partName.localeCompare(b.partName);
        } else {
          return 0; // both a and b are null, maintain their order
        }
      });
    }
    setData({ columns, rows: tempArry2 });
  }, [testNameYp.data, monthlyPlannerStore.shouldPause, dispatch, monthMP.data]);

  const handleAddPartCode = useCallback((partCode) => {
    setPartCode(partCode);
    // setShouldPause(false);
  }, []);
  useEffect(() => {
    return () => {};
  }, []);

  const classes = useStyles();

  return (
    <Card>
      <CardHeader
        action={
          <div>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={!toggleEnable ? handleExpandClick : null}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </div>
        }
        title={
          <MDTypography variant="h6" fontWeight="medium">
            {testName}
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
            {Math.floor(data.rows.length / 2)} components scheduled
          </MDTypography>
        }
      />
      {!toggleEnable && (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {userStore.roles === 3 ? <AddPartCode onAddPartCode={handleAddPartCode} buttonText="Add PartCode" />:""}
            <MDBox pr={1}>
              <DataTable table={data} canSearch={true} />
            </MDBox>
          </CardContent>
        </Collapse>
      )}
      <DialogSelectComponent
        open={open}
        setOpen={setOpen}
        option={option}
        setOption={setOption}
        mutation={mutation}
      />
    </Card>
  );
};

export default ReusabaleMonthlyPlannerTests;
