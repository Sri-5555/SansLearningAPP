import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-testlist',
  templateUrl: './testlist.page.html',
  styleUrls: ['./testlist.page.scss'],
})
export class TestlistPage implements OnInit {
  segment = 'testList';
  assessments: any = [
    { category: 'practice', marks: 50, name: 'Practice Test', questions: [] },
    { category: 'achievement', marks: 50, name: 'Achievement Test', questions: [], time: '1 hr' }
  ];

  constructor(private router: Router,
    public dataService: DataService,
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.segment = 'testList';
    }, 0);
  }

  segmentChanged(event) {
    this.segment =  event.detail.value;
    this.router.navigate([`dashboard/${event.detail.value}`]);
  }

  ionViewWillEnter() {
    this.segment = 'testList';
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
