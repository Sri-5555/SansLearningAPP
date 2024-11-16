import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  idToken:string = '';
  private baseUrl: string = environment.firebaseConfig.databaseURL;

  constructor(private http: HttpClient,
    private authService: AuthService
  ) {
  }

  postChapterData(data: any) {
    let idToken = this.authService.getIdToken() || localStorage.getItem('idToken');
    return this.http.post(`${this.baseUrl}/chapters/.json?auth=${idToken}`,data);
  }

  getChapterData() {
    let idToken = this.authService.getIdToken() || localStorage.getItem('idToken');
    return this.http.get(`${this.baseUrl}/chapters/.json?auth=${idToken}`);
  }

  getVideoData() {
    let idToken = this.authService.getIdToken() || localStorage.getItem('idToken');
    return this.http.get(`${this.baseUrl}/videos/.json?auth=${idToken}`);
  }

  getDocumentData() {
    let idToken = this.authService.getIdToken() || localStorage.getItem('idToken');
    return this.http.get(`${this.baseUrl}/documents/.json?auth=${idToken}`);
  }

  getAssessmentsData() {
    let idToken = this.authService.getIdToken() || localStorage.getItem('idToken');
    return this.http.get(`${this.baseUrl}/assessments/.json?auth=${idToken}`);
  }

  getPracticeTesttData() {
    let idToken = this.authService.getIdToken() || localStorage.getItem('idToken');
    return this.http.get(`${this.baseUrl}/practicetest/.json?auth=${idToken}`);
  }

  getAchievementTestData() {
    let idToken = this.authService.getIdToken() || localStorage.getItem('idToken');
    return this.http.get(`${this.baseUrl}/actest/.json?auth=${idToken}`);
  }

}