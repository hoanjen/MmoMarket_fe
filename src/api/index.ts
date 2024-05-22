import axios, { InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: "https://mmomarket.onrender.com/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json",
  },
});

instance.interceptors.request.use(function (
  config: InternalAxiosRequestConfig
) {
   //todo : if existed token
  // instance.defaults.headers.common["Authorization"] = "Authorization";
  const token ='abc'
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (err) {
    if (err.response.status === 401) {
      console.log("logout");
    }
    console.log(err.response);
    //  return Promise.reject(err) ;
  }
);

export default instance;
