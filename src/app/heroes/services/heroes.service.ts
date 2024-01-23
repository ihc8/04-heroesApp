import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError,of } from 'rxjs';
import { Hero } from '../interface/hero.interface';
import { environments } from 'src/app/environments/environment';

@Injectable({providedIn: 'root'})
export class HeroesService {
  private baseUrl:string=environments.baserUrl;
  constructor(private http: HttpClient) { }
  /*Aqui me estoy trayendo los heroes del json */
  getHeroes():Observable<Hero[]>{
  return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
}
getHeroeById(id:string):Observable<Hero|undefined>{
  return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`).
  pipe(catchError(error=>of(undefined)));
}
getSuggetions(query: string):Observable<Hero[]>{
  return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q${query}&_limit=6`);
}


}
