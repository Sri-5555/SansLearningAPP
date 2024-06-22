import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastService } from '../services/toast.service';
import { UsersService } from '../services/user.service';

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
    dob: [''],
    gender: [''],
    mobile: [''],
    email: [''],
    phone: [],
    address: ['']
  });

  subscriptions;
  constructor(
    public toast: ToastService,
    private usersService: UsersService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    console.log("profile component");
    this.uid = localStorage.getItem('uid');
    this.idToken = localStorage.getItem('idToken');
    this.getProfileDetails();
    // this.profileForm.disable();
  }

  getProfileDetails() {
    this.profileForm.controls.name.setValue('');
    this.profileForm.controls.mobile.setValue('');
    this.profileForm.controls.email.setValue('');
    this.profileForm.controls.gender.setValue('');
    this.profileForm.controls.phone.setValue('');
    this.profileForm.controls.address.setValue('');
    this.profileForm.controls.dob.setValue(new Date().toISOString());
    
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
}

