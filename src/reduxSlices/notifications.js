import { createSlice } from "@reduxjs/toolkit";
// let counter = localStorage.getItem("cn")
const initialState = {
    counter:2,
    shouldPause:true,
    notifications:[]
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
        },
        addNotifications:(state,actions) => {
            if(typeof(actions.payload) === "object"){
                state.notifications = actions.payload
            }else{
                state.notifications.push(actions.payload)
            }
        }
    }
});

export const {setCounter,setShouldPauseNotification,incrementCounter,addNotifications} = notifications.actions;

export default notifications.reducer;