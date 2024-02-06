
import { Component, OnInit, Pipe } from '@angular/core';



import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { User } from '../interface/user.interface';
import { environments } from '../../../environments/environments';






@Injectable({providedIn: 'root'})
export class AuthService {

  private urlBase = environments.baserUrl;
  private user?:User;
  constructor(private http: HttpClient) { }

  get currentUser():User | undefined{
    if(!this.user)return undefined;

    return this.user;
  }

  login(email:string,password:string):Observable<User>{

    return this.http.get<User>(`${this.urlBase}/users/1`)
    .pipe(
      tap(user=>this.user=user),
      tap(user=>localStorage.setItem('token','wefesdfwe') )
    );
  }

  logout(){
    this.user=undefined;
    localStorage.clear();
  }

  checkAuthentication(): Observable<boolean> | boolean{
    if(!localStorage.getItem('token'))return false;


    const token = localStorage.getItem('token');

    return this.http.get<User>(`${this.urlBase}/users/1`)
    .pipe(
      tap(user=>this.user=user),
      map(user=>!!user),
      catchError(err=>of(false))
    )
  }
}
