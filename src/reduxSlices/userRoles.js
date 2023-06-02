import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

function decodeToken() {
  if(localStorage.getItem("TOKEN_KEY")){
  const decoded = jwt_decode(localStorage.getItem("TOKEN_KEY"));
  return {role:decoded.role,empCode:decoded.employee_code}
}
return ""
}

const initialState = {
 roles:Number(decodeToken().role),
 empCode:decodeToken().empCode
};

export const userRoles = createSlice({
  name: "USER_ROLES",
  initialState,
  reducers: {
    setRoles: (state, actions) => {
      state.roles = actions.payload
    },
    setEmpcode:(state,actions) =>{
      state.empCode = actions.payload
    }
  },
});

export const { setRoles,setEmpcode } = userRoles.actions;

export default userRoles.reducer;