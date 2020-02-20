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
//import { SnotifyService } from 'ng-snotify';
import './../../../../assets/js/smtp.js'; 
import { EmailService } from 'src/app/services/email/email.service.js';
//import './smtp.js'; 
//declare let Email: any;
//var Email = { send: function (a) { return new Promise(function (n, e) { a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send"; var t = JSON.stringify(a); Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) { n(e) }) }) }, ajaxPost: function (e, n, t) { var a = Email.createCORSRequest("POST", e); a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.onload = function () { var e = a.responseText; null != t && t(e) }, a.send(n) }, ajax: function (e, n) { var t = Email.createCORSRequest("GET", e); t.onload = function () { var e = t.responseText; null != n && n(e) }, t.send() }, createCORSRequest: function (e, n) { var t = new XMLHttpRequest; return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof (XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t } };

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
    @Inject(MAT_DIALOG_DATA) public data: any, fb: FormBuilder, private rUploadService: UploadResumeService, 
    private auth: AuthService, private ajob: ApplyjobService, private sEmail: EmailService )
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

  /* Email Start */
  let subject = 'Your job has been applyed('+this.pjob.JobTitle+')';
  let body = '<i>Your job has been applied</i> <br/> <b>Job Title: '+this.pjob.JobTitle+' </b> <br /> <b>joblocation: </b>'+this.pjob.JobCity+', '+this.pjob.JobState+', '+this.pjob.JobCountry+'<br /> <b>Job Description : </b>'+this.pjob.JobDesc+' <br />  <br><br> <b>MemoreLink Team</b>'
  this.sEmail.sendEmail(this.applyJobForm.get('Email').value,'',subject,body);
  
  let vJobSublect =this.applyJobForm.get('FirstName').value+' '+this.applyJobForm.get('LastName').value+' has applied the job('+this.pjob.JobTitle+')';
  let vBody ='<i>'+this.applyJobForm.get('FirstName').value+' '+this.applyJobForm.get('LastName').value+ ' has applied this job</i> <br/> <b>Candidate Email: '+this.applyJobForm.get('Email').value+' </b> <br /><br/> <b>Candidate Phone: '+this.applyJobForm.get('PhoneNumber').value+' </b> <br /> <b>Job Title: '+this.pjob.JobTitle+' </b> <br /> <b>joblocation: </b>'+this.pjob.JobCity+', '+this.pjob.JobState+', '+this.pjob.JobCountry+'<br /> <b>Job Description : </b>'+this.pjob.JobDesc+' <br />  <br><br> <b>MemoreLink Team</b>'
  this.sEmail.sendEmail(this.pjob.ApplyToEmail,'',vJobSublect,vBody);

  // Email.send({
  //   // Host : 'smtp.elasticemail.com',
  //   // Port: '2525',
  //   // Username : 'memorelink@macgain.com',
  //   // Password : '2ACCB1CEA84561661BE07F7DE0C25521EC06',
  //   // To : 'sumitdeyonline@gmail.com',
  //   // From : 'hr@macgain.com',

  //   SecureToken : "f28066c5-23af-4d78-bea7-79ef61fe32a5",
    
  //   //Host : 'smtp.ionos.com',
  //   //Port: '2525',
  //   //Username : 'memorelink@macgain.com',
  //   //Password : 'XXXXXXXXXX',
  //   To : 'sumitdeyonline@gmail.com',
  //   From : 'memorelink@macgain.com',


  //   Subject : 'This is a test email subject',
  //   Body : `
  //   <i>This is sent as a feedback from my resume page.</i> <br/> <b>Name: </b> <br /> <b>Email: </b><br /> <b>Subject: </b><br /> <b>Message:</b> <br />  <br><br> <b>~End of Message.~</b> `
  //   }).then( message => {alert(message); } );

  /* Email End */


    //var email 	= require("../../../../../node_modules/emailjs/email");
  //   var email   = require('emailjs/email');
  //   var server 	= email.server.connect({
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

  //   this.close();


  // const nodeMailer = require("nodemailer");
  // let transporter = nodeMailer.createTransport({
  //   host: 'smtp.gmail.com',
  //   port: 465,
  //   secure: true,
  //   auth: {
  //       user: 'xxx@xx.com', //replace it with your gmail username
  //       pass: 'xxxx'        //replace it with your gmail password
  //   }
  // });

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
