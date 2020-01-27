import { Component, OnInit } from '@angular/core';
import { FileUpload } from 'src/app/services/firebase/uploadresume/FileUpload';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { UserprofileService } from 'src/app/services/firebase/userprofile/userprofile.service';
import { UploadResumeService } from 'src/app/services/firebase/uploadresume/upload-resume.service';
import { UploadResume } from 'src/app/services/firebase/uploadresume/uploadresume.model';

@Component({
  selector: 'uploadresume',
  templateUrl: './uploadresume.component.html',
  styleUrls: ['./uploadresume.component.css']
})
export class UploadresumeComponent implements OnInit {

  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  progress: { percentage: number } = { percentage: 0 };
  fileUploads: any[];
  uPloadFileKey: String;
  resumeUploadEnabled: boolean = false;
  isUpdate: boolean = false;
  isNewUpload: boolean = false;
  uResume: UploadResume [];



  constructor(private rUploadService: UploadResumeService, private uProfile: UserprofileService, private auth: AuthService) {

    this.rUploadService.getResumeDetails(this.auth.userProfile.name).subscribe(uprop=> {
      this.uResume = uprop;
      // this.resetForm();
      console.log("Resume Upload");
      if (this.uResume.length == 0) {
        this.isUpdate = false;
        this.isNewUpload = false;
        console.log("NEW FORM ....11111");

      } else {
        console.log("Edit FORM .... FOR "+this.uResume.length);
        //console.log('IDDDDDDDDDDDDDDDDDDDDD ::: ', this.rUploadService.selectedUploadResume.id);
        this.isUpdate = true;
        this.rUploadService.selectedUploadResume = {} as UploadResume;
        this.rUploadService.selectedUploadResume.Username = this.uResume[0].Username;
        this.rUploadService.selectedUploadResume.UserID = this.uResume[0].UserID;
        this.rUploadService.selectedUploadResume.id = this.uResume[0].id;
        this.rUploadService.selectedUploadResume.ResumeFileName = this.uResume[0].ResumeFileName;
        this.rUploadService.selectedUploadResume.ResumeURL = this.uResume[0].ResumeURL;
        this.rUploadService.selectedUploadResume.ResumeExt = this.uResume[0].ResumeExt;
        this.isNewUpload = true;

        // this.getFieldForUpdate();
      }

    })
  }

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
      this.currentFileUpload = new FileUpload(file);
// console.log('IDDDDDDDDDDDDDDDDDDDDD ::: ', this.rUploadService.selectedUploadResume.id);
      if (!this.isUpdate) {
        this.rUploadService.pushFileToStorage(this.currentFileUpload, this.progress, null);
      } else {
        this.rUploadService.pushFileToStorage(this.currentFileUpload, this.progress, this.rUploadService.selectedUploadResume.id);
      }

      this.isNewUpload = true;
      console.log("isNewUpload   ======= > "+this.isNewUpload);
      // this.rUploadService.addUpdateUserResume(this.rUploadService.selectedUploadResume, this.rUploadService.selectedUploadResume.id);
    } else {
      this.isNewUpload = false;
      this.selectedFiles = undefined;
      this.resumeUploadEnabled = false;
    }


  }

  validateFile(fileName: string) {
    let ext = fileName.substring(fileName.lastIndexOf('.')+1);
    console.log("EXTESTION :::::::$$$&&&&&&& "+ext);
    if ((ext.toLowerCase() == 'doc') || (ext.toLowerCase() == 'docx') || (ext.toLowerCase() == 'pdf') || (ext.toLowerCase() == 'ppt') || (ext.toLowerCase() == 'pptx')) {
      return true;
    } else {
      return false;
    }

  }

  deleteFileUpload(fileUpload) {
    this.rUploadService.deleteFileUpload(fileUpload);
  }



}
