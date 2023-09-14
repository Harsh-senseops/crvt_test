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
import { useMutation, useQuery, useSubscription } from "urql";

import Grid from "@mui/material/Grid";
import { CREATE_PRE_TEST } from "apis/queries";
import { FATCH_PRE_DATA } from "apis/queries";
import { useSelector, useDispatch } from "react-redux";
import alertAndLoaders from "utils/alertAndLoaders";
import { UPDATE_PRE_TEST } from "apis/queries";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    margin: "1%",
  },
  customSelect: {
    color: "#FFFF",
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

export default function PreTest({ id }) {
  const [current, setCurrent] = useState({ min: "", max: "" });
  const [frequency, setFrequency] = useState({ min: "", max: "" });
  const [sound, setSound] = useState({ min: "", max: "" });
  const [insulation, setInsulation] = useState({ min: "", max: "" });
  const [flag, setFlag] = useState(false);
  const [createPreDataRes, createPreData] = useMutation(CREATE_PRE_TEST);
  const [updatePreData, updatePreDataResults] = useMutation(UPDATE_PRE_TEST);
  const [preTestById, rexpreTestById] = useSubscription({
    query: FATCH_PRE_DATA,
    variables: { componentId: id },
  });

  const classes = useStyles();
  const role = useSelector((store) => {
    return store.userRoles;
  });
  const dispatch = useDispatch();

  const currentminStart = 2;
  const currentminEnd = 5;
  const currentminRange = Array.from(
    { length: Math.ceil((currentminEnd - currentminStart) / 0.5) + 1 },
    (_, index) => currentminStart + 0.5 * index
  );

  const currentmaxStart = 2;
  const currentmaxEnd = 5;
  const currentmaxRange = Array.from(
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

  const frqmaxStart = 400;
  const frqmaxEnd = 560;
  const frqmaxRange = Array.from(
    {
      length: Math.min(frqmaxEnd - frqmaxStart + 1, Math.ceil((frqmaxEnd - frqmaxStart + 1) / 40)),
    },
    (_, index) => frqmaxStart + 40 * index
  );

  const soundminStart = 85;
  const soundminEnd = 105;
  const soundminRange = Array.from(
    { length: Math.ceil((soundminEnd - soundminStart + 1) / 10) },
    (_, index) => soundminStart + 10 * index
  );

  const soundmaxStart = 100;
  const soundmaxEnd = 130;
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

  const insulationmaxStart = 1;
  const insulationmaxEnd = 10;
  const insulationmaxRange = Array.from(
    { length: Math.ceil((insulationmaxEnd - insulationmaxStart + 1) / 2) },
    (_, index) => insulationmaxStart + 2 * index
  );

  useEffect(() => {
    if (preTestById.data) {
      if (preTestById.data.crvtPreTestTableByComponentId) {
        setFlag(true);
        let data = preTestById.data.crvtPreTestTableByComponentId;
        setCurrent({
          min: parseInt(JSON.parse(data.prCurrent).min),
          max: JSON.parse(data.prCurrent).max,
        });
        setSound({
          min: parseInt(JSON.parse(data.prSoundLvl).min),
          max: JSON.parse(data.prSoundLvl).max,
        });
        setFrequency({
          min: parseInt(JSON.parse(data.prFrequency).min),
          max: JSON.parse(data.prFrequency).max,
        });
        setInsulation({
          min: parseInt(JSON.parse(data.prInsulationRs).min),
          max: JSON.parse(data.prInsulationRs).max,
        });
      } else {
        setFlag(false);
      }
      // console.log(JSON.parse(data.prDifferance).sound.min)
    }
  }, [preTestById.data]);

  const savePrData = () => {
    let currentVal = JSON.stringify(current);
    let frequencyVal = JSON.stringify(frequency);
    let soundVal = JSON.stringify(sound);
    // let differanceVal = JSON.stringify(differance);
    let InsulationVal = JSON.stringify(insulation);

    if (
      current.min === "" ||
      current.max === "" ||
      frequency.min === "" ||
      frequency.max === "" ||
      insulation.min === "" ||
      insulation.max === "" ||
      sound.min === "" ||
      sound.max === ""
    ) {
      alertAndLoaders("UNSHOW_ALERT", dispatch, "Please Fill All The Fields... ", "warning");
      return;
    }
    if (flag === true) {
      updatePreDataResults({
        componentId: id,
        prCurrent: currentVal,
        prInsulationRs: InsulationVal,
        prFrequency: frequencyVal,
        prSoundLvl: soundVal,
        // prDifferance: differanceVal,
      }).then((res) => {
        console.log(res);
        if (res.data) {
          alertAndLoaders("UNSHOW_ALERT", dispatch, "Pre Test Details Are Updated... ", "success");
        } else if (res.error) {
          alertAndLoaders("UNSHOW_ALERT", dispatch, "Something Went Wrong... ", "error");
        }
      });
    } else {
      createPreData({
        componentId: id,
        prCurrent: currentVal,
        prInsulationRs: InsulationVal,
        prFrequency: frequencyVal,
        prSoundLvl: soundVal,
      }).then((res) => {
        console.log(res);
        if (res.data) {
          alertAndLoaders(
            "UNSHOW_ALERT",
            dispatch,
            "Pre Test Details Are Configured... ",
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
          Pre Test configurations
        </MDTypography>
        <MDBox m={2}>
          <Grid container>
            <Grid item lg={6} xl={6} mb={3} style={{ display: "flex", alignItems: "baseline" }}>
              {" "}
              <Grid mr={3} ml={3}>
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
                    value={current.min}
                    onChange={(e) =>
                      setCurrent((prev) => ({
                        ...prev,
                        min: e.target.value,
                      }))
                    }
                    label="Current"
                    name="min"
                    className={classes.customSelect}
                  >
                    {currentminRange.map((value) => (
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
                    value={current.max}
                    onChange={(e) =>
                      setCurrent((prev) => ({
                        ...prev,
                        max: e.target.value,
                      }))
                    }
                    label="Current"
                    name="max"
                    className={classes.customSelect}
                  >
                    {currentmaxRange.map((value) => (
                      <MenuItem key={value} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item lg={6} xl={6} style={{ display: "flex", alignItems: "baseline" }}>
              <Grid mr={3} ml={3}>
                <MDTypography variant="button" fontWeight="medium">
                  Frequency :
                </MDTypography>
              </Grid>
              <Grid mr={5} ml={2}>
                <FormControl variant="standard" sx={{ minWidth: 50 }}>
                  <InputLabel id="demo-simple-select-standard-label">min</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={frequency.min}
                    onChange={(e) =>
                      setFrequency((prev) => ({
                        ...prev,
                        min: e.target.value,
                      }))
                    }
                    label="Frequency(min)"
                    name="min"
                    className={classes.customSelect}
                  >
                    {frqminRange.map((value) => (
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
                    value={frequency.max}
                    onChange={(e) =>
                      setFrequency((prev) => ({
                        ...prev,
                        max: e.target.value,
                      }))
                    }
                    label="Frequency(max)"
                    name="max"
                    className={classes.customSelect}
                  >
                    {frqmaxRange.map((value) => (
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
              <Grid xl={3} xs={3} mr={3} ml={3}>
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
                    value={sound.min}
                    onChange={(e) =>
                      setSound((prev) => ({
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
                    value={sound.max}
                    onChange={(e) =>
                      setSound((prev) => ({
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
              <Grid item lg={3} xs={3} mr={3} ml={3}>
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
                    value={insulation.min}
                    onChange={(e) =>
                      setInsulation((prev) => ({
                        ...prev,
                        min: e.target.value,
                      }))
                    }
                    label="Insulation(min)"
                    name="min"
                    className={classes.customSelect}
                  >
                    {insulationminRange.map((value) => (
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
                    value={insulation.max}
                    onChange={(e) =>
                      setInsulation((prev) => ({
                        ...prev,
                        max: e.target.value,
                      }))
                    }
                    label="Insulation(max)"
                    name="max"
                    className={classes.customSelect}
                  >
                    {insulationmaxRange.map((value) => (
                      <MenuItem key={value} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          {/* <Grid ml={3}>
          <MDTypography variant="button" fontWeight="medium" marginTop="500px">
            Differance :
          </MDTypography>
          </Grid> */}
          {/* <Grid container mt={2}>
            <Grid
              item
              lg={6}
              xl={6}
              style={{ display: "flex", alignItems: "baseline" }}
            ><Grid mr={3} ml={3}>
                 <MDTypography variant="button" fontWeight="medium">
                Sound Level :
              </MDTypography>
            </Grid>
             <Grid ml={1} mr={5}>
             <FormControl variant="standard" sx={{ minWidth: 50 }}>
                <InputLabel id="demo-simple-select-standard-label">min</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={differance.sound.min}
                  onChange={(e) =>
                    setDifferance((prev) => {
                      let newPrev = { ...prev };
                      newPrev.sound.min = e.target.value;
                      return newPrev;
                    })
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
                  value={differance.sound.max}
                  onChange={(e) =>
                    setDifferance((prev) => {
                      let newPrev = { ...prev };
                      newPrev.sound.max = e.target.value;
                      return newPrev;
                    })
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
            <Grid
              item
              lg={6}
              xl={6}
              style={{ display: "flex", alignItems: "baseline" }}
            ><Grid ml={3} mr={3}>
                 <MDTypography variant="button" fontWeight="medium">
                Frequency :
              </MDTypography>
            </Grid>
             <Grid ml={2} mr={5}>
             <FormControl variant="standard" sx={{ minWidth: 50 }}>
                <InputLabel id="demo-simple-select-standard-label">min</InputLabel>
                <Select
                  style={{ color: "#fffff" }}
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={differance.frequency.min}
                  onChange={(e) =>
                    setDifferance((prev) => {
                      let newPrev = { ...prev };
                      newPrev.frequency.min = e.target.value;
                      return newPrev;
                    })
                  }
                  label="Frequency(min)"
                  name="min"
                  className={classes.customSelect}
                >
                  {frqminRange.map((value) => (
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
                  value={differance.frequency.max}
                  onChange={(e) =>
                    setDifferance((prev) => {
                      let newPrev = { ...prev };
                      newPrev.frequency.max = e.target.value;
                      return newPrev;
                    })
                  }
                  label="Frequency(max)"
                  name="max"
                  className={classes.customSelect}
                >
                  {frqmaxRange.map((value) => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
             </Grid>
            </Grid>
          </Grid> */}
        </MDBox>
        <Grid className={classes.parentFlexRight}>
          <MDButton color="info" onClick={savePrData}>
            Save
          </MDButton>
        </Grid>
      </Card>
    </>
  );
}
