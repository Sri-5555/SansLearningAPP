import { Component } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss'],
})
export class DashboardPage {
  

  constructor(private auth: Auth, private navCtrl: NavController, private alertController: AlertController) {
  }

  logout() {
    signOut(this.auth).then(()=>{
      this.navCtrl.navigateRoot('login');
    })
  }
  
  home() {
    this.navCtrl.navigateRoot('dashboard/studymaterial');
  }

  async logoutConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirm Logout',
      message: 'Are you sure you want to log out?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          },
        },
        {
          text: 'Logout',
          handler: () => {
            this.logout();
          },
        },
      ],
    });

    await alert.present();
  }
}
