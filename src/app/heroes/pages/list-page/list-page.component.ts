import { Component,OnInit } from '@angular/core';
import { Hero } from '../../interface/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: []
})
export class ListPageComponent implements OnInit {
  constructor(private serviceHeroe:HeroesService){};
  public listaHeroes:Hero[]=[];
  /*el OBSERVABLE te obliga al subscribe*/
ngOnInit(): void {
  //Cuando el servicio trae los datos los ingresamos en la lista
  this.serviceHeroe.getHeroes().subscribe(
    (heroes:Hero[])=>{
      this.listaHeroes=heroes
    }
  )

}
}
