import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showAlert: false,
  message: "",
  color: "", //"primary","secondary", "info", "success","warning", "light",  "dark", "error",
  loader: false,
};

export const alert = createSlice({
  name: "Alert",
  initialState,
  reducers: {
    setAlertData: (state, actions) => {
      state.message = actions.payload.message;
      state.color = actions.payload.color;
      state.showAlert = actions.payload.show;
    },
    setLoader: (state, actions) => {
      state.loader = actions.payload;
    },
  },
});

export const { setAlertData, setLoader } = alert.actions;

export default alert.reducer;