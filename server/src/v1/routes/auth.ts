import { Router, Request, Response } from "express";
import { body } from "express-validator";

import User from "../models/user";
import validation from "../handlers/validation";
import userController from "../controllers/user";
import tokenHandler from "../handlers/tokenHandler";

const router = Router();

// ユーザー新規登録API
router.post(
  "/register",
  // バリデーションチェック
  body("username")
    .isLength({ min: 8 })
    .withMessage("ユーザー名は8文字以上である必要があります"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("パスワードは8文字以上である必要があります"),
  body("confirmPassword")
    .isLength({ min: 8 })
    .withMessage("確認用パスワードは8文字以上である必要があります"),
  body("username").custom((value) => {
    return User.findOne({ username: value }).then((user) => {
      if (user) {
        return Promise.reject("このユーザー名はすでに使われています");
      }
    });
  }),
  validation.validate,
  userController.register
);

// ユーザーログイン用API
router.post(
  "/login",
  body("username")
    .isLength({ min: 8 })
    .withMessage("ユーザー名は8文字以上である必要があります"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("パスワードは8文字以上である必要があります"),
  validation.validate,
  userController.login
);

// JWT認証API
router.post(
  "/verify-token",
  tokenHandler.verifyToken,
  (req: Request, res: Response) => {
    res.status(200).json({ user: req.user });
    return;
  }
);

export default router;
