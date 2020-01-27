import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserprofileService } from 'src/app/services/firebase/userprofile/userprofile.service';
import { UserProfile } from 'src/app/services/firebase/userprofile/userprofile.model';
import { UploadResume } from 'src/app/services/firebase/uploadresume/uploadresume.model';

import { UploadResumeService } from 'src/app/services/firebase/uploadresume/upload-resume.service';
import { Country } from 'src/app/services/firebase/userprofile/country.model';

@Component({
  selector: 'resumedetails',
  templateUrl: './resumedetails.component.html',
  styleUrls: ['./resumedetails.component.css']
})
export class ResumedetailsComponent implements OnInit {

  id: any;
  public uprofile: UserProfile;
  public uResumes: UploadResume[];
  county: Country[];
  constructor(private _activeRoute:ActivatedRoute, private _uprofile: UserprofileService, private _uResume: UploadResumeService) { }

  ngOnInit() {
    this._activeRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      console.log("Key Value :::::::: "+this.id);
    }); 
    this._uprofile.getUserProfileById(this.id).subscribe(uprof=> {
      this.uprofile = uprof;
      console.log("Profile Service  ::: "+this.uprofile.Username);
      this._uprofile.getCountryName(this.uprofile.Country).subscribe(cname=> {
        this.county = cname;
        console.log("Country Name :::: =====>>>> "+this.county[0].CountryName);
        this.uprofile.Country = this.county[0].CountryName;
        this._uResume.getResumeDetails(this.uprofile.Username).subscribe(uResume=> {
          this.uResumes = uResume;
          console.log("Resuje URL :::::::: "+this.uResumes[0].ResumeFileName);
        })        
      })

    })

  }

}
