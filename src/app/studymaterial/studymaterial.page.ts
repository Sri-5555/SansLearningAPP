import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-studymaterial',
  templateUrl: './studymaterial.page.html',
  styleUrls: ['./studymaterial.page.scss'],
})
export class StudymaterialPage implements OnInit {
  segment = 'studymaterial';
  chapters: any = [];
  constructor(private router: Router, public dataService: DataService) { }

  ngOnInit() {
    setTimeout(() => {
      this.segment = 'studymaterial';
      this.getChaptersData();
    }, 0);
  }

  segmentChanged(event) {
    this.segment =  event.detail.value;
    this.router.navigate([`dashboard/${event.detail.value}`]);
  }

  ionViewWillEnter() {
    this.segment = 'studymaterial';
  }

  getChaptersData() {
    this.dataService
      .getChapterData()
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
        this.chapters = data;
      }, err => {
        console.log(err);
      });
  }

  redirectToChapter(chapter) {
    let data: NavigationExtras = {
      state: {
        chapterData: chapter
      }
    };
    this.router.navigate(['dashboard/chapterView'],data);
  }

}
