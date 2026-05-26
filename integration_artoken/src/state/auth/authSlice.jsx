import { createSlice } from "@reduxjs/toolkit";
import { currentUser } from "./authAction";

export let authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoading: true,
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(currentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(currentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(currentUser.rejected, (state) => {
        state.user = null;
        state.isLoading = false;
      });
  },
});

export let { addUser, removeUser } = authSlice.actions;