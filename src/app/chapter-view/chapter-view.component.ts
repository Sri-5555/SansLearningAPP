import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chapter-view',
  templateUrl: './chapter-view.component.html',
  styleUrls: ['./chapter-view.component.scss'],
})
export class ChapterViewComponent implements OnInit {

  chapterContent:string = '';
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const chapterData = history.state.chapterData;
      this.chapterContent = chapterData.content;
    });
  }

}
