import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { WordpressProvider } from '@/providers/wordpress/wordpress';
import { IPostParams } from '@/interfaces/wordpress';

@IonicPage({
  segment: 'author/:key',
})
@Component({
  selector: 'author',
  templateUrl: 'author.html',
  providers: [WordpressProvider],
})
export class Author {
  type: string = '執筆者';
  title: string;
  search: IPostParams = {
    type: 'wait',
    authorID: this.navParams.get('key'),
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public wp: WordpressProvider) {}

  ionViewDidLoad() {
    this.title = this.navParams.get('title');

    const f = () =>
      new Promise(resolve => {
        resolve(this.navParams.get('key'));
      });
    f().then((ID: number) => {
      // use not require auth resource.
      this.wp.getPostList(0, { authorID: ID }).subscribe(data => {
        this.title = data[0].author.name;
      });

      this.search = {
        type: 'post',
        authorID: this.navParams.get('key'),
      };
    });
  }
}
