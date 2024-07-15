import { Component, OnInit } from '@angular/core';
import { ToastService } from '../services/toast.service';
import { UsersService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-help',
  templateUrl: 'admin-page.html',
  styleUrls: ['admin-page.scss'],
})

export class AdminPage implements OnInit{

  user$ = this.usersService.currentUserProfile$;
  subscriptions;
  userDetails:any;
  idToken:string = '';

  constructor(
    public toast: ToastService,
    private usersService: UsersService,
    private authService: AuthService,
   
  ) { }

  ngOnInit(): void {

  }

  ionViewWillEnter() {
    this.getidToken();
    this.getProfileDetails();
  }

  getidToken() {
    this.idToken = this.authService.getIdToken();
  }

  getProfileDetails() {
    this.subscriptions = this.usersService
      .getAllUsersDetails(this.idToken)
      .pipe(
        map((response: any) => {
          const user: any = [];
          for (const key in response) {
            if (response.hasOwnProperty(key)) {
              user.push({ ...response[key], id: key });
            }
          }
          return user;
        })
      )
      .subscribe((data) => {
        this.userDetails = data;
        console.log("userDetails", this.userDetails);
      }, err => {
        console.log(err);
      });
  }

}
