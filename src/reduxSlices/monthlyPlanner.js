import { createSlice } from "@reduxjs/toolkit";
import { current } from "immer";

let months = [
  { month: "April", id: 4 },
  { month: "May", id: 5 },
  { month: "June", id: 6 },
  { month: "July", id: 7 },
  { month: "August", id: 8 },
  { month: "September", id: 9 },
  { month: "October", id: 10 },
  { month: "November", id: 11 },
  { month: "December", id: 12 },
  { month: "January", id: 1 },
  { month: "February", id: 2 },
  { month: "March", id: 3 },
  { month: "April", id: 13 },
];

const initialState = {
  date: {
    month: "",
    year: "",
  },
  shouldPause: true,
  detailsToPush: {
    partCode: "",
    partName: "",
    status: "",
  },
  testName: "",
  monthlyDetails: {
    DUST: [],
    OVEN: [],
    RO: [],
    SHOWER: [],
    "THERMAL CYCLE": [],
    "THERMAL SHOCK": [],
    VIBRATION: [],
  },
  isExpanded: {
  },
};

export const monthlyPlanner = createSlice({
  name: "MONTHLY_PLANNER",
  initialState,
  reducers: {
    setDate: (state, actions) => {
      let index = months.findIndex((obj) => obj.id === actions.payload.month + 1);
      if (index !== -1) {
        state.date.month = months[index].month;
      }
      state.date.year = actions.payload.year;
    },
    setShouldPause: (state, action) => {
      state.shouldPause = action.payload;
    },
    setDetailsToPush: (state, action) => {
      state.detailsToPush = action.payload;
    },
    setTestName: (state, action) => {
      state.testName = action.payload;
    },
    setMonthlyPlanner: (state, action) => {
      state.monthlyDetails[action.payload.testName] = action.payload.data;
    },
    setIsExpanded: (state, action) => {
      let keys = Object.keys(state.isExpanded);
      let payload = action.payload;
      let keysIndex = keys.indexOf(payload);
      if (keysIndex === -1) {
        console.log("fdas")
        state.isExpanded[payload] = true
        return
        }
      for (let i = 0; i < keys.length; i++) {
        if (keysIndex === -1) {
          state.isExpanded[payload] = true;
        } else if (keysIndex === i) {
          state.isExpanded[keys[i]] = state.isExpanded[keys[i]] ? false : true;
        } else if (keysIndex === -1 || keysIndex !== -1) {
          state.isExpanded[keys[i]] = false;
        }
      }
    },
  },
});

export const {
  setDate,
  setShouldPause,
  setDetailsToPush,
  setTestName,
  setSampleDetils,
  setSampleRemaining,
  setMonthlyPlanner,
  setIsExpanded
} = monthlyPlanner.actions;

export default monthlyPlanner.reducer;
