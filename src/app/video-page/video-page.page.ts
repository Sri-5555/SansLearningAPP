import { Component, OnInit, ViewChild } from '@angular/core';
import { VideoPlayer } from '@ionic-native/video-player/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { File } from '@ionic-native/file/ngx';
import { Router } from '@angular/router';
import { VgApiService, VgMediaDirective } from '@videogular/ngx-videogular/core';
@Component({
  selector: 'app-video-page',
  templateUrl: './video-page.page.html',
  styleUrls: ['./video-page.page.scss'],
})
export class VideoPagePage implements OnInit {

  @ViewChild('media', { static: true }) media: VgMediaDirective;
  @ViewChild('vgPlayer', { static: true }) vgPlayer: any; // ElementRef of the vg-player
  startTime: number = 35; // Start the video at 30 seconds

  // @ViewChild('videoPlayer') videoPlayer: any;
  video = {
    id: '1',
    url: 'https://drive.google.com/file/d/1tchyW7XfQkQkykS3EA8DxMI4u3FvaLrA/view?usp=drive_link',
    bgURL: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
    duration: '4.49',
    title: 'Complete Comprehensive and Easy Sanskrit for Beginners',
    description: 'Learn Sanskrit from Alphabets to become a Pro',
    content: [
      {
        text: 'Right from Alphabets to Story Comprehension and Shloka Deconstruction'
      },
      {
        text: 'Nouns, Pronouns, Verbs, Tenses, Adjectives, Numbers, Time, Vibhakti (Cases) etc.'
      },
      {
        text: 'Over hundred Verbs and Nouns'
      },
      {
        text: 'Present, Past, Future and Order-Request Complete Verb Forms'
      },
      {
        text: 'Over hundred Avyayam (Indeclinables)'
      }
    ],
    files: [
      {
        name: 'Learn Sanskrit from Alphabets -1',
        format: 'PDF',
        size: '22 MB',
        url: ''
      },
      {
        name: 'Learn Sanskrit from Alphabets -2',
        format: 'PDF',
        size: '22 MB',
        url: ''
      },
      {
        name: 'Learn Sanskrit from Alphabets -3',
        format: 'PDF',
        size: '22 MB',
        url: ''
      },
      {
        name: 'Learn Sanskrit from Alphabets -4',
        format: 'PDF',
        size: '22 MB',
        url: ''
      },
      {
        name: 'Learn Sanskrit from Alphabets -5',
        format: 'PDF',
        size: '22 MB',
        url: ''
      }
    ]
  }

  viewMode = 'default';
  constructor(public videoPlayer: VideoPlayer, private nativeHTTP: HTTP, private file: File, private router: Router, private vgApi: VgApiService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.vgApi
      .getMediaById('media')
      .subscriptions.loadedMetadata.subscribe(() => {
        // Set the current time to start the video from the desired time
        this.media.currentTime = this.startTime;
      });
  }

  private downloadFileAndStore() {
    //
    const filePath = this.file.dataDirectory + 'test';
    // for iOS use this.file.documentsDirectory

    this.nativeHTTP.downloadFile('', {}, {}, filePath).then(response => {
      // prints 200
      console.log('success block...', response);
    }).catch(err => {
      // prints 403
      console.log('error block ... ', err.status);
      // prints Permission denied
      console.log('error block ... ', err.error);
    })
  }


  takeAssessment(test) {
    this.router.navigate(['dashboard/test', test.id]);
  }

  segmentChanged(ev: any) {
    console.log("ev", ev)
    this.viewMode = ev.detail.value;
  }

  playVideo(video) {
    this.videoPlayer.play(video.url).then(() => {
      console.log('video completed');
    }).catch(err => {
      console.log(err);
    });
  }
}
