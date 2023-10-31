import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../src/features/authSLice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
