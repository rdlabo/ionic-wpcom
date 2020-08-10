import { Component, OnInit } from '@angular/core';
import { NavController, NavParams} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import { IPostParams } from '../../interfaces/wordpress';
import { WordpressProvider } from '../../providers/wordpress/wordpress';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  public type = 'カテゴリ';
  public title: string;
  public catSlug:string;
  public search: IPostParams = {
    type: 'wait',
    categorySlug: this.catSlug,
  };

  constructor(
    public navCtrl: NavController,
    public route:ActivatedRoute,
    //public navParams: NavParams,
    public wp: WordpressProvider,
  ) {}

  public ngOnInit() {}
  public ionViewWillEnter() {
    console.log('カテゴリの読み込み',);
    this.catSlug = this.route.snapshot.params.categorySlug;
    this.title = this.catSlug;
    const f = () =>
      new Promise((resolve) => {
        resolve(encodeURI(this.catSlug));
      });
    f().then((slug: string) => {
      this.wp.getCategory(slug).subscribe((data) => (this.title = data.name));
      this.search = {
        type: 'post',
        categorySlug: slug,
      };
    });
  }
}
