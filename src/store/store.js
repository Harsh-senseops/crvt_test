import { configureStore } from "@reduxjs/toolkit";
import userRoles from "reduxSlices/userRoles";
import userManagement from "reduxSlices/userManagement";
import alert from "reduxSlices/alert";

export const store = configureStore({
  reducer: {
    userRoles:userRoles,
    um:userManagement,
    alert
  },
});