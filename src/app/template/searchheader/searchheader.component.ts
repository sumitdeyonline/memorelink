import { Component, OnInit, Input } from '@angular/core';
import { ListJob } from './listjob';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/authentication/auth.service';
import { Router } from '@angular/router';
import { SEARCH_CONFIG } from '../../global-config';

@Component({
  selector: 'searchheader',
  templateUrl: './searchheader.component.html',
  styleUrls: ['./searchheader.component.css']
  //inputs: ['keyword','location']
})


export class SearchheaderComponent implements OnInit {

  @Input() keyword: string;
  @Input() location: string;

  

  title = '';
  form;
  error='';
  listjob = new ListJob();
    constructor(fb: FormBuilder,
                private router: Router,
                private _auth: AuthService) {
      this.form = fb.group({
        keyword: ['', Validators.required],
        location: ['', Validators.required]
      })
    }
    //constructor() {    }
  ngOnInit() {
    //this.keyword = "testing";
  }

  searchjob(jobsearchComponent) {
    
    if (jobsearchComponent.keyword === undefined) { jobsearchComponent.keyword =""; }
    if (jobsearchComponent.location === undefined) { jobsearchComponent.location =""; }
    console.log("Search Componenet ******* "+jobsearchComponent.keyword+" Location "+jobsearchComponent.location);
    this.router.navigate(['/listjob'], { queryParams: {  keyword: jobsearchComponent.keyword, 'location': jobsearchComponent.location}, 'queryParamsHandling': 'merge' });

  }
}
