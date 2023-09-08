import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    noOFSamples: [],
    index:null,
}

export const prePost = createSlice({
    name: "PREPOST",
    initialState,
    reducers: {
        setNoOfSamples: (state, actions) => {
            let tempArray = [];
            state.noOFSamples = [];
            for (let i = 1; i <= actions.payload; i++) {
                tempArray.push(i);
              }
            state.noOFSamples = tempArray
        },
        setPrePostIndex:(state,actions)=>{
            state.index = actions.payload;
        }
    }
});

export const { setNoOfSamples,setPrePostIndex } = prePost.actions;

export default prePost.reducer;