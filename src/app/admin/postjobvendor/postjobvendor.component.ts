import { Component, OnInit } from '@angular/core';
import { PostJobVendorModel } from './postjobvendor.model';
import { UserDetails } from 'src/app/services/firebase/userdetails/userdetails.model';
import { SEARCH_CONFIG } from 'src/app/global-config';
import { PagerService } from 'src/app/services/common/pager.service';
import { UserdetailsService } from 'src/app/services/firebase/userdetails/userdetails.service';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { PostjobService } from 'src/app/services/firebase/postjob/postjob.service';
import { PostJobc } from 'src/app/services/firebase/postjob/postjob.model';

@Component({
  selector: 'postjobvendor',
  templateUrl: './postjobvendor.component.html',
  styleUrls: ['./postjobvendor.component.css']
})
export class PostjobvendorComponent implements OnInit {

  postJob = new PostJobVendorModel();
  userDetails: UserDetails[];
  postJobc: PostJobc[];
  pjobForm;

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];  

  length: any = SEARCH_CONFIG.LIST_JOB_DESC_WIDTH;

  constructor(private udetails: UserdetailsService, private auth: AuthService, fb: FormBuilder, private pagerService: PagerService, private pJob: PostjobService) { 
    this.pjobForm = fb.group({
      username: ['', Validators.required],
      company: ['', Validators.required]
    })
    this.getCompany();    
  }

  ngOnInit() {
  }

  getCompany() {
    this.udetails.getUserDetails('', 'A').subscribe(udtl=> {
      this.userDetails = udtl;
      console.log(" Length :::: "+this.userDetails.length);
    })    
  }

  postjobSearch(postjobSearch) {
    console.log("Username :: "+postjobSearch.username);
    console.log("Role :: "+postjobSearch.company);
    
    if ((postjobSearch.username == null) || (postjobSearch.username == undefined) || (postjobSearch.username.trim() == '')) {
      if (postjobSearch.company == "") {
        console.log("No Value");
      } else {
        this.pJob.getPostJobsByUser(postjobSearch.company,'C').subscribe(udtl=> {
          this.postJobc = udtl;
          console.log(" Length :::: "+this.postJobc.length);
    
    
          if (this.postJobc.length > 0) {
            console.log("User Role ::: "+this.postJobc[0].Company);
            this.setPage(1);
    
    
          } else {
            console.log("Company not found");
            this.postJobc = null;
            this.pagedItems = null;
            this.setPage(1);
          }
    
        }) 
      }
    } else {
      this.pJob.getPostJobsByUser(postjobSearch.username,'U').subscribe(udtl=> {
        this.postJobc = udtl;
        console.log(" Length :::: "+this.postJobc.length);
  
  
        if (this.postJobc.length > 0) {
          console.log("User Role ::: "+this.postJobc[0].Company);
          this.setPage(1);
  
  
        } else {
          console.log("User not found");
          this.postJobc = null;
          this.pagedItems = null;
          this.setPage(1); 
        }
  
      }) 
    }

  }

  setPage(page: number) {
    console.log("Page Count");
    window.scroll(0,0);
    // get pager object from service
    if (this.postJobc !=null) {
      this.pager = this.pagerService.getPager(this.postJobc.length, page);
      //console.log("Page Count...1  ::: "+this.pager.length);
      // get current page of items
      this.pagedItems = this.postJobc.slice(this.pager.startIndex, this.pager.endIndex + 1);
      //console.log("Page Count...1  ::: "+this.pagedItems.length);
    }

  }    

}
