import axios from "axios";
import environment from "../../environments/environment.tsx";

import { useNavigate } from "react-router-dom";

const AxiosInstance = axios.create({
  baseURL: environment.MOCK_SERVICE_URL,
});

AxiosInstance.interceptors.request.use(
  (config) => {
    console.log(`Axios interceptors request (Config): ${config}`);
    return config;
  },
  (error) => {
    console.log(`Axios interceptors request (Error): ${error}`);
    return error;
  }
);

AxiosInstance.interceptors.response.use(
  (response) => {
    console.log(`Axios interceptors response (Response): ${response}`);
    return response;
  },
  async (error) => {
    console.log(`Axios interceptors response (Error): ${error}`);

    if (error.response && error.response.status === 401) {
      if (localStorage.getItem("user-token")) {
        localStorage.removeItem("user-token");
        const navigate = useNavigate();
        navigate("/login");
      }
    }

    return Promise.reject(error);
  }
);

export default AxiosInstance;
