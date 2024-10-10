import axios from "axios";
import { apibaseUrl, timeOut } from "./constants";
// import { userStore, userProp } from "../store/GlobalStore";

// Create an instance of axios with a custom configuration
const api = axios.create({
  baseURL: apibaseUrl,
  timeout: timeOut, // Set a timeout for requests (in milliseconds)
});

// Optional: Add interceptors for request/response handling
// api.interceptors.request.use(
//   (config) => {
//     // You can add authorization headers or other custom settings here
//     // const token = userStore((state) => (state as userProp).token); // Example: Retrieve token from localStorage
//     // not the best solution---please do better!!!!!
//     const state = sessionStorage.getItem("user-details") as string;

//     // console.log(JSON.parse(state).state.token);
//     const token = JSON.parse(state).state.token;
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Handle global errors here (e.g., redirect to login on 401)
//     return Promise.reject(error);
//   }
// );

export default api;
