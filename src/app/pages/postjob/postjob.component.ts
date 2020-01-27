import { Component, OnInit } from '@angular/core';

import { FormBuilder, NgForm } from '@angular/forms';
import { AuthService } from '../../services/authentication/auth.service';

import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
// import { ToastrService } from 'ngx-toastr';
import {formatDate} from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { PostjobService } from 'src/app/services/firebase/postjob/postjob.service';
import { UserprofileService } from 'src/app/services/firebase/userprofile/userprofile.service';
import { Country } from 'src/app/services/firebase/userprofile/country.model';
import { State } from 'src/app/services/firebase/userprofile/state.model';
import { PostJobc } from 'src/app/services/firebase/postjob/postjob.model';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { CommondialogComponent } from 'src/app/common/commondialog/commondialog.component';
import { UserdetailsService } from 'src/app/services/firebase/userdetails/userdetails.service';
import { UserDetails } from 'src/app/services/firebase/userdetails/userdetails.model';





@Component({
  selector: 'postjob',
  templateUrl: './postjob.component.html',
  styleUrls: ['./postjob.component.css']
})
export class PostjobComponent implements OnInit {





  PostJobForm: any;
  // postjob = new PostJobc();
  postjobMessage: string;
  postjobSucessMessage: string;
  postJob:  PostJobc;
  //public pjob: PostJobc;
  id: any;
  postJobList: [any];
  countries: Country[];
  state: State[];
  userDetails: UserDetails[];
  isJobLength: boolean = false;
  postJobCount: number = 0;

  constructor(private _activeRoute: ActivatedRoute, private _auth: AuthService, fb: FormBuilder, private postjobService: PostjobService,
              private toastrservice: ToastrService,
              private uProfile: UserprofileService,
              private router: Router,
              private dialog: MatDialog,
              private datePipe: DatePipe,
              private udetails: UserdetailsService) {
        window.scroll(0,0);
        this.getCountry();
    // this.PostJobForm = fb.group({
    //   // email: ['', Validators.required,Validators.email],
    //   // password: ['', Validators.required,Validators.minLength(5)],
    //   // repassword: ['',Validators.required,Validators.minLength(5)]
    // })

    console.log("Date :::::::: "+formatDate(new Date(), 'MM/dd/yyyy', 'en'));

    this._activeRoute.paramMap.subscribe(params => {
      this.id = params.get("id");
      console.log("Key Value :::::::: "+this.id);
    });
    this.resetForm();

    this.udetails.getUserDetails(this._auth.userProfile.name,'U').subscribe(udtl=> {


      if ((this.id == null) || (this.id == '')) {
        console.log("NEW FORM ....");
        this.userDetails = udtl;
        if (this.userDetails.length > 0) {
          this.postjobService.selectedPostJobc.Company = this.userDetails[0].company;
          if (this.userDetails[0].postjobCount !== undefined) {
            this.postJobCount = this.userDetails[0].postjobCount;
          }
          console.log("Number of Job Count "+this.postJobCount);
          console.log("ID :::::: "+this.userDetails[0].id);
        }
      } else {
        console.log("UPDATE FORM ....");

        this.postjobService.getPostJobsById(this.id).subscribe(postJob=> {
          console.log("UPDATE FORM ....111111111122222");
          this.postJob = postJob;
          this.getFieldForUpdate();
          this.getState(this.postJob.JobCountry);
          this.isPayrate(this.postJob.JobPayRate);
        })
      }
      // if (this.userDetails.length > 0) {
      //     if (this.userDetails[0].postjobCount !== undefined) {
      //       this.postJobCount = this.userDetails[0].postjobCount;
      //     }
      //   console.log("Number of Job Count "+this.postJobCount);
      //   console.log("ID :::::: "+this.userDetails[0].id);
      // }


    })




  }

  ngOnInit() {
    // let dateFormat = require('mm/dd/yyyy');


  }

