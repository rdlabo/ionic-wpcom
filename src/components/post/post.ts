import { Component, Input } from '@angular/core';
import { InterfacePost } from '../../config/wordpress'

@Component({
  selector: 'post',
  templateUrl: 'post.html'
})
export class PostComponent {

  @Input() posts: Array<InterfacePost> = [];

  constructor() {
  }

}
