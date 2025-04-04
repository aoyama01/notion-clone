# Notion クローン開発

このリポジトリは, Udemy 講座「[【フルスタック開発】Notion クローンを MERN スタックで本格的に構築する Web アプリケーション開発実践講座](https://www.udemy.com/course/notion-fullstack-webdev/?couponCode=KEEPLEARNING)」を参考に作成した, Notion ライクなメモ管理アプリケーションです. 講師が使用したコードは GitHub 上で Public として公開されています([server](https://github.com/Shin-sibainu/notion-clone-server), [client](https://github.com/Shin-sibainu/notion-clone-client))．本リポジトリではそれらをベースにしつつ, 独自に改変や拡張を行っています.

---

## 概要

- **フロントエンド**  
  React(Vite) + TypeScript を使用しています.
- **バックエンド**  
  Node.js(Express) + TypeScript を使用しています.
- **DB**  
  Mongoose を用いて MongoDB に接続しています.
- **認証**  
  JWT(Json Web Token)によるトークン認証を行っています.
- **状態管理**  
  Redux Toolkit を使用し, メモやユーザーの情報を集中的に管理しています.

---

## 主な機能

1. **ユーザー認証**

   - 新規登録 (Register)
   - ログイン / ログアウト
   - JWT を用いてユーザーを認証

2. **メモ管理機能**

   - 新規メモ作成
   - メモの一覧表示 / 詳細閲覧
   - メモの更新 (タイトル, 本文, 絵文字)
   - メモの削除

3. **サイドバー**

   - ユーザー名やログアウトボタンが表示されます.
   - 登録済みのメモをサイドバーで確認.
   - 絵文字によりメモを簡単に識別可能.

4. **その他 (今後追加したい機能)**
   - お気に入り機能: お気に入り設定や並び替え
   - メモのドラッグ&ドロップ (react-beautiful-dnd 利用など)
   - テキスト入力時のエフェクト ([Power Mode](https://github.com/hoovercj/vscode-power-mode) のような UX を想定)

---

## 使用技術

- **フロントエンド**

  - [React](https://react.dev/)
  - [Vite](https://vitejs.dev/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Redux Toolkit](https://redux-toolkit.js.org/)
  - [Material UI (MUI)](https://mui.com/)

- **バックエンド**

  - [Node.js](https://nodejs.org/)
  - [Express](https://expressjs.com/)
  - [TypeScript](https://www.typescriptlang.org/)

- **データベース**

  - [MongoDB](https://www.mongodb.com/)
  - [Mongoose](https://mongoosejs.com/)

- **認証**

  - [JWT](https://jwt.io/)

- **バリデーション**
  - [express-validator](https://express-validator.github.io/docs/)

---

## 環境構築

### 1. リポジトリのクローン

```bash
git clone https://github.com/aoyama01/notion-clone
cd notion-clone
```

### 2. 環境変数の設定

MongoDB 接続情報などを設定するため, server ディレクトリ内に.env ファイルを作成し, 以下のように変数を定義してください.

```dotenv
MONGODB_URL=your_mongodb_connection_string
SECRET_KEY=any_string_for_password_encryption
TOKEN_SECRET_KEY=any_string_for_jwt
```

### 3. フロントエンドのセットアップ

```bash
cd client
npm install
npm run dev
```

デフォルトではポート 5173 が使用されます. ブラウザで http://localhost:5173 にアクセスするとアプリを確認できます.

### 4. バックエンドのセットアップ

```bash
cd ../server
npm install
npm run dev
```

デフォルトではポート 5000 が使用されます. フロントエンドからは http://localhost:5000/api/v1 を介して API にアクセスできるようになっています.

---

## ディレクトリ構成 (抜粋)

```
.
├── client            // フロントエンド (React + Vite + TypeScript)
│   ├── src
│   ├── public
│   └── package.json
├── server            // バックエンド (Express + TypeScript)
│   ├── src
│   └── package.json
├── .gitignore
└── README.md         // 本ドキュメント
```

---

## 参考

[【フルスタック開発】Notion クローンを MERN スタックで本格的に構築する Web アプリケーション開発実践講座](https://www.udemy.com/course/notion-fullstack-webdev/?couponCode=KEEPLEARNING)

https://github.com/Shin-sibainu/notion-clone-server

https://github.com/Shin-sibainu/notion-clone-client

---
