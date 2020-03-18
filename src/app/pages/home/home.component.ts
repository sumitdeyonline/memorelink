import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _auth: AuthService) {

    //console.log("App Component .... !!!!!");
    _auth.handleAuthentication();

    // setTimeout(() =>{
    //   //console.log("Home Component .... ");
    //   _auth.handleAuthentication();
    // }, 1000);  

  }

  ngOnInit() {
  }

}
