import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Publisher, Hero } from '../../interface/hero.interface';
import { HeroesService } from '../../services/heroes.service';

import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { DialogRef } from '@angular/cdk/dialog';


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
  constructor(
    private heroesService:HeroesService,
    private router:Router,
    private activatedRoute: ActivatedRoute,
    private snackbar:MatSnackBar,
    private dialog:MatDialog
    ) {}

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
      this.showSnackbar(`${hero.superhero} update!`)


    });
    return;
  }
  this.heroesService.addHero(this.currentHero).
    subscribe(hero=>{
      this.showSnackbar(`${hero.superhero} created!`)
    })
  }
  private showSnackbar(message:string):void{
    this.snackbar.open(message,'Aceptar', {duration:3000
  })

}
public onDeleteHero() {
  if (!this.currentHero.id) {
    throw new Error('Hero id is required');
  }

  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    data: this.heroForm.value,
  });

  dialogRef.afterClosed().subscribe(result => {


    if (!result) {
      this.showSnackbar("No se ha podido eliminar el héroe");
      this.router.navigate(['/heroes']);
    } else {
      this.heroesService.DeleteHero(this.currentHero.id).subscribe((result) => {
        if(result){
          this.showSnackbar("Héroe eliminado");
          this.router.navigate(['/heroes']);
        }else{
          this.showSnackbar("Error al eliminar el héroe")
        }

      });
    }
  });
}





}

