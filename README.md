[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

[日本語のREADME.mdはこちら](https://github.com/rdlabo/ionic-wpcom/blob/master/README.ja.md)

# Ionic-WP.com

This is starter package builds SPA using WordPress.com's REST API.
I build it using [Ionic Framework](http://ionicframework.com/docs/).

Please visit [https://demo.ionic-wp.com](https://demo.ionic-wp.com) for the demo. 
In addition, the introduction site of this repository is [here](http://ionic-wp.com/) (This is Japanese web site).

## Getting Started

This package uses Node.js. If you do not install it please use it from [here](https://nodejs.org/ja/download/).

### Command
In Ionic Framework, development commands and production commands are separate. 

For the development command, start dev-server. 
This is equipped with function that automatically reloads the browser after detecting the change of the file such as CSS and automatically building it.

The command for development is here. Please execute in this folder which clone this repository.

```
$ npm run-script ionic:serve
```

For the production command, there is no launch of dev-server and it takes time to build. 
However, since the file size is greatly compressed and it is designed to operate at high speed,
it is common to use this when uploading to the server.

```
$ npm run-script build --prod
```

### Show your WordPress
By default, the package developer [rdlabo](https://rdlabo.jp/)'s REST API is displayed. 
Let's change this to WordPress you have.

The change is very easy. 
Open `src/environments/environments.dev.ts`,`src/environments/environments.prod.ts` and change the following part to the URL of WordPress you have.

```
9   // WordPress.comのURL、もしくはJetPack連携しているURL
10  wordpressURL: 'rdlabo630094126.wordpress.com',
```

After change/save, hitting a command will display your WordPress data.

#### For WordPress.com
If you run a blog using [WordPress.com](https://wordpress.com/), 
please enter the URL of WordPress.com in the above URL field.

For example, at https://en.blog.wordpress.com, please change it as follows

```
9   // WordPress.comのURL、もしくはJetPack連携しているURL
10  wordpressURL: 'rdlabo630094126.wordpress.com',
```

#### For WordPress.org (installation type)
If you are using WordPress.org there are 5 steps to prepare.

1. Install and enable the plugin [Jetpack by WordPress.com](https://ja.wordpress.org/plugins/jetpack/) in WordPress
2. Jetpack and WordPress.com will work together (Connect Jetpack to WordPress.com). For this work you will need an account at WordPress.com.
3. Click `Debug` in the Footer of the Jetpack plugin's dashboard screen. It is in the upper left corner of the lower right version notation (it is hard to understand)
4. Go to the full list of available Jetpack modules on your site.
5. Since there is an item called `JSON API` the fifth from the top, please enable it

After completing the above, change the URL field to WordPress URL (unique domain available).

### Change theme

#### Change CSS
Changing CSS is very easy. There is an SCSS file in `src/theme`.
`src/theme/variables.scss` is the Ionic default theme editing file.
Please refer to [Theming your Ionic App](http://ionicframework.com/docs/theming/theming-your-app/).
`src/theme/ionic-wpcom.scss` is the SCSS added to build this theme.

#### Change HTML
`src/components` and `src/pages` is the theme storage place.
Since it is written in TypeScript with SPA (Single Page Application), 
it may be hard to get stuck at the beginning. 
But I will make the approximate composition the same folder name as WordPress official theme, so please try it.

## Usage package list (partial)
- [Ionic Framework](http://ionicframework.com/docs/)
- SCSS
- TypeScript
- [ngrx/store](https://github.com/ngrx/store)

## Easy hosting
With [Netlify](https://app.netlify.com)  you can easily host it. 
I am hosting the demo now, but please use it because I write the setting.

| Item | input content |
|:-----------|:------------|
| Repository | https://github.com/rdlabo/ionic-wpcom |
| Branch | master |
| Build command | npm run-script build --prod |
| Publish directory | www |

## Contact
[Twitter@rdlabo](https://twitter.com/rdlabo) 
