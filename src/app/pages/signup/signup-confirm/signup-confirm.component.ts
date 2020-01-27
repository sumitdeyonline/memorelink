import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'signup-confirm',
  templateUrl: './signup-confirm.component.html',
  styleUrls: ['./signup-confirm.component.css']
})
export class SignupConfirmComponent implements OnInit {

  @Input() signupSucessMessage: string;
  constructor(private router: Router, private _auth: AuthService) { 
    console.log("SIGNUP CONFIRM ::::: "+this.signupSucessMessage);

  }

  ngOnInit() {

  }

}
