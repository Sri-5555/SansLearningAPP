import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileService } from '../services/file.service';
@Component({
  selector: 'app-chapter-view',
  templateUrl: './chapter-view.component.html',
  styleUrls: ['./chapter-view.component.scss'],
})
export class ChapterViewComponent implements OnInit {
  chapterData:any;
  chapterContent:string = '';
  chapterUrl:string='';
  constructor(private route: ActivatedRoute,private fileService:FileService) { }

  fileName:any = '';
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.chapterData = history.state.chapterData;
      this.chapterContent = this.chapterData.content;
      this.chapterUrl = `../../assets/studyMaterials/${this.chapterData.url}`;
    });
    this.fileName = '';
    // this.getPdf();
  }

  // getPdf() {
  //   this.fileService.fetchPdf(this.pdfSrc).subscribe((res) => {
  //     console.log('res:',res);
  //   });
  // }

  ionViewWillEnter() {
    this.route.paramMap.subscribe(params => {
      this.chapterData = history.state.chapterData;
      this.chapterContent = this.chapterData.content;
      this.chapterUrl = `../../assets/studyMaterials/${this.chapterData.url}`;
      console.log(this.chapterUrl);
    });
    this.fileName = '';
  }

}
