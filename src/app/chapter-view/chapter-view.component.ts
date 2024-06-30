import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileService } from '../services/file.service';
@Component({
  selector: 'app-chapter-view',
  templateUrl: './chapter-view.component.html',
  styleUrls: ['./chapter-view.component.scss'],
})
export class ChapterViewComponent implements OnInit {
@Input() chapterData:any;
  chapterContent:string = '';
  pdfSrc = 'https://cors-anywhere.herokuapp.com/https://sanslearning.000webhostapp.com/1.pdf';
  constructor(private route: ActivatedRoute,private fileService:FileService) { }

  fileName:any = '';
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const chapterData = history.state.chapterData;
      this.chapterContent = chapterData.content;
    });
    this.fileName = '';
    // this.getPdf();
  }

  // getPdf() {
  //   this.fileService.fetchPdf(this.pdfSrc).subscribe((res) => {
  //     console.log('res:',res);
  //   });
  // }

}
