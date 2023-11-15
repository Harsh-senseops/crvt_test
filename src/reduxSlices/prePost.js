import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    noOFSamples: [],
    index:null,
    isSampleTrue:false,
}

export const prePost = createSlice({
    name: "PREPOST",
    initialState,
    reducers: {
        setNoOfSamples: (state, actions) => {
            if(!actions.payload){
                state.noOFSamples = null;
                return;
            }
            let tempArray = [];
            state.noOFSamples = [];
            for (let i = 1; i <= actions.payload; i++) {
                tempArray.push(i);
              }
            state.noOFSamples = tempArray
        },
        setPrePostIndex:(state,actions)=>{
            state.index = actions.payload;
        },
        setIsSampleTrue:(state,action)=>{
            state.isSampleTrue = action.payload
        }
    }
});

export const { setNoOfSamples,setPrePostIndex,setIsSampleTrue } = prePost.actions;

export default prePost.reducer;