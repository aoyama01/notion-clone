const express = require("express");
const app = express();
const PORT = 5000;

// http://localhost:5000/ ← ルートパス
app.get("/", (req, res) => {
  res.send("Hello Express");
});

app.listen(PORT, () => {
  console.log("ローカルサーバー起動中．．．");
});
