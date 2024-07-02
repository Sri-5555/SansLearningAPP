import { NavController } from '@ionic/angular';

import {
  Auth,
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  sendEmailVerification
} from '@angular/fire/auth';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ToastService } from '../services/toast.service';
import { UsersService } from '../services/user.service';
import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})

export class SignupPage{
  signupForm: FormGroup;
  constructor(public navCntrl: NavController, 
    private auth: Auth, 
    public formBuilder: FormBuilder,
    public toast: ToastService,
    private usersService: UsersService
  ) {
    this.createLoginForm();
  }

  createLoginForm() {
    this.signupForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
        ],
      ],
      gender:['',[Validators.required]],
      mobile:['',[Validators.required, mobileNumberValidator()]],
      password: ['', [Validators.required]],
      confirmPassword: ['', Validators.required],
      university: ['', Validators.required],
    }, { validators: passwordsMatchValidator() });
  }

  get email() {
    return this.signupForm.get('email');
  }

  get gender() {
    return this.signupForm.get('gender');
  }

  get mobile() {
    return this.signupForm.get('mobile');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }

  get name() {
    return this.signupForm.get('name');
  }

  get university() {
    return this.signupForm.get('university');
  }


  signup() {
    if (this.signupForm.valid) {
      console.log("signupForm",this.signupForm,this.signupForm.value);
      const { name, email, password, gender, mobile, university } = this.signupForm.value;     
      createUserWithEmailAndPassword(
        this.auth,
        email,
        password,
      ).then((res: any) => {
        console.log(res)
        this.usersService.addUser({ uid: res.user.uid, email, name, gender, mobile, university }).subscribe(res => {
          this.toast.sucessToast('User created successfully');
        });

        sendEmailVerification(res.user, email).then((res) => {
          this.toast.sucessToast("Verification mail sent to your email. Please verify");
        })
        this.toast.sucessToast('User created successfully');
        this.navCntrl.navigateForward('login');
      }).catch((err) => {
        if (err.code === AuthErrorCodes.WEAK_PASSWORD) {
          this.toast.warningToast("The password is too weak");
        } else if(err.code == 'auth/email-already-in-use') {
          this.toast.warningToast("Email already in use.");
        } else {
          this.toast.warningToast("Please enter valid name/email/password");
        }
      });
    } else {
      this.toast.warningToast("Please enter valid Name/Email/Password");
    }
  }

  gotoLogin() {
    this.navCntrl.navigateBack('login');
  }

}

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordsDontMatch: true };
    } else {
      return null;
    }
  };
}

export function mobileNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const mobileNumberRegex = /^[0-9]{10}$/;
    const isValid = mobileNumberRegex.test(control.value);
    return isValid ? null : { invalidMobileNumber: { value: control.value } };
  };
}