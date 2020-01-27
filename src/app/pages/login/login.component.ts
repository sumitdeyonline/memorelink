import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Login } from './Login';
import { AuthService } from '../../services/authentication/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = '';
  form;
  error='';
  login = new Login();
  loginError = '';
  //userIdPasswordWrong ='';
  constructor(fb: FormBuilder, 
              private _auth: AuthService) {
    this.form = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  Login(loginComponent) {
    //console.log("UserName and PAssword");
    //this._auth.setLoginError('');

    console.log("Login Componenet *******");
    this.loginError ='';
      this._auth.login(loginComponent.username, loginComponent.password);


    
    setTimeout(() =>{
      if (this._auth.isAuthenticated()) {
        console.log("Authenticated ....");
      } else {
        //this.login.username = '';

          this.login.password = '';
          this.loginError ='Wrong Username or password';

        //console.log("ERROR ::::::::: --->>>>>"+this._auth.returnError);
      }
    }, 6000);    
    //this._authService.login();
    //this._authService.getProfile();
  }

  /*public setuserIdPasswordWrongText(errorMsg) {
    this.userIdPasswordWrong = errorMsg;
  }*/

}