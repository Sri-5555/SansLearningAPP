import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-testlist',
  templateUrl: './testlist.page.html',
  styleUrls: ['./testlist.page.scss'],
})
export class TestlistPage implements OnInit {
  segment = 'testList';
  assessments: any = [];

  constructor(private router: Router,
    public dataService: DataService,
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.segment = 'testList';
      this.getAssessmentsData();
    }, 0);
  }

  segmentChanged(event) {
    this.segment =  event.detail.value;
    this.router.navigate([`dashboard/${event.detail.value}`]);
  }

  ionViewWillEnter() {
    this.segment = 'testList';
  }

  getAssessmentsData() {
    this.dataService
      .getAssessmentsData()
      .pipe(
        map((response: any) => {
          const chapters = [];
          for (const key in response) {
            if (response.hasOwnProperty(key)) {
              chapters.push({ ...response[key], id: key });
            }
          }
          return chapters;
        })
      )
      .subscribe((data) => {
        this.assessments = data;
      }, err => {
        console.log(err);
      });
  }

  takeAssessment(test) {
    let data: NavigationExtras = {
      state: {
        testData: test
      }
    };
    this.router.navigate(['dashboard/test'],data);
  }
}
