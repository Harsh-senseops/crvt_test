import { configureStore } from "@reduxjs/toolkit";
import userRoles from "reduxSlices/userRoles";
import userManagement from "reduxSlices/userManagement";
import alert from "reduxSlices/alert";
import monthlyPlanner from "reduxSlices/monthlyPlanner";
import yearlyPlanner from "reduxSlices/yearlyPlanner";
import notifications from "reduxSlices/notifications";

export const store = configureStore({
  reducer: {
    userRoles:userRoles,
    um:userManagement,
    alert,
    monthlyPlanner,
    yearlyPlanner,
    notifications
  },
});