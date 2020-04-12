import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//import { PostjobService } from '../../services/firebase/postjob.service';
//import { PostJobc } from '../../services/firebase/postjob.model';
import { DateformatService } from '../../services/dateformat/dateformat.service';
import * as algoliasearch from 'algoliasearch';
import {isNumeric} from 'rxjs/util/isNumeric';
import { SEARCH_CONFIG } from '../../global-config';
import { PostJobc } from 'src/app/services/firebase/postjob/postjob.model';
import { PostjobService } from 'src/app/services/firebase/postjob/postjob.service';
import { PagerService } from 'src/app/services/common/pager.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


import { LocationService } from 'src/app/services/location/location.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CityDetails } from './city.model';
import { NearestCityDetails } from './nearestcity.model';
//import { ZipCityState } from './zipcity.model';
//import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'listjob',
  templateUrl: './listjob.component.html',
  styleUrls: ['./listjob.component.css'],

})
export class ListjobComponent implements OnInit {

  headers = new HttpHeaders({
    // 'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    'Access-Control-Allow-Origin': "*",
    'Access-Control-Allow-Methods': 'GET',
    'Content-Type': 'application/json',
    "x-rapidapi-host": SEARCH_CONFIG.GEODB_API_HOST,
    "x-rapidapi-key": SEARCH_CONFIG.GEODB_API_KEY    
    // 'Accept': "application/ms-word"
  });

  PostJobc: PostJobc[];
  // PostJobcFinal: PostJobc[] = [];
  // listjob = new ListJob();
  keyword: string;
  location: string;
  client: any;
  index: any;
  loading: boolean = false;

  length: any = SEARCH_CONFIG.LIST_JOB_DESC_WIDTH;
  cityModel: CityDetails;
  allCityUS = [];
  noResultFound: string='';

  // ALGOLIA_APP_ID = "8I5VGLVBT1";
  // ALGOLIA_API_KEY = "378eba06830cc91d1dad1550dd4a5244";
  //searchQuery: string ="sumitdey@yahoo.com" ;
  //jobs = [];

    // pager object
    pager: any = {};

    // paged items
    pagedItems: any[];


  constructor(private router: Router, 
              private route: ActivatedRoute, 
              private postjob: PostjobService, 
              public dformat: DateformatService, 
              private pagerService: PagerService,
              private http: HttpClient,
              private locserv: LocationService) {
              // private SpinnerService: NgxSpinnerService) {

    window.scroll(0,0);
    //this.PostJobc = null;



    //console.log("FireBase List : .....&&&&&&&&& :::::::-> 1 ");
    // this.postjob.getPostJobs(this.keyword,this.location).subscribe(PostJobc => {
    //   this.PostJobc = PostJobc;
    //   //console.log("List Service ..... 33333 ::::: "+this.PostJobc[1].JobTitle);
    //   //console.log("List Service ..... 4444 ::::: "+this.PostJobc[1].JobCity);
    // });

    // console.log("FireBase List : .....&&&&&&&&& :::::::-> 1 ");
    // this.postjob.getPostJobsAlgolia(this.keyword,this.location).subscribe(PostJobc => {
    //   this.PostJobc = PostJobc;
    //   console.log("List Service ..... 33333 ::::: "+this.PostJobc[1].JobTitle);
    //   console.log("List Service ..... 4444 ::::: "+this.PostJobc[1].JobCity);
    // });

    //this.PostJobc = this.postjob.getPostJobsAlgolia(this.keyword,this.location);

    // this.client = algoliasearch(this.ALGOLIA_APP_ID, this.ALGOLIA_API_KEY,
    //   { protocol: 'https:' });
    //   console.log("Test 1 ....1" );



    //   this.index = this.client.initIndex("PostJob");
    //   console.log("Test 1 ....2" );
    //   //this.index.searchQuery

    //   // this.index.search({
    //   //   facetFilters: ["JobState=CA"]
    //   // });
    //   // this.index.searchForFacetValues({
    //   //   facetName: 'JobState',
    //   //   facetQuery: 'CA',
    //   this.index.search({
    //     //filters: "{JobState:CA}",
    //     //filters:  'CA'
    //     // searchfiltersarameters: {
    //     //   filters: '{JobState:CA}'
    //     // }
    //     //facetFilters: "{JobState:CA}",
    //     //searchParameters: '[JobState=CA]'
    //     query: this.keyword,
    //     //query: '{ JobState:CA }',
    //     //attributesToRetrieve: ['JobTitle', 'JobDesc']

    //     // restrictSearchableAttributes: [
    //     //   'JobTitle',
    //     //   'JobDesc'
    //     // ]
    //     //filters: 'JobState=CA'

    //   }).then((data) => {

    //     this.PostJobc = data.hits;
    //     for(let i=0;i<this.PostJobc.length;i++) {
    //       console.log("Algolia Job ::::::::: =>  "+this.PostJobc[i].JobState);
    //       console.log("Algolia Job ::::::::: =>  "+this.PostJobc[i].JobTitle);
    //     }

    //   })

    this.route.queryParams.subscribe(params => {
      //console.log(params);
      this.keyword = params['keyword'];
      //console.log("Keyword " + this.keyword);
      this.location = params['location'];
      //console.log("Location " + this.location);
      this.getPostJobsAlgolia(this.keyword,this.location);

      // this.listjob.keyword = this.keyword;
      // this.listjob.location = this.location;
    })

  }

