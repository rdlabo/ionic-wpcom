import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { IPostParams } from '../../interfaces/wordpress';

@IonicPage()
@Component({
  selector: 'archive',
  templateUrl: 'archive.html',
})
export class Archive {
  search: IPostParams = {
    type: 'post',
  };

  constructor(public navCtrl: NavController) {}
}
