// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // WordPress.comのURL、もしくはJetPack連携しているURL
  wordpressURL: 'rdlabo630094126.wordpress.com',
  excludePages: [3, 6, 23, 559],
  noImageURL: 'assets/wordpress-logo-notext-rgb.png',
  wordpressAPI: 'https://public-api.wordpress.com/rest/v1.1/sites/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
