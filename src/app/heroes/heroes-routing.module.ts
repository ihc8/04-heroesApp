import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from '../auth/pages/layout-page/layout-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';

const routes: Routes = [
  {
    path:'',
    component:LayoutPageComponent,
    children:[
      {
        path:'new-heroe',component:NewPageComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