  ngOnInit() {

    window.scroll(0,0);
  }


  getPostJobsAlgolia(keyword, location) {

 /****** Need to open Later ********/
    this.noResultFound = '';
    this.client = algoliasearch(SEARCH_CONFIG.ALGOLIA_APP_ID, SEARCH_CONFIG.ALGOLIA_API_KEY,
      { protocol: SEARCH_CONFIG.PROTOCOLS });

      let filter = '', state='', city='';
      this.PostJobc = [];
      this.index = this.client.initIndex(SEARCH_CONFIG.INDEX_NAME);

      //console.log(" keyword :::: "+keyword+"location :::: "+location);
      //this.SpinnerService.show(); 
      this.loading = true;
      let locationLocal = location.trim();
      let keywordLocal = keyword.trim();
      if ((keywordLocal == "") && (locationLocal == "")) {
        //console.log("Nothing ... ");
        this.index.search({
        }).then((data) => {
          //let j=0;
          //this.PostJobcFinal = [];
          this.PostJobc = data.hits;

          //console.log("All Data");
          if (this.PostJobc.length == 0)  {
            this.notfoundAnything();
          }
          // this.SpinnerService.hide();
          this.loading = false; 
          this.setPage(1);
        });        
      } else {
        if ((keywordLocal != "") || (locationLocal != "")) {
          if (locationLocal != "") {
  
            if (isNumeric(locationLocal)) {
              //console.log("This is number");
              this.getZipCodeSearch(locationLocal,keywordLocal);
              filter = 'JobZip:'+locationLocal;
              /* Zipcode location service */
              // this.locserv.getCityState(location).subscribe((data)=>{
              //   console.log(data);
              //   city = data['city'];
              //   state = data['state'];
              //   console.log("City ::::: "+city+"   State :::::: "+state);
              // });
  
              
  
  
            } else {
  
              // Separated out state and city 
              if (locationLocal.indexOf(",") > -1) {
                state = this.isNull(locationLocal.split(",")[1].trim());
                city = this.isNull(locationLocal.split(",")[0].trim());
              } else {
                city = this.isNull(locationLocal.trim());
              }
              
            
  
              if ((state !="") && (city !="")) {

                //console.log("City state")
                this.getCityStateSearch(city, state,keywordLocal);
                //console.log("City state 1")

                //filter = 'JobCity:"'+city+'" AND JobState:"'+state+'"';
                } 
                else if ((state == "") && (city !="")) {
                  filter = 'JobCity:"'+city+'"';
                  this.executeSearchFunction(keywordLocal,filter);
                } else if ((state != "") && (city =="")){
                  filter = 'JobState:"'+state+'"';
                  this.executeSearchFunction(keywordLocal,filter);
               } else {
                //filter ='JobCity:"'+city+'" OR JobState:"'+state+'"';
                // filter ='JobCity:"'+city+'"';
                //this.executeSearchFunction(keywordLocal,filter);
                  filter ='';
                  this.executeSearchFunction(keywordLocal,filter);
              }
              // console.log("Filter :::: "+filter);
              // console.log("keyword  :::: "+keywordLocal);              
            }
          } else {
            filter ='';
            this.executeSearchFunction(keywordLocal,filter);  //Execute the search 
          }
          
 
        //console.log("Filter :::::: => "+filter);
  
          // if (filter == '') {
          //   this.index.search({
          //     query: keywordLocal
    
          //   }).then((data) => {
          //     //let j=0;
          //     //this.PostJobcFinal = [];
          //     this.PostJobc = data.hits;
          //     //console.log("No City State");
          //     //this.SpinnerService.hide(); 
          //     this.loading = false; 
          //     this.setPage(1);
          //   });
          // } else  {
    
          //   this.index.search({
          //     query: keywordLocal,
          //     filters: filter
          //   }).then((data) => {
          //     //let j=0;
          //     //this.PostJobcFinal = [];
          //     this.PostJobc = data.hits;
          //     //this.SpinnerService.hide(); 
          //     //console.log("City or State");
          //     this.loading = false; 
          //     this.setPage(1);
    
          //   });
    
          // }


        }
      }

  }

