import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InterfacePost } from '../../interface/wordpress'

@Component({
  selector: 'posts',
  templateUrl: 'posts.html'
})
export class PostsComponent {

  @Input() posts: Array<InterfacePost> = [];

  constructor(
      public nav:NavController
  ) {}

  viewArticle(post): void {
    this.nav.push('Single',
        { postID: post.ID ,title: post.title});
  }
}
