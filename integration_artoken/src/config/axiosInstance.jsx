import axios from "axios";

export let api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

api.interceptors.response.use(
  (response)=>response,
  async (error)=>{
    let originalReq = error.config;

    if(error.response.status === 401 && !originalReq.retry && error.config.url === "/api/auth/me" ){
      originalReq.retry = true;

      try {
        await api.get("/api/auth/get-accessToken");
        return api(originalReq)
      } catch (error) {
        window.location.href = "/";
        return Promise.reject(error);
      }

    }
  }
)