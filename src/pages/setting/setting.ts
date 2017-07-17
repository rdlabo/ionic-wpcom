import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { WordpressProvider } from '../../providers/wordpress/wordpress';
import { InterfaceSite } from '../../interface/wordpress';

@IonicPage()
@Component({
  selector: 'setting',
  templateUrl: 'setting.html',
})
export class Setting {

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public alertCtrl: AlertController,
      public viewCtrl: ViewController,
      public storage: Storage,
      public wp:WordpressProvider,
      public loadingCtrl: LoadingController
  ){}

  domain : string;
    enableClose : boolean = true;

  ionViewDidLoad() {
    this.storage.get('domain').then((val) => {
        if(val){
            this.domain = val;
        }else{
            this.enableClose = false;
        }
    });
  }

  setDomain() {
    const domain = this.wp.shapingDomain(this.domain);
    const loading = this.loadingCtrl.create({ content:'Access...' });
    this.wp.getSiteInfo(domain)
        .subscribe(
            (data:InterfaceSite) => {
              loading.dismiss();
              this.viewCtrl.dismiss();
              this.storage.set('domain', this.wp.shapingDomain(this.domain));
                let alert = this.alertCtrl.create({
                    title: '設定を反映します',
                    subTitle: '正常に設定されました。設定を反映するために、ブラウザを更新します。',
                    buttons: [{
                        text: '更新する',
                        handler: () => {
                            location.reload();
                        }
                    }]
                });
                alert.present();
            },
            (error) => {
              loading.dismiss();
              this.wp.errorResponse(error)
            }
        );
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
