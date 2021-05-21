import { Injectable } from '@angular/core';
import { AlertController, LoadingController,Platform, ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})

export class UtilService {

  loader: any;
  isLoading = false;


  constructor( public alertController: AlertController,   public loadingctrl: LoadingController, public toastController: ToastController, private plt:Platform) {

  
  }


  async showSimpleAlert(msg) {
    const alert = await this.alertController.create({
      header: '',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  async showWarningAlert(msg) {
    const alert = await this.alertController.create({
      header: 'Warning',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  async showErrorAlert(msg) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }


  async errorToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      color:"danger",
      duration: 3000,
      buttons: [
        {
           text: 'X',
           role: 'cancel',
           handler: () => {
             console.log('Cancel clicked');
           }
         }
       ]
    });
    toast.present();
  }

  async showToast(msg, colors, positon) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      color: colors,
      position: positon,
      buttons: [
        {
           text: 'X',
           role: 'cancel',
           handler: () => {
             console.log('Cancel clicked');
           }
         }
       ]
    });
    toast.present();
  }


  async show(msg?) {
    this.isLoading = true;
    return await this.loadingctrl.create({
      message: msg,
      spinner: 'lines',
      
    }).then(a => {
      a.present().then(() => {
        //console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async hide() {
    this.isLoading = false;
    return await this.loadingctrl.dismiss().then(() => console.log('dismissed'));
  }

  isAndroid(){
    return this.plt.is('android');
}

  isIOS(){
    return this.plt.is('ios');
  }


} 
