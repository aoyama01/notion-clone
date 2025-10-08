import authApi from "../api/authApi";
import { User } from "../types/user";

const authUtils = {
  // JWTチェック
  isAuthenticated: async (): Promise<User | false> => {
    const token = localStorage.getItem("token");
    if (!token) return false;
    try {
      const res = await authApi.verifyToken();
      return res.user;
    } catch {
      return false;
    }
  },
};

export default authUtils;
