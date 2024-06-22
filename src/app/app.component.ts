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
      this.auth.onAuthStateChanged(user => {
        if (user) {
          this.router.navigate(['/dashboard']);
        }
        else {
          this.router.navigate(['/login']);
        }
      });
    });
  }
}
