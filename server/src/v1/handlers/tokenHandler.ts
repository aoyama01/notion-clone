import { Request, Response, NextFunction } from "express";
import JWT from "jsonwebtoken";
import User, { IUser } from "../models/user";

// JWT payload interface
interface JwtPayload {
  id: string;
}

// Express Request with user property
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

// クライアントから渡されたJWTが正常か検証
const tokenDecode = (req: Request): JwtPayload | false => {
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ")[1];
    try {
      const decodedToken = JWT.verify(
        bearer,
        process.env.TOKEN_SECRET_KEY as string
      ) as JwtPayload;
      return decodedToken;
    } catch (error) {
      console.error(
        "トークンの検証に失敗:",
        error instanceof Error ? error.message : String(error)
      );
      return false;
    }
  } else {
    return false;
  }
};

// JWT認証を検証するためのミドルウェア
const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const tokenDecoded = tokenDecode(req);
  if (tokenDecoded) {
    // そのJWTと一致するユーザーを探してくる
    try {
      const user = await User.findById(tokenDecoded.id);
      if (!user) {
        return res.status(401).json("権限がありません");
      }
      req.user = user;
      next();
    } catch (error) {
      console.error(
        "ユーザー検索中のエラー:",
        error instanceof Error ? error.message : String(error)
      );
      return res.status(500).json("サーバーエラーが発生しました");
    }
  } else {
    return res.status(401).json("権限がありません");
  }
};

export default { verifyToken };