  getZipCodeSearch(zipcode,keywordLocal) {
    //let getCcZipity  = new ZipCityState();
    let getCity = SEARCH_CONFIG.GET_CITY_WITH_ZIP+zipcode;
    //console.log("Zip URL :::: "+getCity);
    //this.executeSearchFunction(keywordLocal,filter);  //Execute the search 
    this.http.get(getCity,{responseType: 'json'}).subscribe((data: any[]) => {
      // this.http.get(getCityID,{responseType: 'json',headers: headers})
      //          .map((data: any[]) => {
  
        const array = JSON.parse(JSON.stringify(data)) as any[];
        //console.log(array);

        this.getCityStateSearch(array['city'],array['state'],keywordLocal);

    });

  }

  getCityStateSearch(city, state,keywordLocal) {
    let cityD = new CityDetails();
    let check:boolean=false; 
    //console.log("this.cityModel.city");
    //let getCityID = SEARCH_CONFIG.GEODB_API_URL+"?namePrefix="+city+"&limit=5&offset=0&hateoasMode=false";
    let getCityID = SEARCH_CONFIG.GEODB_API_URL+"?namePrefix="+city+"&countryIds="+SEARCH_CONFIG.GEODB_COUNTRY_ID+"&limit=20&offset=0&hateoasMode=false";
    //console.log("this.cityModel.city  ::: "+getCityID);
    this.http.get(getCityID,{responseType: 'json',headers: this.headers}).subscribe((data: any[]) => {
    // this.http.get(getCityID,{responseType: 'json',headers: headers})
    //          .map((data: any[]) => {

      const array = JSON.parse(JSON.stringify(data)) as any[];
      //console.log(array['data']);

      for(let i=0;i<array['data'].length;i++) {
        cityD = array['data'][i];

        if ((cityD.type.toLocaleUpperCase() == 'CITY') 
            && (cityD.countryCode.toUpperCase() == 'US')
            && (cityD.regionCode.toUpperCase() == state.toUpperCase())
            && (cityD.city.toUpperCase().startsWith(city.toUpperCase()))) {

              // console.log("ID : "+cityD.id);
              // console.log("City : "+cityD.city);
              // //console.log("name : "+this.cityModel.name);
              // console.log("countryCode : "+cityD.countryCode);
              // console.log("regionCode : "+cityD.regionCode);
              check=true;

              this.getNearByCities(cityD.id,city, state,keywordLocal);
              return;
        }
      }
      if (!check)
        this.getCitySearhOnly(array,city, state,keywordLocal);
      return;

    });
    // .toPromise();

  }

  getCitySearhOnly(array,city, state,keywordLocal) {
    let filter = 'JobCity:"'+city+'"';
    this.executeSearchFunction(keywordLocal,filter)

    // let cityD = new CityDetails();
    // for(let i=0;i<array['data'].length;i++) {
    //   cityD = array['data'][i];

    //   if ((cityD.type.toLocaleUpperCase() == 'CITY') 
    //       && (cityD.countryCode.toUpperCase() == 'US')
    //       && (cityD.city.toUpperCase().startsWith(city.toUpperCase()))) {

    //         //console.log("ID : "+cityD.id);
    //         // console.log("City : "+cityD.city);
    //         // //console.log("name : "+this.cityModel.name);
    //         // console.log("countryCode : "+cityD.countryCode);
    //         // console.log("regionCode : "+cityD.regionCode);

    //         this.getNearByCities(cityD.id,city, state,keywordLocal);
    //         return;
    //   }
    // }
    // this.notfoundAnything()
  }

  notfoundAnything() {
    this.noResultFound = "No Record Found";
    this.loading = false; 

  }

