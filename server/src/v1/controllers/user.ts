import { Request, Response } from "express";
import CryptoJS from "crypto-js";
import JWT from "jsonwebtoken";

import User from "../models/user";

interface RegisterBody {
  username: string;
  password: string;
  confirmPassword: string;
}

interface LoginBody {
  username: string;
  password: string;
}

const register = async (req: Request, res: Response) => {
  // パスワードの受け取り
  const password = req.body.password;
  try {
    // パスワードの暗号化
    req.body.password = CryptoJS.AES.encrypt(
      password,
      process.env.SECRET_KEY as string
    ).toString();
    // ユーザーの新規作成
    const user = await User.create(req.body);
    // JWTの発行
    const token = JWT.sign(
      { id: user._id },
      process.env.TOKEN_SECRET_KEY as string,
      {
        expiresIn: "24h",
      }
    );
    return res.status(200).json({ user, token });
  } catch (error) {
    return res.status(500).json(error);
  }
};

// ユーザーログイン用API
const login = async (req: Request<{}, {}, LoginBody>, res: Response) => {
  const { username, password } = req.body;

  try {
    // DBからユーザーが存在するか探してくる
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(401).json({
        errors: [
          {
            param: "username",
            msg: "ユーザー名が無効です",
          },
        ],
      });
    }

    // パスワードの照合
    const decrytedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_KEY as string
    );

    if (decrytedPassword.toString(CryptoJS.enc.Utf8) !== password) {
      return res.status(401).json({
        errors: [
          {
            param: "password",
            msg: "パスワードが無効です",
          },
        ],
      });
    }

    // JWTの発行
    const token = JWT.sign(
      { id: user._id },
      process.env.TOKEN_SECRET_KEY as string,
      {
        expiresIn: "24h",
      }
    );

    return res.status(201).json({ user, token });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default { register, login };
