import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.services';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interface/user.interface';

@Component({
  selector: 'heroe-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})
export class LayoutPageComponent {
  public sidebarItems=[
    {label:'Listado',icon:'label',url:'./list'},
    {label:'Añadir',icon:'add',url:'./new-hero'},
    {label:'Buscar',icon:'search',url:'./search'},
  ]
  constructor(private authService:AuthService,private router:Router){}

  onLogout():void{
    this.authService.logout();
    this.router.navigate(['./auth']);
  }
  get user():User|undefined{
    return this.authService.currentUser;
  }
}
