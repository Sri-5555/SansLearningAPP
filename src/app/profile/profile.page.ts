import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastService } from '../services/toast.service';
import { UsersService } from '../services/user.service';
import { Router } from '@angular/router';
import { Auth, signOut } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
})
export class ProfilePage {

  user$ = this.usersService.currentUserProfile$;
  userdetails: any = [];

  showUserDetails: boolean = false;
  isFormDisabled: boolean = true;
  uid:string ='';
  idToken:string = '';

  profileForm = this.fb.group({
    name: [''],
    gender: [''],
    mobile: [''],
    email: [''],
    phone: [],
  });

  subscriptions;
  constructor(
    public toast: ToastService,
    private usersService: UsersService,
    private fb: FormBuilder,
    private router: Router,
    private auth: Auth,
    private navCtrl: NavController
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.uid = localStorage.getItem('uid');
      this.idToken = localStorage.getItem('idToken');
      this.getProfileDetails();
    }, 0);
    // this.profileForm.disable();
  }

  getProfileDetails() {
    this.profileForm.controls.name.setValue('');
    this.profileForm.controls.mobile.setValue('');
    this.profileForm.controls.email.setValue('');
    this.profileForm.controls.gender.setValue('');
    this.profileForm.controls.phone.setValue('');
    
    this.subscriptions =  this.usersService.getUserDetails(this.uid, this.idToken)
    .subscribe((user) => {
      this.userdetails = user;
      this.profileForm.patchValue({ ...this.userdetails });
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
    this.router.navigate(['/dashboard/help']);
  }

  logout() {
    signOut(this.auth).then(()=>{
      this.navCtrl.navigateRoot('login');
    })
  }
}