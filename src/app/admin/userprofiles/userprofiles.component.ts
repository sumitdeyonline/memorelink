import { Component, OnInit } from '@angular/core';
import { UserProfilesModel } from './userprofiles.model';
import { FormBuilder, Validators } from '@angular/forms';
import { UserProfile } from 'src/app/services/firebase/userprofile/userprofile.model';
import { UserprofileService } from 'src/app/services/firebase/userprofile/userprofile.service';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { UploadResume } from 'src/app/services/firebase/uploadresume/uploadresume.model';
import { UploadResumeService } from 'src/app/services/firebase/uploadresume/upload-resume.service';


@Component({
  selector: 'userprofiles',
  templateUrl: './userprofiles.component.html',
  styleUrls: ['./userprofiles.component.css']
})
export class UserprofilesComponent implements OnInit {

  userProfile: UserProfile[];
  uResume: UploadResume[];
  userPRofiles = new UserProfilesModel();
  upform;
  constructor(fb: FormBuilder, private uProfile: UserprofileService, private auth: AuthService, private uRes: UploadResumeService) {
    this.upform = fb.group({
      username: ['', Validators.required],
      homephone: ['', Validators.required],
      cellphone: ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  profileSearch(profilesearch) {
    console.log("Username :: "+profilesearch.username);
    console.log("Home Phone Number :: "+profilesearch.homephone);
    console.log("Cell Phone Number :: "+profilesearch.cellphone);

    this.userProfile = null;
    if ((profilesearch.username == null) || (profilesearch.username == undefined) || (profilesearch.username.trim() == '')) {
      if ((profilesearch.homephone == null) || (profilesearch.homephone == undefined) || (profilesearch.homephone.trim() == '')) {
        if ((profilesearch.cellphone == null) || (profilesearch.cellphone == undefined) || (profilesearch.cellphone.trim() == '')) {
          console.log("Enter Something");
        } else {
          this.uProfile.getUserDetails(profilesearch.cellphone,'CP').subscribe(uprofile=> {
            this.userProfile = uprofile;
            this.getUserResumeDetails(this.userProfile[0].Username);
            // uname = this.userProfile[0].Username;
          })
        }
      } else {
        this.uProfile.getUserDetails(profilesearch.homephone,'HP').subscribe(uprofile=> {
          this.userProfile = uprofile;
          this.getUserResumeDetails(this.userProfile[0].Username);
        })
      }
    } else {
      this.uProfile.getUserDetails(profilesearch.username,'U').subscribe(uprofile=> {
        this.userProfile = uprofile;
        this.getUserResumeDetails(this.userProfile[0].Username);
      })
    }




  }

  getUserResumeDetails(uname) {
    console.log("UUUUNAME ::::: "+uname);
    this.uRes.getResumeDetails(uname).subscribe(ures=>{
      this.uResume = ures;
    })
  }


}
