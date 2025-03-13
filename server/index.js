const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 5000;
require("dotenv").config();

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
