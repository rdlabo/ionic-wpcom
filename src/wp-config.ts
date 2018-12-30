/**
 * 基本設定
 *
 * このファイルで呼び出すWordPress.comのREST APIサーバを指定します。
 * 自分でサーバーホスティングしているWordPress.orgも、Jetpack by WordPress.comを
 * 利用するとWordPress.com経由にREST APIサーバを利用することができます。
 *
 * https://ja.wordpress.org/plugins/jetpack/
 *
 * なお、WordPressを非公開設定してある場合は、公開設定に変更して下さい。
 */

/* WordPress.comのURL、もしくはJetPack連携しているURL */
export const wordpressURL = 'rdlabo630094126.wordpress.com';

/* 表示しないページID */
export const excludePages = [559, 496, 2];

/**
 * その他の設定
 *
 * 多くの場合、この設定を変更する必要はありません。
 */

/* アイキャッチ画像が設定されていない記事の置き換え画像 */
export const noImageURL = 'assets/wordpress-logo-notext-rgb.png';

/* REST API Endpoint */
export const wordpressAPI = 'https://public-api.wordpress.com/rest/v1.1/sites/';
