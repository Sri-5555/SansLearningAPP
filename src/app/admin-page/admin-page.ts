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
  selectedUniversity:any = [];
  selectedGender:any = [];
  filteredUsers: any;
  selectUniversityOptions = {
    header: 'Select University'
  };
  selectGenderOptions = {
    header: 'Select Gender'
  };
  isLoading: boolean = false;

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
    this.isLoading = true;
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
        this.filteredUsers = JSON.parse(JSON.stringify(this.userDetails));
        this.isLoading = false;
      }, err => {
        console.log(err);
        this.isLoading = false;
      });
  }

  filterUsers() {
    let filteredUsers = this.userDetails;
    if (this.selectedUniversity.length > 0) {
      filteredUsers = filteredUsers.filter((user) =>
        this.selectedUniversity.includes(user.university)
      );
    }
    if (this.selectedGender.length > 0) {
      filteredUsers = filteredUsers.filter((user) =>
        this.selectedGender.includes(user.gender)
      );
    }
    this.filteredUsers = filteredUsers;
  }

  getUniqueUniversity(): any[] {
    return [...new Set(this.userDetails?.map(user => user.university)
      .filter(university => university && university.trim() !== ''))];
  }
}
