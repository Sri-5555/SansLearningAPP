import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

import {
  Auth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword
} from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-forgot',
  templateUrl: 'forgotpassword.page.html',
  styleUrls: ['forgotpassword.page.scss'],
})
export class ForgotPasswordPage {
  loginForm: FormGroup;

  constructor(public navCntrl: NavController, private auth: Auth, public formBuilder: FormBuilder,
    public toast: ToastService) {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
        ],
      ]
    });
  }

  get errorControl() {
    return this.loginForm.controls;
  }

  recover() {
    if (this.loginForm.valid) {
      sendPasswordResetEmail(this.auth,this.loginForm.controls.email.value)
      .then(data => {
        console.log(data);
        this.toast.sucessToast('Password reset email sent'); // this is toastController
        this.navCntrl.navigateBack('login');
      })
      .catch(err => {
        console.log(` failed ${err}`);
        this.toast.warningToast('Failed to send reset email'); // this is toastController
      });
    } else {
      this.toast.warningToast("please enter valid email");
    }
  }

  gotoLogin() {
    this.navCntrl.navigateBack('login');
  }
}
