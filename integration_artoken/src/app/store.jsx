import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../state/auth/authSlice";

export let store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});