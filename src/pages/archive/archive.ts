import { Component } from '@angular/core';
import { NavController,IonicPage } from 'ionic-angular';
import { PostParams } from '../../interfaces/wordpress'

@IonicPage()
@Component({
    selector: 'archive',
    templateUrl: 'archive.html'
})
export class Archive {

    search:PostParams = {
        type: 'post'
    };

    constructor(
        public navCtrl: NavController
    ) {}
}
