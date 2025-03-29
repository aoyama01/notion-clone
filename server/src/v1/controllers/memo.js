const Memo = require("../models/memo");

// メモ作成API
exports.create = async (req, res) => {
  try {
    // Memo.find().count()はMongoose 6以降では非推奨
    const memoCount = await Memo.find().countDocuments(); // メモの個数を取得
    // メモ新規作成
    const memo = await Memo.create({
      user: req.user._id,
      position: memoCount > 0 ? memoCount : 0, // メモの位置を決定
    });
    res.status(201).json(memo); // 成功したらjson形式のメモを返す
  } catch (error) {
    console.error("[メモ作成失敗]", error);
    res.status(500).json(error);
  }
};
