import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanDeactivate } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TestPage } from '../test/test.page';

@Injectable({
  providedIn: 'root'
})

export class TestGuard implements CanDeactivate<TestPage> {
  constructor(private alertController: AlertController) {}
  canDeactivate(component: TestPage): Observable<boolean> | Promise<boolean> | boolean {
    if (component && !component.testSubmitted) {
      return this.presentAlert();
    }
    return true;
  }


  private async presentAlert(): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
      const alert = await this.alertController.create({
        header: 'Test not completed',
        message: 'You have not submitted the test, Please complete the test !',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              resolve(false);
            }
          }
        ]
      });
      await alert.present();
    });
  }
}