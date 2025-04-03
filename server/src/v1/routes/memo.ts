import { Router } from "express";
import memoController from "../controllers/memo";
import tokenHandler from "../handlers/tokenHandler";

const router = Router();

// メモ作成のためのルーティング設定
router.post("/", tokenHandler.verifyToken, memoController.create);

// ログインしているユーザーが投稿したメモをすべて取得
router.get("/", tokenHandler.verifyToken, memoController.getAll);

// ログインしているユーザーが投稿したメモを1つ取得
router.get("/:memoId", tokenHandler.verifyToken, memoController.getOne);

// ログインしているユーザーが投稿したメモを1つ更新
router.put("/:memoId", tokenHandler.verifyToken, memoController.update);

// ログインしているユーザーが投稿したメモを1つ削除
// DELETEメソッドを受け取った場合の処理
router.delete("/:memoId", tokenHandler.verifyToken, memoController.delete);

export default router;
