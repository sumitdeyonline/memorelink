import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { ApplyjobService } from 'src/app/services/firebase/applyjob/applyjob.service';
import { ApplyJob } from 'src/app/services/firebase/applyjob/applyjob.model';
import { PagerService } from 'src/app/services/common/pager.service';
import { FormBuilder, Validators } from '@angular/forms';
import { UserdetailsService } from 'src/app/services/firebase/userdetails/userdetails.service';
import { UserDetails } from 'src/app/services/firebase/userdetails/userdetails.model';

@Component({
  selector: 'applyjobadmin',
  templateUrl: './applyjob-admin.component.html',
  styleUrls: ['./applyjob-admin.component.css']
})
export class ApplyjobAdminComponent implements OnInit {

  userDetails: UserDetails[];
  applyform;

  aJob: ApplyJob[];

    // pager object
    pager: any = {};

    // paged items
    pagedItems: any[];
  constructor(private auth: AuthService, private appjob: ApplyjobService,private udetails: UserdetailsService, fb: FormBuilder, private pagerService: PagerService) { 

    this.applyform = fb.group({
      company: ['', Validators.required]
    })
    this. getCompany();

    // this.appjob.getApplyJob().subscribe(applyJob => {
    //   this.aJob = applyJob;
    //   console.log("User Job :::::::: => "+this.aJob.length);
    //   this.setPage(1);
    // });    

  }

  ngOnInit() {
  }

  getCompany() {

    this.udetails.getUserDetails('', 'A').subscribe(udtl=> {
      this.userDetails = udtl;
      console.log(" Length ::::===>>>>>>>>>>>> "+this.userDetails.length); 
    });
  }

  applyRole(apjob) {
    console.log("Company :::::: "+apjob.company);
    if ((apjob.company == null) || (apjob.company == undefined) || (apjob.company.trim() == ''))  {
      console.log("Blank...");
      this.aJob = null;
    } else {
      this.appjob.getApplyJobByCompany(apjob.company).subscribe(udtl=> {
        this.aJob = udtl;
        console.log(" Length :::: "+this.aJob.length);
        this.setPage(1);
      });
    }
}

  setPage(page: number) {
    console.log("Page Count");
    window.scroll(0,0);
    // get pager object from service
    this.pager = this.pagerService.getPager(this.aJob.length, page);
    //console.log("Page Count...1  ::: "+this.pager.length);
    // get current page of items
    this.pagedItems = this.aJob.slice(this.pager.startIndex, this.pager.endIndex + 1);
    //console.log("Page Count...1  ::: "+this.pagedItems.length);
  } 

}
