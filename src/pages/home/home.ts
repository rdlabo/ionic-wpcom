import { Component } from '@angular/core';
import { NavController,IonicPage } from 'ionic-angular';
import { WordpressProvider } from '../../providers/wordpress/wordpress';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[ WordpressProvider ]
})
export class HomePage {

  posts: Array<{
    ID : number,
    title   : string,
    excerpt : string,
    content : string,
    date    : string,
    author : {
      name: string
    },
    post_thumbnail : {
      URL : string
    }
  }> = [];

  constructor(
      public navCtrl: NavController,
      public wp: WordpressProvider
  ) {}

  ionViewDidLoad(){
    this.wp.getPostList()
        .subscribe(
            data => {
              console.log(data);
              this.posts = data
            }
        );
  }
}
