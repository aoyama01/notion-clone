import axiosClient from "./axiosClient";

const memoApi = {
  //   create: () => axiosClient.post("memo"), // エンドポイントは'/memo'
  create: () => axiosClient.post("memo"),
  getAll: () => axiosClient.get("memo"),
  getOne: (id) => axiosClient.get(`memo/${id}`),
  update: (id, param) => axiosClient.put(`memo/${id}`, param),
  delete: (id) => axiosClient.delete(`memo/${id}`),
};

export default memoApi;
