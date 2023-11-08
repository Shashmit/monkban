import axios from "axios";
import queryString from "query-string";

const baseURL = "https://kanban-api-production-0401.up.railway.app/api";
const getToken = () => localStorage.getItem("token");

const axiosClient = axios.create({
  baseURL: baseURL,
  paramsSerializer: (params) => queryString.stringify(params), // convert object to string query params
});
// Add a request interceptor
axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  return {
    ...config,
    headers: {
      "access-control-allow-origin": "*",
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`,
    },
  };
});
// Add a response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);

export default axiosClient;
