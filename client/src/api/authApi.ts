import axiosClient from "./axiosClient";
import { AuthResponse, LoginParams, RegisterParams, User } from "../types/user";

const authApi = {
  register: (params: RegisterParams): Promise<AuthResponse> =>
    axiosClient.post("auth/register", params),
  login: (params: LoginParams): Promise<AuthResponse> =>
    axiosClient.post("auth/login", params),
  verifyToken: (): Promise<{ user: User }> =>
    axiosClient.post("auth/verify-token"),
};

export default authApi;
