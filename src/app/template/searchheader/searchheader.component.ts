import { Component, OnInit, Input } from '@angular/core';
import { ListJob } from './listjob';
import { FormBuilder, Validators,FormControl  } from '@angular/forms';
import { AuthService } from '../../services/authentication/auth.service';
import { Router } from '@angular/router';
import { SEARCH_CONFIG } from '../../global-config';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';





@Component({
  selector: 'searchheader',
  templateUrl: './searchheader.component.html',
  styleUrls: ['./searchheader.component.css']
  //inputs: ['keyword','location']
})


export class SearchheaderComponent implements OnInit {

  @Input() keyword: string;
  @Input() location: string;


  states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
  'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

  formatter = (result: string) => result.toUpperCase();
  search = (text$: Observable<string>) =>

  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(term => term.trim().length < 3  ? []
      : this.states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  )

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
    //console.log("Search Componenet ******* "+jobsearchComponent.keyword+" Location "+jobsearchComponent.location);
    this.router.navigate(['/listjob'], { queryParams: {  keyword: jobsearchComponent.keyword, 'location': jobsearchComponent.location}, 'queryParamsHandling': 'merge' });

  }

}
