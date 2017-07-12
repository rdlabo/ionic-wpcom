import { Component } from '@angular/core';
import { NavController,IonicPage } from 'ionic-angular';
import { InterfacePostParams } from '../../interface/wordpress'

@IonicPage()
@Component({
    selector: 'archive',
    templateUrl: 'archive.html'
})
export class Archive {

    search:InterfacePostParams = {
        type: 'post'
    };

    constructor(
        public navCtrl: NavController
    ) {}
}
