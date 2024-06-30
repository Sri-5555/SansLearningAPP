import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

import {
  Auth,
  signInWithEmailAndPassword
} from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../services/toast.service';
import { sendEmailVerification } from 'firebase/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
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
      ],
      password: ['', [Validators.required]],
    });
  }

  get errorControl() {
    return this.loginForm.controls;
  }

  login() {
    // this.navCntrl.navigateForward('dashboard/home');
    if (this.loginForm.valid) {
      signInWithEmailAndPassword(
        this.auth,
        this.loginForm.controls.email.value,
        this.loginForm.controls.password.value
      ).then((res)=>{
        if(res.user) {
          localStorage.setItem('uid',res.user.uid);
          res.user?.getIdToken().then(idToken => {
            localStorage.setItem('idToken',idToken);
          }).catch(err => {
            console.error("Failed to get ID token:", err);
            this.toast.warningToast("Failed to get ID token");
          });
          this.toast.sucessToast("Login successfull");
          this.navCntrl.navigateForward('dashboard/studymaterial');
        } else {
          this.toast.warningToast("Please verify email.");
          sendEmailVerification(res.user,
          this.loginForm.controls.email.value).then((res)=>{
            console.log("Verification mail sent");
          }).catch(err=>{
            console.log(err);
          })
        }
      }).catch((err)=>{
        this.toast.warningToast("Failed to login. please enter valid email/password");
      }); 
    } else {
      this.toast.warningToast("Failed to login. please enter valid email/password");
    }
  }

  gotoSignup() {
    this.navCntrl.navigateForward('signup');
  }

  gotoForgotPassword() {
    this.navCntrl.navigateForward('forgotpassword');
  }
}
