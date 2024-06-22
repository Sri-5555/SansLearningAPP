
import { Injectable } from '@angular/core';
import { ToastController, AlertController, NavController } from '@ionic/angular';

@Injectable({ providedIn: "root" })
export class ToastService {

  constructor(
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public navCtrl: NavController
  ) {
  }

  async sucessToast(message: string) {
    try {
      this.toastCtrl
        .dismiss()
        .then(() => {})
        .catch(() => {})
        .finally(() => {});
    } catch (e) {}

    this.toastCtrl
      .create({
        message: message,
        position: "bottom",
        duration: 2000,
        cssClass: "successToast",
        buttons: [
          {
            side: "start",
            icon: "checkmark",
            text: "Success!",
            handler: () => {},
          },
        ],
      })
      .then((toast) => {
        toast.present();
      });
  }
  async warningToast(message: string) {
    try {
      this.toastCtrl
        .dismiss()
        .then(() => {})
        .catch(() => {})
        .finally(() => {});
    } catch (e) {}

    this.toastCtrl
      .create({
        message: message,
        position: "bottom",
        duration: 2000,
        cssClass: "warningToast",
        buttons: [
          {
            side: "start",
            icon: "warning",
            text: "Warning!",
            handler: () => {},
          },
        ],
      })
      .then((toast) => {
        toast.present();
      });
  }

  async presentToast(message: string) {
    // Stop multiple toasts
    try {
      this.toastCtrl
        .dismiss()
        .then(() => {})
        .catch(() => {})
        .finally(() => {});
    } catch (e) {}

    this.toastCtrl
      .create({
        message: message,

        position: "bottom",
        duration: 2000,
        cssClass: "successToast",
      })
      .then((toast) => {
        toast.present();
      });
  }
}