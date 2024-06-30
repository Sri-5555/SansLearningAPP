import { Component, OnInit } from '@angular/core';
import { VideoPlayer } from '@ionic-native/video-player/ngx';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { UploadmodalComponent } from '../uploadmodal/uploadmodal.component';
import { DataService } from '../services/data.service';
import { map } from 'rxjs/operators';
import { HTTP } from '@ionic-native/http/ngx';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  segment = 'chapter';
  videos:any = [];
  chapters:any = [];
  documents:any = [];
  assessments:any = [];
  
  constructor(public videoPlayer: VideoPlayer,
    private router: Router,
    private modalController: ModalController,
    public dataService: DataService,
    private http: HTTP) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.getChaptersData();
      this.getVideosData();
      this.getAssessmentsData();
      this.getDocumentData();
    }, 1000);
  }

  playVideo(video) {
    this.videoPlayer.play(video.url).then(() => {
      console.log('video completed');
    }).catch(err => {
      console.log(err);
    });
  }

  downloadDocument(url){
    console.log('url:' ,url);
    window.open(url, "_blank");
  }

  openVideoPage(id) {
    this.router.navigate(['dashboard/video-page', id]);
  }

  segmentChanged(event) {
    this.segment = event.detail.value;
  }

  takeAssessment(test) {
    let data: NavigationExtras = {
      state: {
        testData: test
      }
    };
    this.router.navigate(['dashboard/test'],data);
  }

  redirectToChapter(chapter) {
    let data: NavigationExtras = {
      state: {
        chapterData: chapter
      }
    };
    this.router.navigate(['dashboard/chapterView'],data);
  }

  async uploadSegmentData() {
    const modal = await this.modalController.create({
      component: UploadmodalComponent,
      cssClass: 'upload-modal',
      componentProps: {
        data: {
          'segment': this.segment
        }
      }
    });
    return await modal.present();
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

  getVideosData() {
    this.dataService
      .getVideoData()
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
        this.videos = data;
      }, err => {
        console.log(err);
      });
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
}
