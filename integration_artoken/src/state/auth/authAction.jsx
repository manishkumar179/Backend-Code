import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/axiosInstance";

export let currentUser = createAsyncThunk("auth/me", async (_, thunkApi) => {
  try {
    let res = await api.get("/api/auth/me");
    return res?.data?.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});