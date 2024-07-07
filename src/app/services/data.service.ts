import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  idToken:string = '';

  constructor(private http: HttpClient) {
    this.idToken = localStorage.getItem('idToken');
  }

  postChapterData(data: any) {
    return this.http.post(`https://sanslearn-44246-default-rtdb.firebaseio.com/chapters/.json?auth=${this.idToken}`,data);
  }

  getChapterData() {
    return this.http.get(`https://sanslearn-44246-default-rtdb.firebaseio.com/chapters/.json?auth=${this.idToken}`);
  }

  getVideoData() {
    return this.http.get(`https://sanslearn-44246-default-rtdb.firebaseio.com/videos/.json?auth=${this.idToken}`);
  }

  getDocumentData() {
    return this.http.get(`https://sanslearn-44246-default-rtdb.firebaseio.com/documents/.json?auth=${this.idToken}`);
  }

  getAssessmentsData() {
    return this.http.get(`https://sanslearn-44246-default-rtdb.firebaseio.com/assessments/.json?auth=${this.idToken}`);
  }

  getPracticeTesttData() {
    return this.http.get(`https://sanslearn-44246-default-rtdb.firebaseio.com/practicetest/.json?auth=${this.idToken}`);
  }

  getAchievementTestData() {
    return this.http.get(`https://sanslearn-44246-default-rtdb.firebaseio.com/actest/.json?auth=${this.idToken}`);
  }

}