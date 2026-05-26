import { api } from "../config/axiosInstance";

export let registerApi = async (data) => {
  try {
    let res = await api.post("/api/auth/register", data);
    return res.data.data;
  } catch (error) {
    console.log("error in register api", error);
  }
};

export let loginApi = async (data) => {
  try {
    let res = await api.post("/api/auth/login", data);
    return res.data.data;
  } catch (error) {
    console.log("error in login api", error);
  }
};