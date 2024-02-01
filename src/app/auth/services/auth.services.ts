
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../environments/environments';

@Injectable({providedIn: 'root'})
export class AuthService {
  private baseUrl:environments.baseUrl;
  constructor(private http: HttpClient) { }

}
