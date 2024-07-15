import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-document',
  templateUrl: './document.page.html',
  styleUrls: ['./document.page.scss'],
})
export class DocumentPage implements OnInit {
  segment = 'document';
  documents: any = [];

  constructor(private router: Router, public dataService: DataService) { }

  ngOnInit() {
    setTimeout(() => {
      this.segment = 'document';
      this.getDocumentData();
    }, 0);
  }

  ionViewWillEnter() {
    this.segment = 'document';
  }

  segmentChanged(event) {
    this.segment =  event.detail.value;
    this.router.navigate([`dashboard/${event.detail.value}`]);
  }

  getDocumentData() {
    this.dataService
      .getDocumentData()
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
        this.documents = data;
      }, err => {
        console.log(err);
      });
  }

  downloadDocument(url) {
    window.open(url, "_blank");
  }

}
