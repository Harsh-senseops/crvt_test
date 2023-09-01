import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { makeStyles } from "@mui/styles";
import MDBox from "components/MDBox";
import { useSubscription, useMutation, useQuery } from "urql";

import Grid from "@mui/material/Grid";
import { CREATE_POST_TEST } from "apis/queries";
import { UPDATE_POST_TEST } from "apis/queries";
import { FATCH_POST_DATA } from "apis/queries";
import { useSelector, useDispatch } from "react-redux";
import alertAndLoaders from "utils/alertAndLoaders";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    margin: "1%",
  },
  customSelect: {
    color: "#FFFF", // Example: change text color to red
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  fontField: {
    "& .css-1ylvbjo-MuiInputBase-root-MuiInput-root-MuiSelect-root": {
      color: "#ffff",
    },
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 174,
  },
  formControltest: {
    // margin: theme.spacing(1),
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
export default function PostTest({ id }) {
  const [ptcurrent, setPtCurrent] = useState({ min: "", max: "" });
  const [ptfrequency, setPtFrequency] = useState({ min: "", max: "" });
  const [ptsound, setPtSound] = useState({ min: "", max: "" });
  const [ptinsulation, setPtInsulation] = useState({ min: "", max: "" });
  const [ptdifferance, setPtDifferance] = useState({
    ptsound: { min: "", max: "" },
    ptfrequency: { min: "", max: "" },
  });
  const [flag, setFlag] = useState(false);
  const [createPostDataRes, createPostData] = useMutation(CREATE_POST_TEST);
  const [updatePostData, updatePostDataResults] = useMutation(UPDATE_POST_TEST);
  const [postTestById, rexpostTestById] = useSubscription({
    query: FATCH_POST_DATA,
    variables: { componentId: id },
  });
  const classes = useStyles();
  const role = useSelector((store) => {
    return store.userRoles;
  });
  const dispatch = useDispatch();

  const currentminStart = 2;
  const currentminEnd = 5;
  const currentptminRange = Array.from(
    { length: Math.ceil((currentminEnd - currentminStart) / 0.5) + 1 },
    (_, index) => currentminStart + 0.5 * index
  );

  const currentmaxStart = 2;
  const currentmaxEnd = 5;
  const currentptmaxRange = Array.from(
    { length: Math.ceil((currentmaxEnd - currentmaxStart) / 0.5) + 1 },
    (_, index) => currentmaxStart + 0.5 * index
  );

  const frqminStart = 340;
  const frqminEnd = 460;
  const frqminRange = Array.from(
    {
      length: Math.min(frqminEnd - frqminStart + 1, Math.ceil((frqminEnd - frqminStart + 1) / 40)),
    },
    (_, index) => frqminStart + 40 * index
  );
  const frqptminRange = frqminRange.map((value) => value + 30);

  const frqmaxStart = 400;
  const frqmaxEnd = 560;
  const frqmaxRange = Array.from(
    {
      length: Math.min(frqmaxEnd - frqmaxStart + 1, Math.ceil((frqmaxEnd - frqmaxStart + 1) / 40)),
    },
    (_, index) => frqmaxStart + 40 * index
  );
  const frqptmaxRange = frqmaxRange.map((value) => value + 30);

  const soundminStart = 75;
  const soundminEnd = 115;
  const soundminRange = Array.from(
    { length: Math.ceil((soundminEnd - soundminStart + 1) / 10) },
    (_, index) => soundminStart + 10 * index
  );
  const soundDStart = 10;
  const soundDEnd = 50;
  const offset1 = 7.8;
  const offset2 = -7.8;

  const soundptminRangePositive = Array.from(
    { length: Math.ceil((soundDEnd - soundDStart + 1) / 10) },
    (_, index) => soundDStart + 10 * index + offset1
  );
  const soundptminRangeNegative = Array.from(
    { length: Math.ceil((soundDEnd - soundDStart + 1) / 10) },
    (_, index) => soundDStart + 10 * index + offset2
  );

  const frequencyDStart = 30;
  const frequencyDEnd = 90;
  const step1 = 30;
  const step2 = -30;
  const frequencyRangePositive = Array.from(
    { length: Math.ceil((frequencyDEnd - frequencyDStart + 1) / 10) },
    (_, index) => frequencyDStart + 10 * index + step1
  );
  const frequencyRangeNagetive = Array.from(
    { length: Math.ceil((frequencyDEnd - frequencyDStart + 1) / 10) },
    (_, index) => frequencyDStart + 10 * index + step2
  );

  const soundmaxStart = 95;
  const soundmaxEnd = 135;
  const soundmaxRange = Array.from(
    { length: Math.ceil((soundmaxEnd - soundmaxStart + 1) / 10) },
    (_, index) => soundmaxStart + 10 * index
  );

  const insulationminStart = 1;
  const insulationminEnd = 10;
  const insulationminRange = Array.from(
    { length: Math.ceil((insulationminEnd - insulationminStart + 1) / 2) },
    (_, index) => insulationminStart + 2 * index
  );
  const insulationptminRange = insulationminRange.map((value) => value + 30);

  const insulationmaxStart = 1;
  const insulationmaxEnd = 10;
  const insulationmaxRange = Array.from(
    { length: Math.ceil((insulationmaxEnd - insulationmaxStart + 1) / 2) },
    (_, index) => insulationmaxStart + 2 * index
  );
  const insulationptmaxRange = insulationmaxRange.map((value) => value + 30);

  useEffect(() => {
    if (postTestById.data) {
      if (postTestById.data.crvtPostTestTableByComponentId) {
        setFlag(true);
        let data = postTestById.data.crvtPostTestTableByComponentId;
        setPtCurrent({
          min: parseInt(JSON.parse(data.ptCurrent).min),
          max: JSON.parse(data.ptCurrent).max,
        });
        setPtSound({
          min: parseInt(JSON.parse(data.ptSoundLvl).min),
          max: JSON.parse(data.ptSoundLvl).max,
        });
        setPtFrequency({
          min: parseInt(JSON.parse(data.ptFrequency).min),
          max: JSON.parse(data.ptFrequency).max,
        });
        setPtInsulation({
          min: parseInt(JSON.parse(data.ptInsulationRs).min),
          max: JSON.parse(data.ptInsulationRs).max,
        });
        setPtDifferance({
          ptsound: {
            min: JSON.parse(data.ptDifferance).ptsound.min,
            max: JSON.parse(data.ptDifferance).ptsound.max,
          },
          ptfrequency: {
            min: JSON.parse(data.ptDifferance).ptfrequency.min,
            max: JSON.parse(data.ptDifferance).ptfrequency.max,
          },
        });
      } else {
        setFlag(false);
      }
    }
  }, [postTestById.data]);

  const savePtData = () => {
    let currentVal = JSON.stringify(ptcurrent);
    let frequencyVal = JSON.stringify(ptfrequency);
    let soundVal = JSON.stringify(ptsound);
    let differanceVal = JSON.stringify(ptdifferance);
    let InsulationVal = JSON.stringify(ptinsulation);
    if (
      ptcurrent.min === "" ||
      ptcurrent.max === "" ||
      ptfrequency.min === "" ||
      ptfrequency.max === "" ||
      ptinsulation.min === "" ||
      ptinsulation.max === "" ||
      ptsound.min === "" ||
      ptsound.max === "" ||
      ptdifferance.ptsound.min === "" ||
      ptdifferance.ptsound.max === "" ||
      ptdifferance.ptfrequency.min === "" ||
      ptdifferance.ptfrequency.max === ""
    ) {
      alertAndLoaders("UNSHOW_ALERT", dispatch, "Please Fill All The Fields... ", "warning");
      return;
    }
    if (flag === true) {
      updatePostDataResults({
        componentId: id,
        ptCurrent: currentVal,
        ptInsulationRs: InsulationVal,
        ptFrequency: frequencyVal,
        ptSoundLvl: soundVal,
        ptDifferance: differanceVal,
      }).then((res) => {
        console.log(res);
        if (res.data) {
          alertAndLoaders("UNSHOW_ALERT", dispatch, "Post Test Details Are Updated... ", "success");
        } else if (res.error) {
          alertAndLoaders("UNSHOW_ALERT", dispatch, "Something Went Wrong... ", "error");
        }
      });
    } else {
      createPostData({
        componentId: id,
        ptCurrent: currentVal,
        ptInsulationRs: InsulationVal,
        ptFrequency: frequencyVal,
        ptSoundLvl: soundVal,
        ptDifferance: differanceVal,
      }).then((res) => {
        console.log(res);
        if (res.data) {
          alertAndLoaders(
            "UNSHOW_ALERT",
            dispatch,
            "Post Test Details Are Configured... ",
            "success"
          );
        } else if (res.error) {
          alertAndLoaders("UNSHOW_ALERT", dispatch, "Something Went Wrong... ", "error");
        }
      });
    }
    // console.log(id, currentVal, frequencyVal, soundVal, differanceVal, InsulationVal, "VAL");
  };

  return (
    <>
      <Card style={{ margin: "10px" }}>
        <MDTypography variant="h6" fontWeight="medium" marginLeft="20px" marginTop="20px">
          Post Test configurations
        </MDTypography>
        <MDBox m={2}>
          <Grid container>
            <Grid item lg={6} xl={6} mb={3} style={{ display: "flex", alignItems: "baseline" }}>
              <Grid ml={3} mr={3}>
                <MDTypography variant="button" fontWeight="medium">
                  Current :
                </MDTypography>
              </Grid>
              <Grid mr={5} ml={5}>
                <FormControl variant="standard" sx={{ minWidth: 50 }}>
                  <InputLabel id="demo-simple-select-standard-label">min</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={ptcurrent.min}
                    onChange={(e) =>
                      setPtCurrent((prev) => ({
                        ...prev,
                        min: e.target.value,
                      }))
                    }
                    label="Current"
                    name="min"
                    className={classes.customSelect}
                  >
                    {currentptminRange.map((value) => (
                      <MenuItem key={value} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid>
                <FormControl variant="standard" sx={{ minWidth: 50 }}>
                  <InputLabel id="demo-simple-select-standard-label">max</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={ptcurrent.max}
                    onChange={(e) =>
                      setPtCurrent((prev) => ({
                        ...prev,
                        max: e.target.value,
                      }))
                    }
                    label="Current"
                    name="max"
                    className={classes.customSelect}
                  >
                    {currentptmaxRange.map((value) => (
                      <MenuItem key={value} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item lg={6} xl={6} style={{ display: "flex", alignItems: "baseline" }}>
              <Grid ml={3} mr={3}>
                <MDTypography variant="button" fontWeight="medium">
                  Frequency :
                </MDTypography>
              </Grid>
              <Grid mr={5} ml={2}>
                <FormControl variant="standard" sx={{ minWidth: 50 }}>
                  <InputLabel id="demo-simple-select-standard-label" color="white">
                    min
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={ptfrequency.min}
                    onChange={(e) =>
                      setPtFrequency((prev) => ({
                        ...prev,
                        min: e.target.value,
                      }))
                    }
                    label="Frequency(min)"
                    name="min"
                    className={classes.customSelect}
                  >
                    {frqptminRange.map((value) => (
                      <MenuItem key={value} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid>
                <FormControl variant="standard" sx={{ minWidth: 50 }}>
                  <InputLabel id="demo-simple-select-standard-label">max</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={ptfrequency.max}
                    onChange={(e) =>
                      setPtFrequency((prev) => ({
                        ...prev,
                        max: e.target.value,
                      }))
                    }
                    label="Frequency(max)"
                    name="max"
                    className={classes.customSelect}
                  >
                    {frqptmaxRange.map((value) => (
                      <MenuItem key={value} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid container mt={1}>
            <Grid item lg={6} xl={6} style={{ display: "flex", alignItems: "baseline" }}>
              <Grid ml={3} mr={3} xl={3} xs={3}>
                <MDTypography variant="button" fontWeight="medium">
                  Sound Level :
                </MDTypography>
              </Grid>
              <Grid mr={5}>
                <FormControl variant="standard" sx={{ minWidth: 50 }}>
                  <InputLabel id="demo-simple-select-standard-label">min</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={ptsound.min}
                    onChange={(e) =>
                      setPtSound((prev) => ({
                        ...prev,
                        min: e.target.value,
                      }))
                    }
                    label="Sound(min)"
                    name="min"
                    className={classes.customSelect}
                  >
                    {soundminRange.map((value) => (
                      <MenuItem key={value} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid>
                <FormControl variant="standard" sx={{ minWidth: 50 }}>
                  <InputLabel id="demo-simple-select-standard-label">max</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={ptsound.max}
                    onChange={(e) =>
                      setPtSound((prev) => ({
                        ...prev,
                        max: e.target.value,
                      }))
                    }
                    label="Sound(max)"
                    name="max"
                    className={classes.customSelect}
                  >
                    {soundmaxRange.map((value) => (
                      <MenuItem key={value} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item lg={6} xl={6} style={{ display: "flex", alignItems: "baseline" }}>
              <Grid ml={3} mr={3} xl={3} xs={3}>
                <MDTypography variant="button" fontWeight="medium">
                  Insulation Resistance :
                </MDTypography>
              </Grid>
              <Grid mr={5}>
                <FormControl variant="standard" sx={{ minWidth: 50 }}>
                  <InputLabel id="demo-simple-select-standard-label">min</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={ptinsulation.min}
                    onChange={(e) =>
                      setPtInsulation((prev) => ({
                        ...prev,
                        min: e.target.value,
                      }))
                    }
                    label="Insulation(min)"
                    name="min"
                    className={classes.customSelect}
                  >
                    {insulationptminRange.map((value) => (
                      <MenuItem key={value} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid>
                <FormControl variant="standard" sx={{ minWidth: 50 }}>
                  <InputLabel
                    style={{ justifyItems: "center" }}
                    id="demo-simple-select-standard-label"
                  >
                    max
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={ptinsulation.max}
                    onChange={(e) =>
                      setPtInsulation((prev) => ({
                        ...prev,
                        max: e.target.value,
                      }))
                    }
                    label="Insulation(max)"
                    name="max"
                    className={classes.customSelect}
                  >
                    {insulationptmaxRange.map((value) => (
                      <MenuItem key={value} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid ml={1}>
            <MDTypography variant="button" fontWeight="bold" fontSize="16px" marginTop="20px">
              <u> Difference </u>
            </MDTypography>
          </Grid>

          <Grid container mt={2}>
            <Grid item lg={6} xl={6} style={{ display: "flex", alignItems: "baseline" }}>
              {" "}
              <Grid mr={3} ml={3} xl={3} xs={3}>
                <MDTypography variant="button" fontWeight="medium">
                  Sound Level :
                </MDTypography>
              </Grid>
              <Grid mr={5}>
                <FormControl variant="standard" sx={{ minWidth: 50 }}>
                  <InputLabel id="demo-simple-select-standard-label">min</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={ptdifferance.ptsound.min}
                    onChange={(e) =>
                      setPtDifferance((prev) => {
                        let newPrev = { ...prev };
                        console.log(newPrev);
                        newPrev.ptsound.min = e.target.value;
                        return newPrev;
                      })
                    }
                    label="Sound(min)"
                    name="min"
                    className={classes.customSelect}
                  >
                    {soundptminRangeNegative.map((value) => (
                      <MenuItem key={value} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid>
                <FormControl variant="standard" sx={{ minWidth: 50 }}>
                  <InputLabel id="demo-simple-select-standard-label">max</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={ptdifferance.ptsound.max}
                    onChange={(e) =>
                      setPtDifferance((prev) => {
                        let newPrev = { ...prev };
                        newPrev.ptsound.max = e.target.value;
                        return newPrev;
                      })
                    }
                    label="Sound(max)"
                    name="max"
                    className={classes.customSelect}
                  >
                    {soundptminRangePositive.map((value) => (
                      <MenuItem key={value} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item lg={6} xl={6} style={{ display: "flex", alignItems: "baseline" }}>
              <Grid ml={3} mr={3} xl={3} xs={3}>
                <MDTypography variant="button" fontWeight="medium">
                  Frequency :
                </MDTypography>
              </Grid>
              <Grid mr={5}>
                <FormControl variant="standard" sx={{ minWidth: 50 }}>
                  <InputLabel id="demo-simple-select-standard-label">min</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={ptdifferance.ptfrequency.min}
                    onChange={(e) =>
                      setPtDifferance((prev) => {
                        let newPrev = { ...prev };
                        console.log(newPrev);
                        newPrev.ptfrequency.min = e.target.value;
                        return newPrev;
                      })
                    }
                    label="Frequency(min)"
                    name="min"
                    className={classes.customSelect}
                  >
                    {frequencyRangeNagetive.map((value) => (
                      <MenuItem key={value} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid>
                <FormControl variant="standard" sx={{ minWidth: 50 }}>
                  <InputLabel
                    style={{ justifyItems: "center" }}
                    id="demo-simple-select-standard-label"
                  >
                    max
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={ptdifferance.ptfrequency.max}
                    onChange={(e) =>
                      setPtDifferance((prev) => {
                        let newPrev = { ...prev };
                        console.log(newPrev);
                        newPrev.ptfrequency.max = e.target.value;
                        return newPrev;
                      })
                    }
                    label="Frequency(max)"
                    name="max"
                    className={classes.customSelect}
                  >
                    {frequencyRangePositive.map((value) => (
                      <MenuItem key={value} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </MDBox>
        <Grid className={classes.parentFlexRight}>
          <MDButton color="info" onClick={savePtData}>
            Save
          </MDButton>
        </Grid>
      </Card>
    </>
  );
}
