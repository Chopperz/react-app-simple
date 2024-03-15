import axios from "axios";
import environment from "../environments/environment.tsx";
import globalRouter from "@constants/navigate.tsx";

const httpClient = axios.create({
  baseURL: environment.MOCK_SERVICE_URL,
});

httpClient.interceptors.request.use(
  (config) => {
    console.log(`Axios interceptors request (Config): ${config}`);
    return config;
  },
  (error) => {
    console.log(`Axios interceptors request (Error): ${error}`);
    return error;
  }
);

httpClient.interceptors.response.use(
  (response) => {
    console.log(`Axios interceptors response (Response): ${response}`);
    return response;
  },
  async (error) => {
    console.log(`Axios interceptors response (Error): ${error}`);

    if (error.response && error.response.status === 401) {
      if (localStorage.getItem("user-token") && globalRouter.navigate) {
        localStorage.removeItem("user-token");
        globalRouter.navigate("/login");
      }
    }

    return Promise.reject(error);
  }
);

export default httpClient;
