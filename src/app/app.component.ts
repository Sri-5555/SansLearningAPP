import { Component, ViewChild } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { VgApiService, VgMediaDirective } from '@videogular/ngx-videogular/core';
import { VgTrackSelectorComponent } from '@videogular/ngx-videogular/controls';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private router: Router,
    private auth: Auth
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.platform.backButton.subscribeWithPriority(10, () => {
        if (this.router.url === '/dashboard/studymaterial') {
          // Prevent going back to the login page
          navigator['app'].exitApp();
        } else {
          window.history.back();
        }
      });


      this.auth.onAuthStateChanged(user => {
        console.log("user",user);
        if (user) {
          this.router.navigate(['/dashboard/studymaterial']);
        }
        else {
          this.router.navigate(['/login']);
        }
      });
    });
  }
}
