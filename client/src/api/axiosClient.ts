import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

const BASE_URL = "http://localhost:5000/api/v1";

const getToken = (): string | null => localStorage.getItem("token");

const axiosClient = axios.create({
  baseURL: BASE_URL,
});

// APIを叩く前に前処理を行う
axiosClient.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> => {
    config.headers.set("Content-Type", "application/json");
    config.headers.set("authorization", `Bearer ${getToken()}`); // リクエストヘッダーにJWTを付けてサーバーに渡す
    return config;
  }
);

axiosClient.interceptors.response.use(
  (response: AxiosResponse): any => {
    return response.data; // .dataを忘れないこと
  },
  (error: any): Promise<never> => {
    throw error.response;
  }
);

export default axiosClient;
