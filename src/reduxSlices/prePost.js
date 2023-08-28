import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    noOFSamples: []
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
    }
});

export const { setNoOfSamples } = prePost.actions;

export default prePost.reducer;