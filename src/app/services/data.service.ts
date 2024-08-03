import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  idToken:string = '';
  private baseUrl: string = environment.firebaseConfig.databaseURL;

  constructor(private http: HttpClient) {
    this.idToken = localStorage.getItem('idToken');
  }

  postChapterData(data: any) {
    return this.http.post(`${this.baseUrl}/chapters/.json?auth=${this.idToken}`,data);
  }

  getChapterData() {
    return this.http.get(`${this.baseUrl}/chapters/.json?auth=${this.idToken}`);
  }

  getVideoData() {
    return this.http.get(`${this.baseUrl}/videos/.json?auth=${this.idToken}`);
  }

  getDocumentData() {
    return this.http.get(`${this.baseUrl}/documents/.json?auth=${this.idToken}`);
  }

  getAssessmentsData() {
    return this.http.get(`${this.baseUrl}/assessments/.json?auth=${this.idToken}`);
  }

  getPracticeTesttData() {
    return this.http.get(`${this.baseUrl}/practicetest/.json?auth=${this.idToken}`);
  }

  getAchievementTestData() {
    return this.http.get(`${this.baseUrl}/actest/.json?auth=${this.idToken}`);
  }

}