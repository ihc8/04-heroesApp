import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interface/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { HeroesRoutingModule } from '../../heroes-routing.module';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [
  ]
})
export class SearchPageComponent {
  public searchInput =new FormControl('');
  public heroes:Hero[]=[];
  public selectedHero?:Hero;

  constructor(private heroesService:HeroesService){}


  public searchHero(){
    const value: string=this.searchInput.value || '';

    this.heroesService.getSuggetions(value).subscribe(
      heroes => this.heroes=heroes
    );
  }

  public onSelectedOption(event : MatAutocompleteSelectedEvent){
    if(!event.option.value){
      this.selectedHero=undefined;
      return;
    }

    const hero : Hero=event.option.value;
    this.searchInput.setValue(hero.superhero);
    this.selectedHero=hero;
  }

}