  getNearByCities(cityID,city, state,keywordLocal) {
    let ncityD = new NearestCityDetails();
    //let filter = '(JobCity:"'+city+'" AND JobState:"'+state+'")';
    let filter = '((JobCity:"'+city+'")';

    //console.log("this.cityModel.city");
    //let getCityID = SEARCH_CONFIG.GEODB_API_URL+"?namePrefix="+city+"&limit=5&offset=0&hateoasMode=false";
    let getCityID = SEARCH_CONFIG.GEODB_API_URL+"/"+cityID+"/nearbyCities?radius=100&limit=20&offset=0&hateoasMode=false&countryIds="+SEARCH_CONFIG.GEODB_COUNTRY_ID;
    //console.log("this.cityModel.city  ::: "+getCityID);
    this.http.get(getCityID,{responseType: 'json',headers: this.headers}).subscribe((data: any[]) => {
      // this.http.get(getCityID,{responseType: 'json',headers: headers})
      //          .map((data: any[]) => {
  
        const array = JSON.parse(JSON.stringify(data)) as any[];
        //console.log("Nearest City ::: "+array);
        
        for(let i=0;i<array['data'].length;i++) {
          filter = filter+' OR (JobCity:"'+ncityD.city+'")';
          //filter = filter+' OR (JobCity:"'+ncityD.city+'" AND JobState:"'+ncityD.regionCode+'")';
          ncityD = array['data'][i];
          //  console.log("ID : "+ncityD.id);
          //  console.log("City : "+ncityD.city);
          //  console.log("City : "+ncityD.regionCode);
          // console.log("City : "+ncityD.distance);
        }
        filter = filter+') AND (JobState:"'+state+'")';
        //console.log("filter ::: "+filter);
        this.executeSearchFunction(keywordLocal,filter);

    });
    return;
  }

  executeSearchFunction(keywordLocal,filter) {
    //console.log("filter ::: "+filter);
    if (filter == '') {
      this.index.search({
        query: keywordLocal

      }).then((data) => {
        //let j=0;
        //this.PostJobcFinal = [];
        this.PostJobc = data.hits;
        //console.log("No City State");
        //this.SpinnerService.hide(); 
        if (this.PostJobc.length == 0)  {
          this.notfoundAnything();
        }
        this.loading = false; 

        this.setPage(1);
      });
    } else  {

      this.index.search({
        query: keywordLocal,
        filters: filter
      }).then((data) => {
        //let j=0;
        //this.PostJobcFinal = [];
        this.PostJobc = data.hits;
        //this.SpinnerService.hide(); 
        //console.log("City or State");
        if (this.PostJobc.length == 0)  {
          this.notfoundAnything();
        }
        this.loading = false; 
        this.setPage(1);

      });

    }
  }

  setPage(page: number) {
    //console.log("Page Count");
    window.scroll(0,0);
    // get pager object from service
    this.pager = this.pagerService.getPager(this.PostJobc.length, page);
    //console.log("Page Count...1  ::: "+this.PostJobc.length);
    // get current page of items
    this.pagedItems = this.PostJobc.slice(this.pager.startIndex, this.pager.endIndex + 1);
    //console.log("Page Count...1  ::: "+this.pagedItems.length);
  }

  jobDetails(jobid) {
    //console.log("Job ID::::: +",jobid);
    // console.log("Search Componenet ******* "+jobsearchComponent.keyword+" Location "+jobsearchComponent.location);
    // this.router.navigate(['/jobdetails',jobid], { queryParams: {  keyword: this.keyword, 'location': this.location}, 'queryParamsHandling': 'merge' });
    this.router.navigate(['/jobdetails',jobid], { queryParams: {  keyword: this.keyword, 'location': this.location}, 'queryParamsHandling': 'merge' });
    // this.router.navigateByUrl('/jobdetails/'+jobid, { queryParams: {  keyword: this.keyword, 'location': this.location}, 'queryParamsHandling': 'merge' });
  }


  isNull(value) {
    if (value == null) { return "" }
    else { return value }
  }

  getDateDiff(dateIput) {
    let lastModifyDate = new Date(dateIput);
    return Math.round(Math.abs(new Date().getTime() - lastModifyDate.getTime())/(24*60*60*1000));
    //return Math.round(Math.abs(new Date().getTime() - this.pjob[3].LastModifiedDate.toDate().getTime())/(24*60*60*1000);
  }


}
