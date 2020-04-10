import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { FileUpload } from 'src/app/services/firebase/uploadresume/FileUpload';
import { UserProfile } from 'src/app/services/firebase/userprofile/userprofile.model';
import { UserDetails } from 'src/app/services/firebase/userdetails/userdetails.model';
import { UploadResume } from 'src/app/services/firebase/uploadresume/uploadresume.model';
import { Signup } from 'src/app/services/authentication/signup';
import { AUTH_CONFIG, FIREBASE_CONFIG } from 'src/app/global-config';
import { UserdetailsService } from 'src/app/services/firebase/userdetails/userdetails.service';
import { UploadResumeService } from 'src/app/services/firebase/uploadresume/upload-resume.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserprofileService } from 'src/app/services/firebase/userprofile/userprofile.service';
import 'rxjs/add/operator/map'

@Component({
  selector: 'uploadbulkprofile',
  templateUrl: './uploadbulkprofile.component.html',
  styleUrls: ['./uploadbulkprofile.component.css']
})

// export class Constants {
//   static tokenDelimeter = ",";
//   static isHeaderPresentFlag = true;
//   static validateHeaderAndRecordLengthFlag = true;
//   static valildateFileExtenstionFlag = true;
// }
export class UploadbulkprofileComponent implements OnInit {
  SucessMessage: string ='';
  CompleteMessage: string='';
  selectedFiles: FileList;
  resumeUploadEnabled: boolean = false;
  uploadToDBEnabled: boolean = false;
  //currentFileUpload: File;
  csvRecords = [];
  uProfile: UserProfile;
  //uDetails: UserDetails;
  uResume: UploadResume;
  signup = new Signup();
  tokenDelimeter = "~";
  error: any[];
  isHeaderPresentFlag = true;  // For CSV fle Header
  validateHeaderAndRecordLengthFlag = true; // For CSV fle Header
  valildateFileExtenstionFlag = true;
  signupMessage: string='';
  currentFileUpload: FileUpload;
  fUpload: FileUpload;
  progress: { percentage: number } = { percentage: 0 }; 
  bulkFile: File;
  loading: boolean = false;

  constructor( public auth: AuthService,
               private udetails: UserdetailsService,
               public rUploadService: UploadResumeService,
               private http: HttpClient,
               public uProfileservice: UserprofileService) { }

  ngOnInit() {
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
    if (this.validateFile(this.selectedFiles.item(0).name)) {
      this.resumeUploadEnabled = true;
    } else {
      this.resumeUploadEnabled = false;
    }
  }

