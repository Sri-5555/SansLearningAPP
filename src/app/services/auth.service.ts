import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  authState,
  createUserWithEmailAndPassword,
  UserCredential,
} from '@angular/fire/auth';
import { from, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser$ = authState(this.auth);
  idToken:any = '';

  constructor(private auth: Auth) {}

  signUp(email: string, password: string): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  logout(): Observable<any> {
    localStorage.removeItem('authToken');
    return from(this.auth.signOut());
  }

  saveIdToken(token: string): void {
    this.idToken = token;
    localStorage.setItem('idToken', token);
  }

  getIdToken(): string | null {
    if(this.idToken != ''){
      return this.idToken;
    }
    return localStorage.getItem('idToken');
  }

  getUserId(): string | null {
    return localStorage.getItem('uid');
  }


  isLoggedIn(): boolean {
    return !!localStorage.getItem('idToken');
  }
}