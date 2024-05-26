import axios, { InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
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
  const token = "abc";
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (err) {
    if (err.response.status === 401) {
      console.log("logout");
    }
    return err && err.response;
  }
);

export default instance;
