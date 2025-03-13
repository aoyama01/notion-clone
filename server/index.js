const express = require("express");
const mongoose = require("mongoose");
const app = express();
exports.app = app;
const PORT = 5000;
require("dotenv").config();

app.use(express.json()); // JSONの受け取り設定
app.use("/api/v1", require("./src/v1/routes/auth"));

// MongoDBへの接続
try {
  mongoose.connect(process.env.MONGODB_URL);
  console.log("MongoDBに接続しました．");
} catch (error) {
  console.log(error);
}

// http://localhost:5000/ ← ルートパス
app.get("/", (req, res) => {
  res.send("Hello Express");
});

app.listen(PORT, () => {
  console.log("ローカルサーバー起動中．．．");
});
