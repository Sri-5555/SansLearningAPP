import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ToastService } from '../services/toast.service';
import { UsersService } from '../services/user.service';
import { Router } from '@angular/router';
import { Auth, signOut, updatePassword } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
})
export class ProfilePage {

  user$ = this.usersService.currentUserProfile$;
  userdetails: any = [];

  showUserDetails: boolean = false;
  showPasswordSection: boolean = false;
  isFormDisabled: boolean = true;
  uid:string ='';
  idToken:string = '';
  isLoading = false;
  toggleCpassword = false;
  toggleNewPassword = false;

  profileForm = this.fb.group({
    name: ['',[Validators.required]],
    gender:['',[Validators.required]],
    mobile:['',[Validators.required, mobileNumberValidator()]],
    email: ['',[Validators.required,Validators.email]],
    university: ['',[Validators.required]],
    category: ['',[Validators.required]],
  });

  passwordForm: FormGroup;

  subscriptions;
  constructor(
    public toast: ToastService,
    private usersService: UsersService,
    private fb: FormBuilder,
    private router: Router,
    private auth: Auth,
    private navCtrl: NavController,
    private alertController: AlertController
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.uid = localStorage.getItem('uid');
      this.idToken = localStorage.getItem('idToken');
      this.getProfileDetails();
    }, 0);
    // this.profileForm.disable();

    this.passwordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      cPassword: ['', [Validators.required, Validators.minLength(6)]]
    },{ validators: passwordsMatchValidator() });
  }

  getProfileDetails() {
    this.isLoading = true;
    this.profileForm.controls.name.setValue('');
    this.profileForm.controls.mobile.setValue('');
    this.profileForm.controls.email.setValue('');
    this.profileForm.controls.gender.setValue('');
    this.profileForm.controls.university.setValue('');
    this.profileForm.controls.category.setValue('');
    
    this.subscriptions =  this.usersService.getUserDetails(this.uid, this.idToken)
    .subscribe((user) => {
      this.userdetails = user;
      this.profileForm.patchValue({ ...this.userdetails });
      this.isLoading = false;
    },err=>{
        console.log(err);
    });
  }

  saveProfile() {
    const {...data } = this.profileForm.value;
    console.log("save profile", this.profileForm.value);
    this.usersService
      .updateUserDetails(this.uid, this.idToken,data)
      .subscribe(res => {
        this.showUserDetails = false;
        this.toast.sucessToast('Profile updated successfully');
      }, err => {
        this.toast.sucessToast('Profile update failed');
      });
  }

  ShowDetails() {
    this.showUserDetails = !this.showUserDetails;
  }

  ngOnDestroy() {
    this.subscriptions?.unsubscribe()
  }

  navigateToAboutPage() {
    this.router.navigate(['/dashboard/about']);
  }

  logout() {
    signOut(this.auth).then(()=>{
      this.navCtrl.navigateRoot('login');
    })
  }

  changePassword() {
    if (this.passwordForm.valid) {
      const { newPassword, cPassword } = this.passwordForm.value;
      if (newPassword === cPassword) {
        try {
          const user = this.auth.currentUser;
          if (user) {
            updatePassword(user, newPassword).then(data=> {
              this.toast.sucessToast('Password changed successfully');
              this.navCtrl.navigateForward('login');
            })
            .catch(err => {
              console.log(` failed ${err}`);
              this.toast.warningToast(err.error.message);
            });
          } else {
            this.toast.warningToast('No user is currently signed in');
          }
        } catch (error: any) {
          if (error.code === 'auth/requires-recent-login') {
            this.toast.warningToast('Please log in again to change your password');
          } else {
            this.toast.warningToast(`Error: ${error.message}`);
          }
        }
      } else {
        this.toast.warningToast('Passwords do not match');
      }
    } else {
      this.toast.warningToast('Please enter valid password');
    }
  }
  
  NavigateToAdminPage() {
    this.router.navigate(['dashboard/adminpage']);
  }

  get newPassword() {
    return this.passwordForm.get('newPassword');
  }

  get CPassword() {
    return this.passwordForm.get('cPassword');
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
            console.log('Logout cancelled');
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