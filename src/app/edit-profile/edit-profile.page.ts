import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UsersService } from '../services/user.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  profileForm = this.fb.group({
    uid: [''],
    firstName: [''],
    lastName: [''],
    email: [''],
    phone: [],
    gender: [''],
    address: [''],
    dob: [''],
  });
  subscriptions;

  constructor(private fb: FormBuilder,
    public toast: ToastService,
    private usersService: UsersService,) { }

  ngOnInit() {
    this.getProfileDetails();
  }

  getProfileDetails() {
    this.profileForm.controls.firstName.setValue('Sri' || '');
    this.profileForm.controls.lastName.setValue('Krish' || '');
    this.profileForm.controls.email.setValue('psrikrishnan@75f.io' || '');
    this.profileForm.controls.gender.setValue('Male' || '');
    this.profileForm.controls.phone.setValue(989898989803 || '');
    this.profileForm.controls.address.setValue('India' || '');
    this.profileForm.controls.dob.setValue('2022-04-21T00:00:00' || '');


    // this.subscriptions =  this.usersService.currentUserProfile$
    // .subscribe((user) => {
    //   this.profileForm.patchValue({ ...user });
    // },err=>{
    //   console.log(err);
    // });
  }

  // saveProfile() {
  //   const { uid, ...data } = this.profileForm.value;

  //   if (!uid) {
  //     return;
  //   }

  //   this.usersService
  //     .updateUser({ uid, ...data })
  //     .subscribe(res => {
  //       this.toast.sucessToast('Profile updated successfully');
  //     }, err => {
  //       this.toast.sucessToast('Profile update failed');
  //     });
  // }

  ngOnDestroy() {
    this.subscriptions?.unsubscribe()
  }

}
