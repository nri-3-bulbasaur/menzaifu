# MenZaifu

「動いた分だけ食べる」習慣を身に着けるためのスマートフォン向け Web アプリケーションです。  
スマートフォンからアクティビティ情報を取得し（あるいはユーザが手動入力し）、アクティビティの強度に応じて付与される Zaifu ポイント内で利用可能な飲食物情報を示す機能を有します。  
詳細は Wiki やプレゼンテーション資料をご参照ください。

# 環境構築手順

## 1. [PC] ネットワーク環境の確認

以下の各サービスに対するネットワーク疎通性を確認します。

- GitHub
- Amazon Web Service (AWS)
- Google Cloud Platform (GCP)

## 2. [AWS] IAM の設定

AWS の IAM にて、開発者ごとのアカウントを準備します。

1. root ユーザでログインし、https://us-east-1.console.aws.amazon.com/iam/home#/users$new?step=details にアクセスします。
2. 下記要領でフォームを入力し、「次のステップ」を押下します。<br />![IAM-1](/img/1-1.png)
3. アクセス権限を以下の通りに付与し、「次のステップ」を押下します。<br />![IAM-2](/img/1-2.png)
4. タグの設定フォームが表示されますが、何も入力せずに「次のステップ」を押下します。
5. これまでの入力内容の確認画面が表示されるため、誤りが無いことを確認し「ユーザの作成」ボタンを押下します。
6. csv でクレデンシャル情報をダウンロードし、開発者に連携します。**画面遷移してしまうと、シークレットアクセスキー、パスワードは再表示できなくなります（再設定が必要になります）** ので、失念しないようにご注意ください。<br />![IAM-3](/img/1-3.png)

## 3. [PC] 必要なツールのインストール

お使いの PC に、以下のツールをインストールします。

- Git クライアントの最新版
- VSCode
- SSH クライアントの最新版
- Node.js v18.12.1 （2022/11/24 時点での LTS の最新版）
  - npm も合わせてインストールされていることも合わせて確認が必要です

Node.js / npm のバージョンは、インストール後の Shell にて、下記コマンドを入力することで確認可能です。  
エラーが返ってきた場合は、Node.js / npm のパスが通っていることを確認してください。

```
$ node -v
$ npm -v
```

nodenv を使用している人は .node-version ファイルが定義されているので、自動的にバージョンが合うはずです。

## 4. [任意 / GitHub] SSH 設定

もし Git の通信を SSH 経由で行う場合には、クライアントにて SSH キーペアを生成し、GitHub に設定する必要があります。  
以下のドキュメントを参考に、設定を進めてください。  
https://docs.github.com/ja/authentication/connecting-to-github-with-ssh

## 5. [PC] AWS CLI のインストール

**管理者権限**で、 npm パッケージの `@aws-amplify/cli` をインストールします。

```
$ sudo npm install -g @aws-amplify/cli
```

## 6. [PC] 本 Project の Clone ～ 起動設定

1. 作業ディレクトリに移動し、本リポジトリを Clone します。SSH 設定済の場合は、下記コマンドとなります。<br />その後に、development ブランチを checkout します。

```
$ git clone git@github.com:nri-3-bulbasaur/menzaifu.git
$ cd menzaifu
$ git checkout development
```

2. Amplify CLI の設定を行います。**Windows の場合、VSCode のターミナルで下記コマンドを実行するとエラーとなる可能性があるため、PowerShell を別途起動したうえで実施します。**

```
$ amplify configure
```

上記コマンドを実行すると、プロンプトでプロファイル設定を求められるため、以下に従って入力します。  
途中でブラウザが起動しますが、無視します。

| 設定項目        | 設定                                   |
| --------------- | -------------------------------------- |
| Region          | ap-northeast-1                         |
| user name       | （2-6 項の情報を参照）                 |
| accessKeyId     | （2-6 項の情報を参照）                 |
| secretAccessKey | （2-6 項の情報を参照）                 |
| Profile Name    | 各自で分かりやすい名前を付けてください |

3. Amplify CLI の情報を AWS から取得します。

```
$ amplify pull
```

| 設定項目                                         | 設定                                   |
| ------------------------------------------------ | -------------------------------------- |
| Select the authentication method you want to use | AWS profile                            |
| Please choose the profile you want to use        | （前項で入力した Profile Name を選択） |
| Which app are you working on?                    | d4mynp1yvqb1q                          |
| Pick a backend environment                       | staging                                |
| Choose your default editor:                      | Visual Studio Code                     |
| Choose the type of app that you're building      | javascript                             |
| What javascript framework are you using          | react                                  |
| Do you plan on modifying this backend? (Y/n)     | Y                                      |
| 他                                               | （無入力で Enter ボタン押下）          |

4. npm パッケージをインストールします。

```
$ npm install
```

5. 実行したい操作に合わせて、npm コマンドを実行します。

| コマンド              | 概要                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `$ npm run start`     | クライアント上に Web サーバが起動し、MenZaifu が起動します。                                                                                                                                                                                                                                                                                                                                                                                                           |
| `$ npm run start-pwa` | クライアント上に Web サーバが起動し、MenZaifu が起動します。本ページは、PWA としてブラウザ・スマホ等にインストール可能です。以下、注意事項です。<br /><br /><ul><li>過去に PWA をインストール済の場合は、一度アンインストールしたうえで再インストールしないと、最新のコードが反映されません。<li>**本コマンドは、[Pull Request #70](https://github.com/nri-3-bulbasaur/menzaifu/pull/70) の内容を development ブランチに merge した後で無ければ利用できません。**</ul> |
