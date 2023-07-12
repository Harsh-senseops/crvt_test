import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fileName:"",
  shouldPause:true
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
     }  
    },
  });
  
  export const { setFileName,setShouldPause } = yearlyPlanner.actions;
  
  export default yearlyPlanner.reducer;