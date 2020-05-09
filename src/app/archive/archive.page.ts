import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IPostParams } from '../../interfaces/wordpress';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.page.html',
  styleUrls: ['./archive.page.scss'],
})
export class ArchivePage implements OnInit {
  search: IPostParams = {
    type: 'post',
  };
  constructor(
    public navCtrl: NavController,
  ) { }

  ngOnInit() {
  }

}
