import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FileService {
  private corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';
  private pdfUrl = 'https://github.com/Sri-5555/jbSCFNZBh8grATaLtcYQ5GJ7V9XDuxHmPyKMnW4Rsfk3qzdpEU/blob/53a0d2ef2a98feb36c2a1edef1894bb119cfb738/Chapter%20-1%20(%E0%A4%AE%E0%A4%A8%E0%A5%8B%E0%A4%B5%E0%A4%BF%E0%A4%9C%E0%A5%8D%E0%A4%9E%E0%A4%BE%E0%A4%A8%E0%A4%B8%E0%A5%8D%E0%A4%AF%20%E0%A4%AA%E0%A4%B0%E0%A4%BF%E0%A4%9A%E0%A4%AF%E0%A4%83).pdf';
  private fullUrl = this.corsProxyUrl + this.pdfUrl;

  constructor(private http: HttpClient) {}

  fetchPdf(fileUrl): Observable<Blob> {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      // Add any other headers here
    });
    return this.http.get(fileUrl, { responseType: 'blob', headers });
  }
}
