import axiosClient from "./axiosClient";
import { Memo } from "../types/memo";

interface MemoUpdateParams {
  title?: string;
  description?: string;
  icon?: string;
  favorite?: boolean;
  favoritePosition?: number;
  position?: number;
}

const memoApi = {
  create: (): Promise<Memo> => axiosClient.post("memo"),
  getAll: (): Promise<Memo[]> => axiosClient.get("memo"),
  getOne: (id: string): Promise<Memo> => axiosClient.get(`memo/${id}`),
  update: (id: string, params: MemoUpdateParams): Promise<Memo> =>
    axiosClient.put(`memo/${id}`, params),
  delete: (id: string): Promise<any> => axiosClient.delete(`memo/${id}`),
};

export default memoApi;