  upload() {
    const file = this.selectedFiles.item(0);
    //console.log("this.selectedFiles.item(0) :::::: => "+this.selectedFiles.item(0).name);
    if (this.validateFile(this.selectedFiles.item(0).name)) {
      this.selectedFiles = undefined;
      this.resumeUploadEnabled = true;

      var reader = new FileReader();
      reader.readAsText(file);
      //reader.readAsText(this.selectedFiles.item(0));


      reader.onload = (data) => {
        let csvData = reader.result;
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);
        //console.log("csvRecordsArray ::: "+csvRecordsArray);
  
        var headerLength = -1;
        if(this.isHeaderPresentFlag){
          let headersRow = this.getHeaderArray(csvRecordsArray, this.tokenDelimeter);
          headerLength = headersRow.length; 
          //console.log("headerLength ::: "+headerLength);
        }
        this.csvRecords = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, 
          headerLength, this.validateHeaderAndRecordLengthFlag, this.tokenDelimeter);

          this.uploadToDBEnabled = true;
      }
      reader.onerror = function () {
        alert('Unable to read ' + file);
      };

//       this.currentFileUpload = new File(file);
// // console.log('IDDDDDDDDDDDDDDDDDDDDD ::: ', this.rUploadService.selectedUploadResume.id);
//       if (!this.isUpdate) {
//         this.rUploadService.pushFileToStorage(this.currentFileUpload, this.progress, null);
//       } else {
//         this.rUploadService.pushFileToStorage(this.currentFileUpload, this.progress, this.rUploadService.selectedUploadResume.id);
//       }

//       this.isNewUpload = true;
//       //console.log("isNewUpload   ======= > "+this.isNewUpload);
      // this.rUploadService.addUpdateUserResume(this.rUploadService.selectedUploadResume, this.rUploadService.selectedUploadResume.id);
    } else {
      this.selectedFiles = undefined;
      this.resumeUploadEnabled = false;
    }
  }


  uploadProfilesIntoDB() {
    this.loading = true;
    this.uploadToDBEnabled = false;
    for(let i=0;i<this.csvRecords.length;i++) {
      if (i>0) { // Ignore Header
        //this.uProfileData(this.csvRecords[i]);

        this.uRegistrtion(this.csvRecords[i],this.csvRecords[i][18],this.csvRecords[i][30],this.csvRecords[i][31],this.csvRecords[i][32],i);
        //this.UploadResume(this.uProfile.Username,this.csvRecords[i][31],this.csvRecords[i][32]);
      }
      // for(let j=0;j<this.csvRecords[i].length;j++) {

      //   console.log("this.csvRecords[i].length ::: "+ i +" => "+j + "Value" +this.csvRecords[i][j]);
      // }
    }
    this.loading = false;
    setTimeout(() =>{
      this.CompleteMessage = "Process has been sucessfully completed";
    }, 2000*this.csvRecords.length); 
  }

  private uRegistrtion(csvRecords,username,ResumeURL,ResumeFileName,contenttype,i) {

    let headers = new HttpHeaders({
      // 'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
      'Access-Control-Allow-Origin': "*",
      'Access-Control-Allow-Methods': 'GET',
      'Content-Type': contenttype
      // 'Accept': "application/ms-word"
    });    
    let signupSucessMessage:string = '';
    this.signup.client_id = AUTH_CONFIG.clientID;
    this.signup.connection = AUTH_CONFIG.connection;
    this.signup.response_type = AUTH_CONFIG.responseType;
    //this.signup.email = this.uDetails.userName;
    this.signup.email = username;
    this.signup.password = "Memorelink1";
    this.signup.repassword = "Memorelink1";

    //model.username = "Sumit Dey";
    this.auth.signUp(this.signup).subscribe(
      modelSignup => {
          // refresh the list
          //alert("User Addred");
          signupSucessMessage = this.signup.email+" has been Sucessfully Registered";
          //console.log(signupSucessMessage);
          //this.udetails.addUpdateUserDetailsBulk(null, username,FIREBASE_CONFIG.UserRole, this.signup.company, this.signup.companyAddress,this.signup.phone,0,ResumeURL,ResumeFileName,contenttype,csvRecords);
          this.udetails.addUpdateUserDetailsBulk(null, username,FIREBASE_CONFIG.UserRole, this.signup.company, this.signup.companyAddress,this.signup.phone,0,ResumeURL,ResumeFileName,contenttype,csvRecords);
          this.SucessMessage = username+" has been created. Recoed No : "+i;
          //return true;
      },
      error => {
        this.error = error;
        //console.log("Message 2 "+error);
        //console.log("Message 1 "+error[1].name);
        console.log("Message 2 "+error.description);
        //this.signupMessage = error; //   "This user already exists."
        this.signupMessage = "User already exists or password not satisfy minimum requrements"; //   "This user already exists."
      });

  }

  // private UploadResumeProfile(username,resumeURL,ResumeFileName,contenttype,i) {
  //   let headers = new HttpHeaders({
  //     // 'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
  //     'Access-Control-Allow-Origin': "*",
  //     'Access-Control-Allow-Methods': 'GET',
  //     'Content-Type': contenttype
  //     // 'Accept': "application/ms-word"
  //   });  
  //     let FileContains;
  //     const file = resumeURL+ResumeFileName;

  //     // this.bulkFile = new File(file,ResumeFileName);
  //     // this.currentFileUpload = new FileUpload(this.bulkFile);
  //     // this.rUploadService.pushFileToStorageBulk(username,ResumeFileName, this.currentFileUpload, this.progress, null);   


  //     this.http.get(file,{responseType: 'arraybuffer',headers: headers}).subscribe(data => {
  //       FileContains = data;
  //       let blob = new Blob([FileContains], { type: contenttype});
  //       //let blob = new Blob([FileContains], { type: "application/ms-word"});        
  //       //console.log(blob);
  //       this.bulkFile = new File([blob],ResumeFileName);

  //       this.currentFileUpload = new FileUpload(this.bulkFile);

  //       setTimeout(() =>{
  //         this.rUploadService.pushFileToStorageBulk(username,ResumeFileName, this.currentFileUpload, this.progress, null,this.uProfile);  

  //         // Need to create this in the service. 
  //         // setTimeout(() =>{ 
  //         //   this.uProfileservice.addUpdateUserProfileBulk(this.uProfile, username, new Date());
  //         //   this.SucessMessage = username+" has been created. Recoed No : "+i;            
  //         // }, 2000);

  //       }, 2000);  

  //     });
  // }



  validateFile(fileName: string) {
    let ext = fileName.substring(fileName.lastIndexOf('.')+1);
    //console.log("EXTESTION :::::::$$$&&&&&&& "+ext);
    if (ext.toLowerCase() == 'csv')  {
      return true;
    } else {
      return false;
    }

  }

  // fileReset(){
  //   this.fileImportInput.nativeElement.value = "";
  //   this.csvRecords = [];
  // }

  getHeaderArray(csvRecordsArr, tokenDelimeter) {        
    let headers = csvRecordsArr[0].split(tokenDelimeter);
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
        headerArray.push(headers[j]);
    }
    return headerArray;
  }

  validateHeaders(origHeaders, fileHeaaders) {
      if (origHeaders.length != fileHeaaders.length) {
          return false;
      }

      var fileHeaderMatchFlag = true;
      for (let j = 0; j < origHeaders.length; j++) {
          if (origHeaders[j] != fileHeaaders[j]) {
              fileHeaderMatchFlag = false;
              break;
          }
      }
      return fileHeaderMatchFlag;
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray, headerLength, 
      validateHeaderAndRecordLengthFlag, tokenDelimeter) {
      var dataArr = []
      //console.log("csvRecordsArray.length   ::: "+csvRecordsArray.length);
      for (let i = 0; i < csvRecordsArray.length; i++) {
          let data = csvRecordsArray[i].split(tokenDelimeter);
          //console.log("Data ::: "+data.length+" headerLength :: "+headerLength);
          
          if(validateHeaderAndRecordLengthFlag && data.length != headerLength){
              if(data==""){
                  alert("Extra blank line is present at line number "+i+", please remove it.");
                  return null;
              }else{
                  alert("Record at line number "+i+" contain "+data.length+" tokens, and is not matching with header length of :"+headerLength);
                  return null;
              }
          }

          let col = [];
          for (let j = 0; j < data.length; j++) {
              col.push(data[j]);
          }
          dataArr.push(col);
      }   
      return dataArr;
  }


  
}
