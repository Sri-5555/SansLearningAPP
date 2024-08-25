import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { UsersService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-testlist',
  templateUrl: './testlist.page.html',
  styleUrls: ['./testlist.page.scss'],
})
export class TestlistPage implements OnInit {
  segment:any;
  assessments: any;
  assessmentsTypes: any = [
    { category: 'practice', marks: 100, name: 'Practice Test', questions: [] },
    { category: 'achievement', marks: 50, name: 'Achievement Test', questions: [], time: '1 hr' }
  ];
  subscriptions;
  userdetails: any = [];
  uid:string ='';
  idToken:string = '';
  disableTest = false;
  acheievementTestEnable:boolean = false;

  constructor(private router: Router,
    public dataService: DataService,
    private usersService: UsersService,
    private authService:AuthService
  ) { }

  ngOnInit() {
    this.segment = this.router.url.split('/').pop();
    this.assessments = this.segment == "PracticeTest" ? this.assessmentsTypes[0] : this.assessmentsTypes[1];
    this.uid = this.authService.getUserId()
    this.idToken = this.authService.getIdToken();
  }

  segmentChanged(event) {
    this.segment =  event.detail.value;
    this.router.navigate([`dashboard/${event.detail.value}`]);
  }

  ionViewWillEnter() {
    this.segment = this.router.url.split('/').pop();
    this.assessments = this.segment == "PracticeTest" ? [this.assessmentsTypes[0]] : [this.assessmentsTypes[1]];
    if (this.segment != 'PracticeTest') {
      this.getAchievementTestStatus();
      this.getProfileDetails();
    }
  }

  takeAssessment(test,from?) {
    let finalData;
    if(from == 'result') {
        let data: NavigationExtras = {
        state: {
          testData: test,
          testResult:this.userdetails?.achievementTestResult?.results
        }
      };
      finalData = data;
    } else {
      let data: NavigationExtras = {
        state: {
          testData: test,
        }
      };
      finalData = data;
    }
    this.router.navigate(['dashboard/test'],finalData);
  }

  getProfileDetails() {
    this.subscriptions = this.usersService.getUserDetails(this.uid, this.idToken)
      .subscribe((user) => {
        this.userdetails = user;
        if (this.userdetails?.achievementTestResult) {
          this.disableTest = true;
        }
      }, err => {
        console.log(err);
      });
  }

  getAchievementTestStatus() {
    this.subscriptions = this.usersService.getAchievementTestStatus(this.idToken)
      .subscribe((data) => {
        const status:any = data;
        if(status) {
          this.acheievementTestEnable = status?.status;
        }
      }, err => {
        console.log(err);
      });
  }
}
