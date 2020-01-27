import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authentication/auth.service';
//import { UserDetails } from 'src/app/services/firebase/userdetails.model';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  accessToken: any[];
  //uDetail: UserDetails[];
  //isEmployeeRole: boolean;
  constructor(private auth: AuthService) { 

    //console.log("NavBar Compoment ***");
  }

  ngOnInit() {
    // this.isEmployeeRole = false;

    // if (this.auth.userProfile !=null)
    //   console.log("UserName ::::: "+this.auth.userProfile.name);
    // else  
    // console.log("UserName Not Retrive ");

    // this.auth.UserRole().subscribe(udetail=> {
    //   this.uDetail = udetail;
    //   if (this.uDetail[0] !=null) {
    //     if (this.uDetail[0].userRole == "Employer") {
    //       console.log("Employer Role :::::: ");
    //       this.isEmployeeRole = true;
    //     } else {
    //       console.log("Not a Employer Role :::::: ");
    //       this.isEmployeeRole = false;
    //     }
    //   }
    //   //console.log("List Service ..... 33333 ::::: "+this.pjob[1].id);
    // })    
  }

}
