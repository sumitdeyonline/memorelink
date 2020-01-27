import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { FileUpload } from 'src/app/services/firebase/uploadresume/FileUpload';
import { UploadResumeService } from 'src/app/services/firebase/uploadresume/upload-resume.service';
import { FIREBASE_CONFIG } from 'src/app/global-config';
import { PostJobc } from 'src/app/services/firebase/postjob/postjob.model';
import { ApplyJob } from 'src/app/services/firebase/applyjob/applyjob.model';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { ApplyjobService } from 'src/app/services/firebase/applyjob/applyjob.service';
import { UploadResume } from 'src/app/services/firebase/uploadresume/uploadresume.model';



@Component({
  selector: 'app-applyjob',
  templateUrl: './applyjob.component.html',
  styleUrls: ['./applyjob.component.css']
})
export class ApplyjobComponent implements OnInit {

  applyJobForm: FormGroup;
  selectedFiles: FileList;
  filleUploadEnabled: boolean = false;
  currentFileUpload: FileUpload;
  progress: { percentage: number } = { percentage: 0 };
  email: any;
  pjob: PostJobc;
  applyJob : ApplyJob;
  checkApplied: boolean = false;
  applySucessMessage: string = FIREBASE_CONFIG.ApplyJobSucess;
  uResume: UploadResume[];
  numberOfResume: Number = 0;
  showUpload: boolean = true;

  //email   = require("emailjs/email");


  constructor(private dialogRef: MatDialogRef<ApplyjobComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, fb: FormBuilder, private rUploadService: UploadResumeService, private auth: AuthService, private ajob: ApplyjobService)
    {
      //this.email   = require("emailjs");
      this.applyJobForm =  fb.group({
        FirstName: [null, Validators.required],
        LastName: [null, Validators.required],
        Email: [null, [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
        PhoneNumber: [null, [Validators.required, Validators.pattern('[0-9]{10}')]],
        CoverLetter:[null],
        fileUpload: [Validators.required],
        fileUploadExist: [null]
      });
      this.checkApplied = false;
      this.rUploadService.downloadURLTempResume = '';
      this.pjob = data;
      console.log("Apply To Email :::: " + this.pjob.ApplyToEmail);

      if (this.auth.isAuthenticated()) {
        this.rUploadService.getResumeDetails(this.auth.userProfile.name).subscribe(uRes=> {
          this.uResume = uRes;
          this.numberOfResume = this.uResume.length;
          if (this.numberOfResume > 0) {
            console.log("Resume Name :::: "+this.uResume[0].ResumeFileName);
            console.log("Resume URL :::: "+this.uResume[0].ResumeURL);
          }

        });

      }

    }

  ngOnInit() {
  }


  selectFile(event) {
    this.selectedFiles = event.target.files;
    if (this.validateFile(this.selectedFiles.item(0).name)) {
      this.filleUploadEnabled = true;
    } else {
      this.filleUploadEnabled = false;
    }
  }

  close() {
    this.dialogRef.close();
  }

  applyNow(){
    //console.log(this.applyJobForm);
    //console.log("Download URL :::::::: "+this.rUploadService.downloadURLTempResume);
    //console.log("First Name ::: "+this.applyJobForm.get('FirstName').value);
    let username ='anonymous';

    if (this.auth.isAuthenticated()) {
      username = this.auth.userProfile.name;
    }
    //this.applyJob = new ApplyNow[];
     //this.applyJob.FirstName = applynowform.FirstName;
     this.applyJob = { FirstName: this.applyJobForm.get('FirstName').value,
                       LastName: this.applyJobForm.get('LastName').value,
                       FromEmail: this.applyJobForm.get('Email').value,
                       ApplyToEmail: this.pjob.ApplyToEmail,
                       CCToEmail:  this.pjob.CCToEmail,
                       ApplyToURL: this.pjob.ApplyToURL,
                       PhoneNumber: this.applyJobForm.get('PhoneNumber').value,
                       CoverLetter: this.applyJobForm.get('CoverLetter').value,
                       fileUploadURL: this.rUploadService.downloadURLTempResume,
                       JobID: this.pjob.id,
                       JobTitle: this.pjob.JobTitle,
                       username : username,
                       joblocation: this.pjob.JobCity+', '+this.pjob.JobState+', '+this.pjob.JobCountry,
                       company: this.pjob.Company,
                       CreatedDate: new Date()
                     };


      //console.log("First Name "+this.applyJobForm)

      // console.log("User name ::: "+this.applyJob.username);
      // console.log("Created Date ::: "+this.applyJob.CreatedDate);
      console.log("Download URL ::: "+this.applyJob.fileUploadURL);

      this.ajob.addUpdateApplyJobs(this.applyJob);
      this.checkApplied = true;

    //var email 	= require("./path/to/emailjs/email");
  //   var server 	= this.email.server.connect({
  //     user:	"hr@macgain.com",
  //     password:"Amitava1",
  //     host:	"smtp.ionos.com",
  //     port: "465",
  //     ssl:		true
  //  });
  //  server.send({
  //   text:    "i hope this works",
  //   from:    "hr@macgain.com",
  //   to:      "sumitdeyonline@gmail.com",
  //   cc:      "hr@macgain.com",
  //   subject: "testing emailjs"
  // }, function(err, message) { console.log(err || message); });

    //this.close();
  }

  upload() {
    const file = this.selectedFiles.item(0);
    console.log("this.selectedFiles.item(0) :::::: => "+this.selectedFiles.item(0).name);
    if (this.validateFile(this.selectedFiles.item(0).name)) {
      this.filleUploadEnabled = true;
      this.currentFileUpload = new FileUpload(file);
      //let filePath =`${FIREBASE_CONFIG.TempResume}/${"Resume_"+this.currentFileUpload.file.name.replace(".","_")}`;
      //console.log("https://firebasestorage.googleapis.com/v0/b/jobsite-c8333.appspot.com/o"+filePath+"?alt=media");
      this.rUploadService.pushTempResumeStorage(this.currentFileUpload, this.progress);
      //console.log("Download URL "+this.rUploadService.downloadURLTempResume);

    } else {
      //this.isNewUpload = false;
      this.selectedFiles = undefined;
      this.filleUploadEnabled = false;
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

  onChange(event) {
    console.log("Select Value ::: "+event);
    if (event=='') {
      this.showUpload = true;
      this.rUploadService.downloadURLTempResume = '';
    } else {
      this.rUploadService.downloadURLTempResume = event;
      this.showUpload = false;
    }

  }

}
