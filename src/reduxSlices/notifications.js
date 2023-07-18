import { createSlice } from "@reduxjs/toolkit";
// let counter = localStorage.getItem("cn")
const initialState = {
    counter:2,
    shouldPause:true
}

export const notifications = createSlice({
    name:"NOTIFICATION",
    initialState,
    reducers: {
        setCounter : (state,actions)=>{
            state.counter=actions.payload
        },
        setShouldPauseNotification : (state,actions)=>{
            state.shouldPause = actions.payload
        },
        incrementCounter:(state,action)=>{
            state.counter+=action.payload
        }

    }
});

export const {setCounter,setShouldPauseNotification,incrementCounter} = notifications.actions;

export default notifications.reducer;