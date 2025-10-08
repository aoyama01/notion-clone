import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./v1/routes";

dotenv.config();

const app: Express = express();
const PORT: number = 5000;

// クライアントのオリジンを許可
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  })
);

app.use(express.json()); // JSONの受け取り設定
app.use("/api/v1", routes);

// MongoDBへの接続
try {
  mongoose.connect(process.env.MONGODB_URL as string);
  console.log("MongoDBに接続しました．");
} catch (error) {
  console.log(error);
}

// http://localhost:5000/ ← ルートパス
app.get("/", (req: Request, res: Response) => {
  res.send("Hello Express");
});

app.listen(PORT, () => {
  console.log("ローカルサーバー起動中．．．");
});

export { app };
