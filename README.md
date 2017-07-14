# IonicFramework theme for WordPress.com

WordPress.comのREST APIを利用してSPA（Single Page Application）を構築するスターターパッケージです。
[Ionic Framework](http://ionicframework.com/docs/)を利用して構築しています。

デモは [https://ionic-wpcom.netlify.com](https://ionic-wpcom.netlify.com) をご覧ください。

## はじめ方

このパッケージではNode.jsを利用します。
未インストールの方は[こちら](https://nodejs.org/ja/download/)からインストールしてからご利用下さい。

### コマンド
Ionic Frameworkでは、開発用のコマンドと本番用のコマンドが別れています。
開発用コマンドでは、dev-serverを立ち上げます。これはCSSなどのファイルの変更を検知して自動的にビルドしたあと、
ブラウザを自動的にリロードしてくれる機能などがついております。

開発用コマンドはこちらです。本レポジトリをCloneしたフォルダ内で実行下さい。
```
$ npm run-script ionic:serve
```

本番用コマンドは、dev-serverの立ち上げがなく、またビルドに時間がかかります。しかしながら、ファイルサイズが大きく圧縮され、
また高速に動作するようになっておりますので、サーバにアップロードする時にはこちらを利用するのが一般的です。

```bash
$ npm run-script build --prod
```

### 自分のWordPressを表示する
デフォルトの設定では、パッケージ開発元の[rdlabo](https://rdlabo.jp/)のREST APIが表示されます。
これを自分が持っているWordPressに変更してみましょう。

変更はとても簡単です。
`src/wp-config.ts`を開いて、以下の部分を自分が持っているWordPressのURLに変更して下さい。

```
14  /* WordPress.comのURL、もしくはJetPack連携しているURL */
15  export const wordpressURL = 'rdlabo.jp';
```

変更・保存後に、コマンドを叩いたらあなたのWordPressのデータが表示されています。

#### WordPress.comの場合
あなたが[WordPress.com](https://wordpress.com/)を使ってブログを運営している場合は、
上記のURL欄にWordPress.comのURLを入力して下さい。

例えば、`https://ja.blog.wordpress.com`の場合は以下のように変更して下さい

```
14  /* WordPress.comのURL、もしくはJetPack連携しているURL */
15  export const wordpressURL = 'ja.blog.wordpress.com';
```

#### WordPress.org（インストール型）の場合
WordPress.orgを使っている場合は準備に5つのステップがあります。

1. WordPressにプラグイン[Jetpack by WordPress.com](https://ja.wordpress.org/plugins/jetpack/)をインストールして有効にする
2. JetpackとWordPress.comを連携します（Connect Jetpack to WordPress.com）。この作業のためにはWordPress.comのアカウントが必要になります。
3. Jetpackプラグインのダッシュボード画面のFooterにある`Debug`をクリックして下さい。右下バージョン表記の左上にあります（わかりにくいです）
4. `お使いのサイトで使用可能な Jetpack モジュールの全一覧にアクセスします。`をクリックします。
5. 上から5つ目に`JSON API`という項目があるので、有効化して下さい

以上が完了したあと、URL欄をWordPressのURL（独自ドメイン可）に変更して下さい。

### テーマを変更する

#### CSSを変更する
CSSを変更するのはとても簡単です。`src/theme`の中にSCSSファイルがあります。
`src/theme/variables.scss`はIonicデフォルトのテーマ編集用ファイルです。
[Theming your Ionic App](http://ionicframework.com/docs/theming/theming-your-app/)をご参考下さい。
`src/theme/ionic-wpcom.scss`は本テーマを構築するのに追記したSCSSです。

#### HTMLを変更する
`src/pages`がテーマ置き場となっております。
SPA（Single Page Application）でTypeScriptで書かれていますので最初はとっつきにくいかもしれませんが、大体の構成を
WordPressの公式テーマと同じフォルダ名にしておりますので、お試し下さい。


## 利用パッケージ一覧（一部）
- [Ionic Framework](http://ionicframework.com/docs/)（Angular UIフレームワーク）
- SCSS（CSSの拡張言語）
- TypeScript（JavaScriptの拡張言語）
- [ngrx/store](https://github.com/ngrx/store)

## 問い合わせ
何かありましたら、[Twitter@rdlabo](https://twitter.com/rdlabo) にお問い合わせ下さい。