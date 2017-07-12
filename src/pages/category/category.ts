import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { WordpressProvider } from '../../providers/wordpress/wordpress';
import { InterfacePost } from '../../interface/wordpress'

@IonicPage({
    segment: 'category/:slug',
})
@Component({
  selector: 'category',
  templateUrl: 'category.html',
  providers:[ WordpressProvider ]
})
export class Category {

    title:string;
  page:number = 1;
  posts: Array<InterfacePost> = [];

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public wp: WordpressProvider
  ) {}

  ionViewDidLoad(){
    this.getPostList();

      if(this.navParams.get('title')){
          this.title = this.navParams.get('title');
      }else{
          const f = () => new Promise(
              (resolve)=>{
                  resolve(this.navParams.get('slug'));
              }
          );
          f().then(
              (slug:string) => {
                  this.wp.getCategory(slug)
                      .subscribe(
                          data => this.title = data.name
                      );
              }
          );
      }
  }

  doInfinite(infiniteScroll) {
    this.getPostList().then(
        data => {
          infiniteScroll.complete();
        },
        error => {
          infiniteScroll.enable(false);
        }
    );
  }

  private getPostList() {
    return new Promise ((resolve, reject) => {
      this.wp.getPostList(this.page, 'post', this.navParams.get('slug'))
          .subscribe(
              data => {
                this.page++;
                this.posts = this.posts.concat(data);
                resolve(data)
              },
              error => {
                reject(error);
              }
          );
    });
  }
}
