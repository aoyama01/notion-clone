const router = require("express").Router();

const memoController = require("../controllers/memo");
const tokenHandler = require("../handlers/tokenHandler");

// メモ作成のためのルーティング設定
router.post("/", tokenHandler.verifyToken, memoController.create);

// ログインしているユーザーが投稿したメモをすべて取得
router.get("/", tokenHandler.verifyToken, memoController.getAllMemo);

module.exports = router;
