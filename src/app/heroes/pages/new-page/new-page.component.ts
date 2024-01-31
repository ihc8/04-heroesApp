import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Publisher } from '../../interface/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interface/hero.interface';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent {

  public heroForm=new FormGroup({
    id:new FormControl<string>(''),
    superhero: new FormControl<string>('',{nonNullable:true}),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance:new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  })
  public publishers=[
    {id:'DC Comics', desc:'DC - Comics'},
    {id:'Marvel Comics', desc:'Marvel - Comics'}
  ]
  constructor(private heroesService:HeroesService,
    private router:Router,private activatedRoute: ActivatedRoute) {}

    ngOnInit():void{
      if(!this.router.url.includes('edit'))return;

      this.activatedRoute.params
    .pipe(
      switchMap(({id})=>this.heroesService.getHeroeById(id))
    ).subscribe(hero=>{
      if(!hero)return this.router.navigate(['/heroes/list']);
      this.heroForm.reset(hero)
      return
    })
    }

  get currentHero(): Hero{
    const hero=this.heroForm.value as Hero;
    return hero;
 }

 onSubmit():void{
  if(this.heroForm.invalid)return;

  if(this.currentHero.id){
    this.heroesService.UpdateHero(this.currentHero).
    subscribe(hero=>{


    });
    return;
  }
  this.heroesService.addHero(this.currentHero).
    subscribe(hero=>{
      //TODO: Mostrar snackbar
    })
  }

}
//this heroForm.reset(hero);
