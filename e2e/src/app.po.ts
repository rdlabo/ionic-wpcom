import { browser, by, element } from 'protractor';

export class AppPage {
  public navigateTo() {
    return browser.get('/');
  }

  public getParagraphText() {
    return element(by.deepCss('app-root ion-content')).getText();
  }
}
