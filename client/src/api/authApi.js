import axiosClient from "./axiosClient";

const authApi = {
  register: (params) => axiosClient.post("auth/regiter", params),
};

export default authApi;
