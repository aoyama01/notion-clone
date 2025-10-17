# Notion Clone

MERNスタック（MongoDB, Express, React, Node.js）で構築した、Notion風のメモ管理Webアプリケーションです。

ユーザー認証機能から、メモのCRUD操作（作成、閲覧、更新、削除）まで実装しており、サイドバーでメモ一覧を確認しながら、絵文字アイコンでメモを視覚的に識別できます。

## 目次

- [開発した背景](#開発した背景)
- [主要機能](#主要機能)
- [使用技術](#使用技術)
- [セットアップ](#セットアップ)
- [ディレクトリ構造](#ディレクトリ構造)
- [こだわり／工夫した点](#こだわり工夫した点)
- [今後の展望](#今後の展望)

## 開発した背景

フルスタック開発における設計から実装までのプロセスを実践的に学ぶために、このプロジェクトを作成しました。

Notionを題材に選んだ理由は、単純にNotionアプリが好きだからです。ブラウザ上で柔軟なメモやドキュメント管理が完結する体験は素晴らしく、初めて使ったときに感動しました。その内部実装（特にテキストの編集同期）がどのように動作しているのか気になり、自分で理解・再現してみたいと考えました。

## 主要機能

### 1. ユーザー認証
- 新規ユーザー登録
- ログイン・ログアウト
- JWT トークンベースの認証

### 2. メモ管理
- メモの新規作成
- メモ一覧表示（サイドバー）
- メモの詳細閲覧
- メモのタイトル・本文の編集（リアルタイム自動保存）
- メモの削除（確認ダイアログ付き）

### 3. 視覚的識別
- 絵文字アイコンによるメモの識別
- サイドバーとメインコンテンツのリアルタイム連動

## 使用技術

### Frontend
| 技術 | バージョン | 用途 |
|------|-----------|------|
| React | ^17.0.2 | UIライブラリ |
| TypeScript | ^5.8.2 | 型安全な開発 |
| Redux Toolkit | ^2.6.1 | 状態管理 |
| Material-UI (MUI) | ^6.4.8 | UIコンポーネント |
| React Router | ^6.3.0 | ルーティング |
| Axios | ^1.8.4 | HTTP通信 |
| Vite | ^6.2.0 | ビルドツール |
| emoji-mart | ^5.6.0 | 絵文字ピッカー |

### Backend
| 技術 | バージョン | 用途 |
|------|-----------|------|
| Node.js | - | サーバーサイドランタイム |
| Express | ^4.21.2 | Webフレームワーク |
| TypeScript | ^5.8.2 | 型安全な開発 |
| MongoDB | - | NoSQLデータベース |
| Mongoose | ^8.12.1 | MongoDBのODM |
| JSON Web Token | ^9.0.2 | 認証トークン |
| express-validator | ^7.2.1 | バリデーション |
| crypto-js | ^4.2.0 | パスワード暗号化 |

### Development Tools
- ESLint - コード品質チェック
- ts-node - TypeScript実行環境
- nodemon - ホットリロード

## セットアップ

### 前提条件

以下のツールがインストールされている必要があります：

- Node.js（推奨: v16以上）
- npm または yarn
- MongoDB Atlas アカウント（または ローカルMongoDB）

### インストール

1. リポジトリをクローン
```bash
git clone https://github.com/yourusername/notion-clone.git
cd notion-clone
```

2. サーバー側の依存関係をインストール
```bash
cd server
npm install
```

3. クライアント側の依存関係をインストール
```bash
cd ../client
npm install
```

### 環境変数の設定

サーバー側で環境変数を設定します。`server/.env.example`を参考に、`server/.env`ファイルを作成してください。

```bash
# server/.env
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/dbname
TOKEN_SECRET_KEY=your_jwt_secret_key
PASSWORD_SECRET_KEY=your_password_secret_key
```

**注意**: 実際の認証情報は`.env`ファイルに記載し、**決してGitにコミットしないでください**。

### 開発サーバーの起動

#### サーバー（ポート 5000）
```bash
cd server
npm run dev
```

#### クライアント（ポート 5173）
```bash
cd client
npm run dev
```

ブラウザで [http://localhost:5173](http://localhost:5173) を開くと、アプリケーションが起動します。

## ビルド・デプロイ

### クライアントのビルド
```bash
cd client
npm run build
```

ビルドされたファイルは`client/dist`ディレクトリに出力されます。

### サーバーのビルド
```bash
cd server
npm run build
```

TypeScriptファイルがコンパイルされ、JavaScriptファイルが生成されます。

## ディレクトリ構造

```
notion-clone/
├── client/                  # フロントエンド（React + TypeScript）
│   ├── src/
│   │   ├── api/            # APIクライアント（Axios）
│   │   ├── assets/         # 静的ファイル
│   │   ├── components/     # Reactコンポーネント
│   │   │   ├── common/    # 共通コンポーネント（EmojiPicker, Sidebar）
│   │   │   ├── layout/    # レイアウトコンポーネント
│   │   │   └── pages/     # ページコンポーネント（Home, Login, Register, Memo）
│   │   ├── redux/         # Redux Toolkit設定
│   │   │   ├── features/  # スライス（userSlice, memoSlice）
│   │   │   └── store.ts   # ストア設定
│   │   ├── types/         # TypeScript型定義
│   │   ├── utils/         # ユーティリティ関数
│   │   ├── App.tsx        # ルートコンポーネント
│   │   └── main.tsx       # エントリーポイント
│   ├── package.json
│   └── vite.config.ts
│
├── server/                  # バックエンド（Express + TypeScript）
│   ├── src/
│   │   ├── v1/
│   │   │   ├── controllers/  # コントローラー（user, memo）
│   │   │   ├── handlers/     # ミドルウェア（tokenHandler, validation）
│   │   │   ├── models/       # Mongooseモデル（User, Memo）
│   │   │   └── routes/       # ルーティング（auth, memo）
│   │   └── index.ts          # サーバーエントリーポイント
│   ├── .env                  # 環境変数（要設定）
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

## こだわり／工夫した点

### 1. Redux Toolkit による効率的な状態管理

メモやユーザー情報をRedux Toolkitで一元管理することで、アプリケーション全体で状態を効率的に共有・更新できるように設計しました。特に、メモの追加・更新・削除時にサイドバーとメインコンテンツの表示がリアルタイムに連動するよう、Reduxストアを活用して実装しています。

**実装箇所**: [client/src/redux/features/memoSlice.ts](client/src/redux/features/memoSlice.ts), [client/src/redux/store.ts](client/src/redux/store.ts)

### 2. リアルタイム入力とAPIリクエストのデバウンス処理

メモのタイトルや説明文の編集で、ユーザーが文字を入力するたびにAPIリクエストを送信するのではなく、一定時間入力が停止した際にAPIを呼び出すデバウンス処理を実装しました。不要なAPIコールを削減し、サーバーへの負荷を軽減するとともに、ユーザー体験の向上を図っています。

**実装箇所**: [client/src/components/pages/Memo.tsx](client/src/components/pages/Memo.tsx)

### 3. フォームバリデーション（多層防御）

ユーザー登録・ログイン画面では、ユーザー名とパスワードに対して正規表現を用いたリアルタイムバリデーションと送信時のバリデーションを実装しています。これにより、不正な入力を防ぎ、データの整合性が保証されます。サーバー側でも`express-validator`を使用し、多層的なバリデーションを適用しています。

**実装箇所**:
- フロント: [client/src/components/pages/Register.tsx](client/src/components/pages/Register.tsx), [client/src/components/pages/Login.tsx](client/src/components/pages/Login.tsx)
- サーバー: [server/src/v1/handlers/validation.ts](server/src/v1/handlers/validation.ts)

### 4. 削除確認ダイアログ

メモの削除機能には、誤操作を防ぐための確認ダイアログを実装しました（大事なメモが消えてしまったら悲しいので）。削除対象のメモのタイトルを正確に入力しなければ削除ボタンを有効化しないようにすることで、データの意図しない喪失を防いでいます。

**実装箇所**: [client/src/components/pages/Memo.tsx](client/src/components/pages/Memo.tsx)

### 5. Material UIと絵文字によるモダンで親しみやすいUI/UX

Material UI（MUI）コンポーネントを全面的に採用することで、一貫性があり、ユーザーフレンドリーでモダンなUIを構築しました。また、メモに絵文字アイコンを設定できるようにして、メモを楽しく識別できるようにしています。

**実装箇所**: [client/src/components/common/EmojiPicker.tsx](client/src/components/common/EmojiPicker.tsx)

### 6. Axiosインターセプターによる共通処理の集約

Axiosインターセプターを使用して、JWTトークンの自動付与やエラーハンドリングを一元化し、保守性を向上させました。

**実装箇所**: [client/src/api/axiosClient.ts](client/src/api/axiosClient.ts)

## 学んだこと

- フルスタック開発における設計・実装プロセスの実践的な経験
- Redux Toolkitによる効率的な状態管理の実装方法
- デバウンス処理によるパフォーマンス最適化の重要性
- 多層的なバリデーションによるセキュリティの確保
- Material UIを活用したモダンなUI/UX設計
- MongoDBとMongooseを使ったNoSQLデータベース設計
- JWTによるトークンベース認証の仕組み

## 今後の展望

- [ ] リッチテキストエディタの導入（例：Draft.js, Slate.js）
- [ ] メモの検索・フィルター機能
- [ ] メモのカテゴリー・タグ機能
- [ ] ダークモード対応
- [ ] リアルタイム共同編集機能（WebSocket）
- [ ] メモのエクスポート機能（Markdown, PDF）
- [ ] モバイルレスポンシブ対応の強化
- [ ] 本番環境へのデプロイ（Vercel, Railway等）

## トラブルシューティング

### Q: サーバーが起動しない
- MongoDB接続URLが正しく設定されているか確認してください（`server/.env`）
- MongoDB Atlasのネットワークアクセス設定で、IPアドレスが許可されているか確認してください

### Q: クライアントからAPIにアクセスできない
- サーバーが起動しているか確認してください（ポート5000）
- CORS設定が正しいか確認してください（[server/src/index.ts:14-16](server/src/index.ts#L14-L16)）

### Q: ログインができない
- ユーザー登録が完了しているか確認してください
- パスワードが暗号化キーと一致しているか確認してください（`server/.env`の`PASSWORD_SECRET_KEY`）

## ライセンス

このプロジェクトは学習目的で作成されています。
