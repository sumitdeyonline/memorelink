import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Login } from '../Login';
import { Router } from '@angular/router';

@Component({
  selector: 'resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  form;
  error='';
  login = new Login();
  loginError = '';

  constructor(fb: FormBuilder,
    public _auth: AuthService,private router: Router) {

      this.form = fb.group({
        username: ['', Validators.required]
      })

    }

  ngOnInit() {
  }

  ResetPassword(resetComponent) {
    //console.log("Reset Componenet ******* for "+resetComponent.username);
    this._auth.resetPassword(resetComponent.username);
    this.loginError ='We have just sent you a email to reset your password';
    //this.router.navigate(['/login']);
    //console.log("authResult :::::::: -> !!!!!!!! "+authResult);
    //this._auth.resetPassword(resetComponent.username);
  }

}
