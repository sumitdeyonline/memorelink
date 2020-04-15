import { Component, OnInit, Input } from '@angular/core';
import { ListJob } from './listjob';
import { FormBuilder, Validators,FormControl  } from '@angular/forms';
import { AuthService } from '../../services/authentication/auth.service';
import { Router } from '@angular/router';
import { SEARCH_CONFIG } from '../../global-config';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';
import { isNumeric } from 'rxjs/util/isNumeric';
import { LocationService } from 'src/app/services/location/location.service';
import { CityZipModel } from './citizip.mode';
import { CityDetails } from 'src/app/pages/listjob/city.model';





@Component({
  selector: 'searchheader',
  templateUrl: './searchheader.component.html',
  styleUrls: ['./searchheader.component.css']
  //inputs: ['keyword','location']
})


export class SearchheaderComponent implements OnInit {

  @Input() keyword: string;
  @Input() location: string;


  // searchvar = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
  // 'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
  // 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  // 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  // 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  // 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
  // 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
  // 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
  searchvar =[];
  // formatter = (result: string) => result.toUpperCase();
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.trim().length < SEARCH_CONFIG.MAX_CHARACTER_TYPE_AHEAD  ? []
        : this.searchvar.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )
  //cityzipM: CityZipModel;
  title = '';
  form;
  error='';
  listjob = new ListJob();
    constructor(fb: FormBuilder,
                private router: Router,
                private _auth: AuthService,
                private locserv: LocationService) {
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

  // TypeaheadSearch() {
  //   let array=[];
  //   console.log("Type .. ");
  //   //let cityzipM = new CityZipModel();
  //   return (text$: Observable<string>) =>
  //   text$.pipe(
  //     debounceTime(200),
  //     distinctUntilChanged(),
  //     //switchMap( (searchText) => searchText.trim().length < 5  ? []: this.locserv.getCityStateFromZip(searchText.trim()) )

  //     map(term => term.trim().length < 5  ? []
  //       : this.searchvar.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  //     // map(term => term.trim().length < 5  ? []
  //     //   //: isNumeric(term.trim())? this.zipcodeSearch(term.trim())
  //     //   : isNumeric(term.trim())? 
  //     //   this.locserv.getCityStateFromZip(term.trim()).subscribe((data: any[])=>{
  //     //   // this.locserv.getCityStateFromZip(term.trim()).map(data => { 
  //     //     //array = JSON.parse(JSON.stringify(data)) as any[];
  //     //     cityzipM.city = data['city'];
  //     //     cityzipM.state = data['state'];
  //     //     cityzipM.country = data['country'];
  //     //     // let str = data.jscityzipM.city = array['city'];on()
  //     //     console.log([cityzipM.city+","+cityzipM.state]);
  //     //     // getcity = this.locserv.getCityStateFromZip(zipcode);
  //     //     // console.log("XXXX : "+getcity);
  //     //     //return ['Livermore,CA'];
  //     //     return [array['city']+","+array['state']];
    
  //     //   })     
  //     //   : this.states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  //   )
  // }

  zipcodeSearch(localtionval) {
    let getcity='';
    let array=[];
    let cityD : CityDetails;
    // this.locserv.getCityStateFromZip(zipcode).then(() => {
    //   this.UploadResumeProfileBulk(uname,ResumeURL,ResumeFileName,contenttype,csvRecords); 
    // });
    //console.log("Zipcode :: "+zipcode);
   // console.log("XXXX==> : "+this.searchvar);

    if (localtionval.length > SEARCH_CONFIG.MAX_CHARACTER_TYPE_AHEAD) {
      let inputval = localtionval.trim();
      if (isNumeric(inputval)) {

        this.locserv.getCityStateFromZip(inputval).subscribe((data: any[])=>{ 
            this.searchvar = [data['city']+","+data['state']];
            //console.log("Get value : "+this.form.controls['location'].getValue());
            this.location = data['city']+","+data['state'];
            //return ['Livermore,CA'];
            //return [data['city']+","+data['state']];
          });
      } else {
        this.locserv.getCityStateSearch(localtionval).subscribe((data: any[]) => {
          // this.http.get(getCityID,{responseType: 'json',headers: headers})
          //          .map((data: any[]) => {
      
            const array = JSON.parse(JSON.stringify(data)) as any[];
            //console.log(array['data']);
            
            for(let i=0;i<array['data'].length;i++) {
              cityD = new CityDetails();
              cityD = array['data'][i];
              this.searchvar[i] = cityD.city+","+cityD.regionCode;

            }

        })

      }

    }
  }


}
