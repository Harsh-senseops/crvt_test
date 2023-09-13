import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fileName:"",
  shouldPause:true,
  yearlyPlanner:{
   allCrvtDustYearlyPlanners:[],
   allCrvtOvenYearlyPlanners:[],
   allCrvtRoYearlyPlanners:[],
   allCrvtShowerYearlyPlanners:[],
   allCrvtThermalCycleYearlyPlanners:[],
   allCrvtThermalShockYearlyPalnners:[],
   allCrvtVibrationYearlyPlanners:[]
  }
  };

  export const yearlyPlanner = createSlice({
    name: "MONTHLY_PLANNER",
    initialState,
    reducers: {
     setFileName:(state,actions)=>{
        state.fileName = actions.payload
     },
     setShouldPause:(state,actions)=> {
        state.shouldPause = actions.payload
     } ,
     setYearlyPlanner:(state,action)=>{
      state.yearlyPlanner[action.payload.testName] = action.payload.data;
     } 
    },
  });
  
  export const { setFileName,setShouldPause,setYearlyPlanner } = yearlyPlanner.actions;
  
  export default yearlyPlanner.reducer;