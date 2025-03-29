import axiosClient from "./axiosClient";

const memoApi = {
  //   create: () => axiosClient.post("memo"), // エンドポイントは'/memo'
  create: () =>
    axiosClient.post("/memo", {
      title: "無題",
      description: "ここにメモを記入して下さい。",
    }),
};

export default memoApi;
