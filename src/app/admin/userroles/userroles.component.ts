import { Component, OnInit } from '@angular/core';
import { UserprofileService } from 'src/app/services/firebase/userprofile/userprofile.service';
import { UserRole } from 'src/app/services/firebase/userprofile/userrole.model';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'userroles',
  templateUrl: './userroles.component.html',
  styleUrls: ['./userroles.component.css']
})
export class UserrolesComponent implements OnInit {

  UserRole: UserRole[];

  constructor(private uProfile: UserprofileService, private auth: AuthService) {
    this.uProfile.getUserAllRoles().subscribe(urole => {
      this.UserRole = urole;
      console.log("User Role :::::::: => "+this.UserRole.length);
    });

  }


  ngOnInit() {
  }

}
