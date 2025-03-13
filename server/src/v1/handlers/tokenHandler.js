const JWT = require("jsonwebtoken");
const User = require("../models/user");

// クライアントから渡されたJWTが正常か検証
const tokenDecode = (req) => {
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ")[1];
    try {
      const decodedToken = JWT.verify(bearer, process.env.TOKEN_SECRET_KEY);
      return decodedToken;
    } catch (error) {
      console.error("トークンの検証に失敗:", error.message);
      return false;
    }
  } else {
    return false;
  }
};

// JWT認証を検証するためのミドルウェア
exports.verifyToken = async (req, res, next) => {
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
      console.error("ユーザー検索中のエラー:", error.message);
      return res.status(500).json("サーバーエラーが発生しました");
    }
  } else {
    return res.status(401).json("権限がありません");
  }
};