  JobPostSubmit(postJobForm : NgForm) {
    let type;
    console.log ("Datatat ::: "+postJobForm.value.JobTitle);
    // postJobForm.value.CreatedDate = formatDate(new Date(), 'MM/dd/yyyy', 'en');
    // console.log ("Datatat ::: "+postJobForm.value.CreatedDate);
    if (postJobForm.value.JobLength === undefined) {
      postJobForm.value.JobLength = null;
    }

    if (postJobForm.value.JobPayRate != 'Hourly') {
      postJobForm.value.JobLength = null;
    }

    if (postJobForm.value.CCToEmail === undefined) {
      postJobForm.value.CCToEmail = '';
    }

    if (postJobForm.value.ApplyToURL === undefined) {
      postJobForm.value.ApplyToURL = '';
    }

    if (postJobForm.value.country === undefined) {
      postJobForm.value.country = '';
    }
    if (postJobForm.value.state === undefined) {
      postJobForm.value.state = '';
    }

    if (postJobForm.value.JobZip === undefined) {
      postJobForm.value.JobZip = '';
    }    

    if (postJobForm.value.EmploymentTypes === undefined) {
      postJobForm.value.EmploymentTypes = '';
    } 

    if (postJobForm.value.JobPayRate === undefined) {
      postJobForm.value.JobPayRate = '';
    } 

    if (postJobForm.value.Compensation === undefined) {
      postJobForm.value.Compensation = '';
    } 

    if (postJobForm.value.TravelRequirements === undefined) {
      postJobForm.value.TravelRequirements = '';
    } 

    if (postJobForm.value.isTeleComute === undefined) {
      postJobForm.value.isTeleComute = '';
    }     

    if ((this.id == null) || (this.id == '')) {

      this.postJobCount = this.postJobCount + 1;
      this.userDetails[0].postjobCount = this.postJobCount;
      this.postjobService.addUpdatePostJobs(postJobForm.value,this.id, new Date(), "", this.userDetails[0]);
      console.log("NEW FORM ....");
      type = "Created";
    } else {
      type = "Updated";
      //this.userDetails[0]={};
      this.postjobService.addUpdatePostJobs(postJobForm.value,this.id,this.postJob.CreatedDate, this.postJob.CreatedBy, null);
    }

    //console.log("$Key VALUE :::::: "+postJobForm.value.$key);

    //this.faqservice.updateFaq(faqForm.value);
    /*this.faqservice.insertFaq(faqForm.value);
    this.resetForm(faqForm);
    console.log("Submit Data "+faqForm.value);*/


    //console.log("Pst Job ID :::: "+pjob.id);


    // if ((this.id == null) || (this.id == '')) {

    //   //this.toastrservice.success('Added Sucessfully', '');
    //   //this.toastrservice.success(FIREBASE_CONFIG.AddedSucessfully, '');
    //   //console.log("Added Sucessfully");
    // } else {
    //   //this.toastrservice.success('UpdatedSucessfully', '');
    //   //this.toastrservice.success(FIREBASE_CONFIG.UpdatedSucessfully, '');
    //   //console.log("Updated Sucessfully");
    // }

    // dialogConfig.height = "4";
    // dialogConfig.width ="3";



    this.resetForm(postJobForm);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = type+"||jobpoststatus";
    this.dialog.open(CommondialogComponent, dialogConfig);


    /*setTimeout(() => {

      this.dialog.closeAll();
      window.scroll(0,0);
      this.router.navigate(["jobpoststatus"]);
      window.scroll(0,0);
    }, 1000);*/

    //this.router.navigate(["jobpoststatus"]);

    //this.router.navigate([FIREBASE_CONFIG.FaqURL]);
  }

  getCountry() {
    this.uProfile.getCountry().subscribe(cprop => {
      this.countries = cprop;
      console.log("Country :::::::: => "+this.countries.length);
    })
  }

  getState(country) {
    this.uProfile.getStateDetails(country).subscribe(sprop => {
      this.state = sprop;
      console.log("State :::::::: => "+this.state.length);
    })
  }

  isPayrate(empprate) {
     if (empprate == 'Hourly')
      this.isJobLength = true;
    else {
      this.isJobLength = false;

    }


  }



  resetForm(postJobForm?: NgForm) {
    if (postJobForm !=null)
    postJobForm.reset();
      this.postjobService.selectedPostJobc = {
        //id: '',
        // question: '',
        // answer: '',
        // category: '',
        // details: ''
      }

  }





  getFieldForUpdate() {
    this.postjobService.selectedPostJobc.id = this.id;
    this.postjobService.selectedPostJobc.JobTitle = this.postJob.JobTitle;
    this.postjobService.selectedPostJobc.JobDesc = this.postJob.JobDesc;
    this.postjobService.selectedPostJobc.Skills = this.postJob.Skills;
    this.postjobService.selectedPostJobc.Company = this.postJob.Company;
    this.postjobService.selectedPostJobc.ApplyToEmail = this.postJob.ApplyToEmail;
    this.postjobService.selectedPostJobc.CCToEmail = this.postJob.CCToEmail;
    this.postjobService.selectedPostJobc.ApplyToURL = this.postJob.ApplyToURL;
    this.postjobService.selectedPostJobc.JobCity = this.postJob.JobCity;
    this.postjobService.selectedPostJobc.JobState = this.postJob.JobState;
    this.postjobService.selectedPostJobc.JobCountry = this.postJob.JobCountry;
    this.postjobService.selectedPostJobc.JobZip = this.postJob.JobZip;

    this.postjobService.selectedPostJobc.EmploymentTypes = this.postJob.EmploymentTypes;
    this.postjobService.selectedPostJobc.JobPayRate = this.postJob.JobPayRate;
    this.postjobService.selectedPostJobc.Compensation = this.postJob.Compensation;
    this.postjobService.selectedPostJobc.JobLength = this.postJob.JobLength;
    this.postjobService.selectedPostJobc.TravelRequirements = this.postJob.TravelRequirements;
    this.postjobService.selectedPostJobc.isTeleComute = this.postJob.isTeleComute;
    this.postjobService.selectedPostJobc.isSearchable = this.postJob.isSearchable;

    if ((this.id == null) || (this.id == '')) {
      this.postjobService.selectedPostJobc.CreatedBy = this.postJob.CreatedBy;
      this.postjobService.selectedPostJobc.CreatedDate = this.postJob.CreatedDate;
    }
    this.postjobService.selectedPostJobc.LastModifiedBy = this.postJob.LastModifiedBy;
    this.postjobService.selectedPostJobc.LastModifiedDate = this.postJob.LastModifiedDate;
  }

}
