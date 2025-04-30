サイトURL
[準備中]

## 技術スタック
* フロントエンド
  * React
  * TypeScript
  * Vite
  * Css Module
  * Storybook
* バックエンド
  * PHP + Laravel
  * MySQL
  * Redis
  * Docker Compose
  * Apache

## このサービスの概要
管理画面を模したポートフォリオサイトです。  
Reactを使用して、SPAでフロントエンドを構築しています。  

### アクター
アクターは管理者です。権限の順に並べます
* システム管理者（契約アカウントの追加などが可能）
* サポート管理者（CSが利用するような場面を想定、店舗アカウントと近い権限を持つが機能制限あり）
* オーナー管理者（店舗オーナー管理者。顧客は基本的にこのアカウントを利用する）

### 今後の展望
現状管理画面のみだが、Flutterを使用して、モバイルアプリを作成する予定。
その他、契約内容によってはwebアプリみたいな分岐も想定。


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
[補足]ディレクトリ構成の概要
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
この時firebaseにもユーザーを作成するため[Firebaseのプロジェクト](doc/firebase/firebase_setup.md)を作成しておいてください。  
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
http://localhost:8333/admin/login  
ログイン情報（ログインID、パスワード）：
* admin
* password

