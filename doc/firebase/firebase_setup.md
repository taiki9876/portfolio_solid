# Firebaseについて

Firebaseとの連携には [kreait/laravel-firebase](https://github.com/kreait/laravel-firebase) を使用する。


## Firebaseプロジェクトの作成方針
バックエンド、フロントエンド両方にFirebaseを使用する。<br>
各環境間でのデータの混成を防ぐため、Firebaseプロジェクトは環境毎(local, dev, stg, prod...)に作成する。

**ローカル環境は個人ごとにFirebaseプロジェクトを作成してセットアップする。**


## Firebaseプロジェクトセットアップ

### Firebaseのプロジェクト作成
1. [Firebaseコンソール](https://console.firebase.google.com/u/0/?hl=ja) へアクセスして、`プロジェクトを追加`をクリック。<br>
2. `プロジェクト名`を任意に記入して、`続行`をクリック。<br>
3. Googleアナリティクスを`無効`にして、`プロジェクトを作成`をクリック。<br>

**フロントエンドのための設定**
1. 先ほど作成したプロジェクトのプロジェクト設定を開く。
2. `Webアプリ追加`をクリック。<br>
3. アプリ名を記入して`アプリを登録`をクリック。<br>
4. 以下のようにAPIキーなどが表示される。`apiKey`,`authDomain`,`projectId`、`storageBucket...`<br>
5. (実行済みならスキップ->) backend/のルート直下の `.env.local.example` をコピーし、 `.env` を作成。<br>
6. 上で取得した値を設定する。
   ```
   # Firebase Frontend
   VITE_FB_API_KEY="×××"
   VITE_FB_AUTH_DOMAIN="×××"
   VITE_FB_PROJECT_ID="×××"
   VITE_FB_STORAGE_BUCKET="×××"
   VITE_FB_MESSAGING_SENDER_ID="×××"
   VITE_FB_APP_ID="×××"
   ```
　
**バックエンドのための設定**
1. プロジェクトの全体概要ページの、左にあるコンソールの`設定マーク`をクリック後、「ユーザーと権限」をクリック。<br>
2. 上部の`サービスアカント`のタブをクリックし、`新しい秘密鍵を作成`をクリック。<br>
3. 保存した鍵(JSONファイル)を `backend/firebase_credentials.json` に設置。
4. .envへファイルを指定(すでに設定済みならスキップ)
    ```
   # Firebase Backend
   FIREBASE_CREDENTIALS=firebase_credentials.json
   ```

### 「FireStore」と「Authentication」の利用開始
※firebaseコンソールは頻繁に変わるので不明点などはドキュメントを参照してください。
1. Firastore
    - Firebaseのコンソールにアクセスし、firestoreプロジェクトを作成。
    - 左上部にある`FireStore`をクリック=>`データベースの作成`=>`テストモードで作成`をクリック。
    - `リージョンのロケーション`を`asia-northeast1(東京)`に設定。
2. Authentication
    - 左上部にある`Authentication`をクリック=>「始める」をクリック。

### Firebaseのデプロイ
firestoreの設定を、作成したローカルプロジェクトへ同期します。(ruleやindexなど)<br>
（具体的にはfirestore.indexes.jsonやfirestore.rulesの設定をデプロイする）
1. `.firebaserc`の設定
    - `backend/.firebaserc.example`をコピーして`.firebaserc`を作成。
         ```sh
        $ cp .firebaserc.example .firebaserc
         ```
    - `.firebaserc`に`プロジェクトID`を追記。
      - プロジェクトIDはコンソール＞設定から確認できます。
   ```
   {
     "projects": {
       "default": "プロジェクトID"
     }
   }
   ```
2. firebaseにログイン※ firebase cliを使います<br>
   ※ firebaes cliをインストールしていない場合は、ローカル環境にインストールしておく。<br>
     `例) npm install -g firebase-tools`
    - ターミナルで`firebase login`を実行。
    - ブラウザ上でgoogleアカウント認証のページが開くため、認証を行う。
3. firestore設定のデプロイ
    - ターミナルで`firebase deploy`を実行。
    - firestoreの設定がデプロイされる。
