import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    counter:0,
    alerts:[]
}

export const machineAlerts = createSlice({
    name:"MACHINE_ALERTS",
    initialState,
    reducers:{
        setCounter : (state,actions) => {
            state.counter+=(actions.payload)
        },
        setAlerts: (state,actions) => {
            if(typeof(actions.payload) === "object"){
                state.alerts = actions.payload
            }else{
                state.alerts.push(actions.payload)
            }
        }
    }
})

export const {
    setCounter,setAlerts
} = machineAlerts.actions;

export default machineAlerts.reducer;