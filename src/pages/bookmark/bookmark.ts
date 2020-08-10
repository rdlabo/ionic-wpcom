import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'bookmark',
  templateUrl: 'bookmark.html',
})
export class Bookmark {
  constructor(public navCtrl: NavController) {}
}
