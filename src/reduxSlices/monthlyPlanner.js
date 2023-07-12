import { createSlice } from "@reduxjs/toolkit";

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
  shouldPause:true,
  detailsToPush:{
    partCode:"",
    partName:"",
    status:""
  },
  testName:"",
  samplesDetails:{
    "DUST":[],
    "OVEN":[],
    "RO":[],
    "SHOWER":[],
    "THERMAL CYCLE":[],
    "THERMAL SHOCK":[],
    "VIBRATION":[]
  }
};

export const monthlyPlanner = createSlice({
  name: "MONTHLY_PLANNER",
  initialState,
  reducers: {
    setDate: (state, actions) => {
      let index = months.findIndex((obj) => obj.id === actions.payload.month + 1);
        if(index !== -1){
            state.date.month = months[index].month
        }
      state.date.year = actions.payload.year;
    },
    setShouldPause:(state,action)=>{
        state.shouldPause = action.payload
    },
    setDetailsToPush:(state,action)=>{
      state.detailsToPush = action.payload
    },
    setTestName:(state,action) => {
      state.testName = action.payload
    },
    setSampleDetils:(state,action)=>{
      let index = state.samplesDetails[action.payload.testName].findIndex((obj)=>obj.componentName === action.payload.componentName)
      if(index === -1){
        state.samplesDetails[action.payload.testName].push({
          componentName:action.payload.componentName,
          samples:action.payload.samples,
          samplesRemaining:0,
        })
      }
     
    }
  },
});

export const { setDate,setShouldPause,setDetailsToPush,setTestName,setSampleDetils } = monthlyPlanner.actions;

export default monthlyPlanner.reducer;
