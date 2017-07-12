import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InterfacePost } from '../../interface/wordpress'

@Component({
  selector: 'post',
  templateUrl: 'post.html'
})
export class PostComponent {

  @Input() posts: Array<InterfacePost> = [];

  constructor(
      public nav:NavController
  ) {}

  viewArticle(post): void {
    this.nav.push('ArticlePage',
        { postID: post.ID ,postTitle: post.title});
  }
}
