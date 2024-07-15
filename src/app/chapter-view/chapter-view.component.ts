import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-chapter-view',
  templateUrl: './chapter-view.component.html',
  styleUrls: ['./chapter-view.component.scss'],
})
export class ChapterViewComponent implements OnInit {
  chapterData: any;
  chapterContent: string = '';
  chapterUrl: string = '';
  constructor(private route: ActivatedRoute, private router: Router) { }

  fileName: any = '';
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.chapterData = history.state.chapterData;
      this.chapterContent = this.chapterData.content;
      this.chapterUrl = this.chapterData.url;
    });
    this.fileName = '';
  }

  ionViewWillEnter() {
    this.route.paramMap.subscribe(params => {
      this.chapterData = history.state.chapterData;
      this.chapterContent = this.chapterData.content;
      this.chapterUrl = this.chapterData.url;
    });
    this.fileName = '';
  }

  goBack() {
    this.router.navigate(['/dashboard/studymaterial']);
  }
}
