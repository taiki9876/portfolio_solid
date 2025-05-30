サイトURL
[準備中]

## 技術スタック
* フロントエンド
  * React
  * TypeScript
  * Vite
  * Css Module
* バックエンド
  * PHP + Laravel
  * MySQL
  * Redis
  * Docker Compose
  * Apache

## 環境構築

### 前提条件
* docker とdocker-composeがインストールされていること
* nodejsがインストールされていること
* [Firebaseのプロジェクト](doc/firebase/firebase_setup.md)を作成していること

### 1. リポジトリをクローン
```bash
git clone git@github.com:taiki9876/portfolio_solid.git
cd portfolio_solid
```
ディレクトリ構成の概要
```
backend （Laravelのバックエンド）
frontend (Reactのフロントエンド）
docker (dockerコンテナの設定)
doc (ドキュメント)
```


### 2 .envの設定
.env.exampleをコピーして、.envを作成してください。
```bash
cp backend
cp .env.example .env
```

### 3. コンテナ立ち上げ
firebase(チャット)の機能があるため、コンテナにgrpcをインストールします。  
その関係でビルドには30分ほどかかります。  
```bash
# カレントディレクトリはプロジェクトルートに移動して行ってください。
make upd
```

### 4. 依存解決
```bash
make composer
make npm
```

### 5. マイグレーション
テストデータも挿入します。
```bash
make migrate
make migrate-refresh
```

### 6. フロントエンド開発
```bash
# フロントエンドのビルド（watchモード）
make watch

# フロントエンドのビルド（本番モードでビルドします）
make prod
```

### 7. サイトにアクセスする
```bash


