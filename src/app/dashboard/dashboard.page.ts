import { Component } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss'],
})
export class DashboardPage {
  

  constructor(private auth: Auth, private navCtrl: NavController) {
  }

  logout() {
    signOut(this.auth).then(()=>{
      this.navCtrl.navigateRoot('login');
    })
  }
  
  home() {
    this.navCtrl.navigateRoot('dashboard/studymaterial');
  }
}
