import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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


}
