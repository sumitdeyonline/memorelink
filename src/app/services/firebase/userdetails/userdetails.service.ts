import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
//import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
// import { Observable } from 'rxjs';
import { Observable } from 'rxjs/Observable';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { UserDetails } from './userdetails.model';
//import { FIREBASE_CONFIG } from '../../global-config';
import { formatDate } from '@angular/common';
//import { AuthService } from '../authentication/auth.service';

import * as algoliasearch from 'algoliasearch';

//import { Http } from '@angular/http';

import { FIREBASE_CONFIG } from 'src/app/global-config';
import { AuthService } from '../../authentication/auth.service';
import { ValueServices } from '../../authentication/valueservices.model';
import { FileUpload } from '../uploadresume/FileUpload';
import { UploadResumeService } from '../uploadresume/upload-resume.service';
import { UserProfile } from '../userprofile/userprofile.model';
@Injectable({
  providedIn: 'root'
})
export class UserdetailsService {

  selectedValueServices: ValueServices;
  selectedUserDetails: UserDetails;

  udCollection: AngularFirestoreCollection<UserDetails>;
  userDetailc: Observable<UserDetails[]>;
  udDoc: AngularFirestoreDocument<UserDetails>;


  client: any;
  index: any;
  //private headers
  // ALGOLIA_APP_ID = "8I5VGLVBT1";
  // ALGOLIA_API_KEY = "378eba06830cc91d1dad1550dd4a5244";
  //searchQuery: string ="sumitdey@yahoo.com" ;
  user = [];

  currentFileUpload: FileUpload;
  //fUpload: FileUpload;
  progress: { percentage: number } = { percentage: 0 }; 
  bulkFile: File;

  constructor(private afs : AngularFirestore, private auth: AuthService, private http: HttpClient, public rUploadService: UploadResumeService) {
    this.udCollection = this.afs.collection(FIREBASE_CONFIG.UserDetails);
     // this.udCollection = this.afs.collection<UserDetails>('userDetail');
    this.userDetailc = this.udCollection.valueChanges();
    // this.userDetail =
  }


  addUpdateUserDetails(id: string, uname: string,uRole: string, company: string, companyAddress: string, phone: string, postjobCount: number) {

    //this.userDetail = new UserDetails[];
    // let udetails : UserDetails{
    //   username = this.auth.userProfile.name,
    //   udetails.userRole = "Users",

    // };
    // console.log("User Name ::::: "+uname);
    // console.log("User Role ::::: "+uRole);
    // console.log("company ::::: "+company);
    // console.log("companyAddress ::::: "+companyAddress);
    // console.log("phone ::::: "+phone);
    if ((company == undefined) || (company == undefined)) company = '';
    if ((companyAddress == undefined) || (companyAddress == undefined)) companyAddress = '';
    if ((phone == undefined) || (phone == undefined)) phone = '';


    const  cDate = formatDate(new Date(), 'MM/dd/yyyy', 'en');
    const  udeatils: UserDetails = { userName: uname, userRole: uRole,company: company,companyAddress:companyAddress,phone:phone,createdDate: cDate, postjobCount: postjobCount };
    //console.log("UDetails  ::::: "+udeatils);
    if ((id == null) || (id == '')) {
      // const id = this.afs.createId();

      //const  uRole = "User";

      //console.log(udeatils);
      this.udCollection.add(udeatils);
      // this.adUserDetails( uname);
      // this.userDetail.CreatedDate = formatDate(new Date(), 'MM/dd/yyyy', 'en');
      // uDetails.username = uname;
      // uDetails.userRole = "User";

      // // pjobc.JobTitle =
      // // console.log ("Create Date ::: "+pjobc.CreatedDate);
      // // console.log ("Created By ::: "+pjobc.CreatedBy);
      // // console.log("NEW FORM ....Service");
      // // this.udCollection.add(udetails);
      // this.udCollection.add(uDetails);
    } else {
      //console.log("UPDATE FORM ...." + id);
      // //this.faqDoc = this.afs.doc(`faq/${faqc.id}`);
      this.udDoc = this.afs.doc(`${FIREBASE_CONFIG.UserDetails}/${id}`);
      this.udDoc.update(udeatils);
    }

  }

  addUpdateUserDetailsBulk(id: string, uname: string,uRole: string, company: string, companyAddress: string, phone: string, postjobCount: number, ResumeURL:string,ResumeFileName:string,contenttype:string,csvRecords) {



    if ((company == undefined) || (company == undefined)) company = '';
    if ((companyAddress == undefined) || (companyAddress == undefined)) companyAddress = '';
    if ((phone == undefined) || (phone == undefined)) phone = '';


    const  cDate = formatDate(new Date(), 'MM/dd/yyyy', 'en');
    const  udeatils: UserDetails = { userName: uname, userRole: uRole,company: company,companyAddress:companyAddress,phone:phone,createdDate: cDate, postjobCount: postjobCount };

      this.udCollection.add(udeatils).then(() => {
        this.UploadResumeProfileBulk(uname,ResumeURL,ResumeFileName,contenttype,csvRecords); 
      });

  }


  private UploadResumeProfileBulk(username,resumeURL,ResumeFileName,contenttype,csvRecords) {
    let headers = new HttpHeaders({
      // 'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
      'Access-Control-Allow-Origin': "*",
      'Access-Control-Allow-Methods': 'GET',
      'Content-Type': contenttype
      // 'Accept': "application/ms-word"
    });  
      let FileContains;
      const file = resumeURL+ResumeFileName;  
      let blob;
      this.http.get(file,{responseType: 'arraybuffer',headers: headers}).subscribe(data => {
      // this.http.get(file,{responseType: contenttype,headers: headers}).subscribe(data => {
        FileContains = data;
        //console.log("Content Type ::: "+contenttype);
        blob = new Blob([FileContains], { type: contenttype});        
          
        //let blob = new Blob([FileContains], { type: "application/ms-word"});        
        //console.log(blob);
        this.bulkFile = new File([blob],ResumeFileName);

        this.currentFileUpload = new FileUpload(this.bulkFile);

          this.rUploadService.pushFileToStorageBulk(username,ResumeFileName, this.currentFileUpload, this.progress, null,csvRecords);  

      });
  }



  getUserDetails(userOrRole, fieldType ) {
    // console.log("List Service ..... 3 "+userOrRole);
    // console.log("Field Type .....  "+fieldType);

    if (fieldType == 'U') {
      this.udCollection = this.afs.collection(FIREBASE_CONFIG.UserDetails, ref =>
        ref.where('userName','==',userOrRole));
    } else if (fieldType == 'R') {
      this.udCollection = this.afs.collection(FIREBASE_CONFIG.UserDetails, ref =>
        ref.where('userRole','==',userOrRole));      
    } else if (fieldType == 'A') {
      this.udCollection = this.afs.collection(FIREBASE_CONFIG.UserDetails, ref =>
        ref);       
    }
           //console.log("List Service ..... 4");
    this.userDetailc = this.udCollection.snapshotChanges().pipe(map(changes => {
      // console.log("List Service ..... 5");
      return changes.map(a => {
        // console.log("List Service ..... 6");
        const data = a.payload.doc.data() as UserDetails;
        data.id = a.payload.doc.id;
        // console.log("List Service 11111 ..... 2");
        return data;
      });
    }));

    return this.userDetailc;
  }


}
