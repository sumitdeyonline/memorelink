import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { FileUpload } from 'src/app/services/firebase/uploadresume/FileUpload';

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
  selectedFiles: FileList;
  resumeUploadEnabled: boolean = false;
  currentFileUpload: File;
  csvRecords = [];
  tokenDelimeter = ",";
  isHeaderPresentFlag = true;
  validateHeaderAndRecordLengthFlag = true;
  valildateFileExtenstionFlag = true;

  
  constructor( public auth: AuthService) { }

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
    console.log("this.selectedFiles.item(0) :::::: => "+this.selectedFiles.item(0).name);
    if (this.validateFile(this.selectedFiles.item(0).name)) {
      this.selectedFiles = undefined;
      this.resumeUploadEnabled = true;

      var reader = new FileReader();
      reader.readAsText(file);
      //reader.readAsText(this.selectedFiles.item(0));


      reader.onload = (data) => {
        let csvData = reader.result;
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);
        console.log("csvRecordsArray ::: "+csvRecordsArray);
  
        var headerLength = -1;
        if(this.isHeaderPresentFlag){
          let headersRow = this.getHeaderArray(csvRecordsArray, this.tokenDelimeter);
          headerLength = headersRow.length; 
          console.log("headerLength ::: "+headerLength);
        }
        this.csvRecords = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, 
          headerLength, this.validateHeaderAndRecordLengthFlag, this.tokenDelimeter);


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
      console.log("csvRecordsArray.length   ::: "+csvRecordsArray.length);
      for (let i = 0; i < csvRecordsArray.length; i++) {
          let data = csvRecordsArray[i].split(tokenDelimeter);
          console.log("Data ::: "+data.length+" headerLength :: "+headerLength);
          
          // if(validateHeaderAndRecordLengthFlag && data.length != headerLength){
          //     if(data==""){
          //         alert("Extra blank line is present at line number "+i+", please remove it.");
          //         return null;
          //     }else{
          //         alert("Record at line number "+i+" contain "+data.length+" tokens, and is not matching with header length of :"+headerLength);
          //         return null;
          //     }
          // }

          let col = [];
          for (let j = 0; j < data.length; j++) {
              col.push(data[j]);
          }
          dataArr.push(col);
      }   
      return dataArr;
  }


  
}
