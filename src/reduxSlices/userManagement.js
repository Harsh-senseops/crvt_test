import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openDialoge:false,
  rows:[],
  name:"",
  employeeID:"",
  role:"",
  password:"",
  shouldPause:false,
};

export const userManagement = createSlice({
  name: "USER_ROLES",
  initialState,
  reducers: {
    setOpenDialoge: (state, actions) => {
      state.openDialoge = actions.payload
    },
    setName: (state,actions)=>{
      state.name = actions.payload
    },
    setEmployeeId:(state,actions) =>{
      state.employeeID = actions.payload
    },
    setRole:(state,actions)=>{
        state.role = actions.payload
    },
    setPassword:(state,actions)=>{
        state.password = actions.payload
    },
    setRows:(state,actions)=>{
      state.rows = actions.payload
    },
    pushToRows:(state,actions)=>{
      state.rows.push(actions.payload)
    },
    setRexecuteQuery:(state,action)=>{
      state.shouldPause = action.payload
    },
  },
});

export const { setOpenDialoge,setName,setEmployeeId,setRole,setPassword,setRows,pushToRows,setRexecuteQuery } = userManagement.actions;

export default userManagement.reducer;