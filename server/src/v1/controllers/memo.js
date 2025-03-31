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

// 全てのメモを取得するAPI
exports.getAll = async (req, res) => {
  try {
    const memos = await Memo.find({ user: req.user._id }).sort("-position"); // ユーザーのメモを取得
    res.status(200).json(memos); // 成功したらjson形式のメモを返す
  } catch (error) {
    console.error("[メモ作成失敗]", error);
    res.status(500).json(error);
  }
};

// ユーザーの特定のメモを取得するAPI
exports.getOne = async (req, res) => {
  const memoId = req.params.memoId; // URLからメモのIDを取得(プレースホルダを取得)
  try {
    const memo = await Memo.findOne({ user: req.user._id, _id: memoId }); // 特定のユーザーの特定のメモを取得
    if (!memo) {
      return res.status(404).json({ message: "メモが存在しません" });
    }
    res.status(200).json(memo); // 成功したらjson形式のメモを返す
  } catch (error) {
    res.status(500).json(error);
  }
};

// メモを更新するAPI
exports.update = async (req, res) => {
  const memoId = req.params.memoId; // URLからメモのIDを取得(プレースホルダを取得)
  const { title, description } = req.body;

  try {
    if (title === "") req.body.title = "無題";
    if (description === "")
      req.body.description = "ここに自由に記入して下さい．";

    const memo = await Memo.findOne({ user: req.user._id, _id: memoId }); // 特定のユーザーの特定のメモを取得
    if (!memo) return res.status(404).json({ message: "メモが存在しません" });

    const updatedMemo = await Memo.findByIdAndUpdate(memoId, {
      $set: req.body, // もろもろのパラメータの更新
    });

    res.status(200).json(updatedMemo); // 成功したらjson形式のメモを返す
  } catch (error) {
    res.status(500).json(error);
  }
};

// メモを削除するAPI
exports.delete = async (req, res) => {
  const memoId = req.params.memoId; // URLからメモのIDを取得(プレースホルダを取得)
  console.log(`これから消すメモのID: ${memoId}`);
  try {
    const memo = await Memo.findOne({ user: req.user._id, _id: memoId }); // 特定のユーザーの特定のメモを取得
    if (!memo) return res.status(404).json({ message: "メモが存在しません" });

    await Memo.deleteOne({ _id: memoId });
    res.status(200).json({ message: "メモが削除されました" });
  } catch (error) {
    // console.error("[メモ削除失敗]", error);
    console.log("[メモ削除失敗]", error);
    res.status(500).json(error);
  }
};
