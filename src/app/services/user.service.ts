import { Injectable } from '@angular/core';
import {
  doc,
  docData,
  Firestore,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ProfileUser } from '../models/user';
import { AuthService } from './auth.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private firestore: Firestore, private authService: AuthService,
    private fireauth: AngularFireAuth,
    private database: AngularFireDatabase,
    private http: HttpClient) {}

  get currentUserProfile$(): Observable<ProfileUser | null> {
    return this.authService.currentUser$.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }

        const ref = doc(this.firestore, 'users', user?.uid);
        return docData(ref) as Observable<ProfileUser>;
      })
    );
  }

  addUser(user: ProfileUser): Observable<void> {
    const Path = `users/${user.uid}`; 
    this.database
      .object(Path)
      .set(user)
      .then(() => {
      })
      .catch((error) => {
        console.error('Error adding user details:', error);
      });
    const ref = doc(this.firestore, 'users', user.uid);
    return from(setDoc(ref, user));
  }

  // updateUser(user: ProfileUser): Observable<void> {
  //   const ref = doc(this.firestore, 'users', user.uid);
  //   return from(updateDoc(ref, { ...user }));
  // }

  getUserDetails(uid: string, token: string) {
    return this.http.get(`https://sanslearn-44246-default-rtdb.firebaseio.com/users/${uid}/.json?auth=${token}`);
  }

  updateUserDetails(uid: string, token: string, updatedUser: any) {
    return this.http.put(`https://sanslearn-44246-default-rtdb.firebaseio.com/users/${uid}/.json?auth=${token}`,updatedUser);
  }

}