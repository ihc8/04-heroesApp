import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError,of,map } from 'rxjs';
import { Hero } from '../interface/hero.interface';
import { environments } from 'src/environments/environments';

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
  return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&_limit=6`);
}

addHero(hero:Hero):Observable<Hero>{
  return this.http.post<Hero>(`${this.baseUrl}/heroes`,hero)
}

UpdateHero(hero:Hero):Observable<Hero>{
  if(!hero.id)throw Error('Hero id is required');
  return this.http.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`,hero)
}

DeleteHero(id:string):Observable<boolean>{
 return this.http.delete(`${this.baseUrl}/heroes/${id}`)
 .pipe(
  map(respone=>true),
  catchError(response =>of(false))
  )
}

}
