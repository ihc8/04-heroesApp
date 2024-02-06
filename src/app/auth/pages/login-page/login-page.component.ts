import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [
  ]
})
export class LoginPageComponent {
  constructor(
    private AuthService:AuthService,
    private router :Router){}

  onLogin(){

    this.AuthService.login('ivan@gmail.con','1234')
    .subscribe(user=>{
      this.router.navigate(['/']);
      console.log({user});
    })
  }

}
