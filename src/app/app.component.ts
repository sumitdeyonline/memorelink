import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/authentication/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  profile: any;

  constructor(private _auth: AuthService) {
    console.log("App Component .... ");
    _auth.handleAuthentication();
    //console.log("App Component .... !!!!!");
  }

  ngOnInit() {
   // console.log("App Component");
  }
}
