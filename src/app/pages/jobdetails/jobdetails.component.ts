import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostJobc } from 'src/app/services/firebase/postjob/postjob.model';
import { PostjobService } from 'src/app/services/firebase/postjob/postjob.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { ApplyjobComponent } from './applyjob/applyjob.component';
//import { PostJobc } from '../../services/firebase/postjob.model';
//import { PostjobService } from '../../services/firebase/postjob.service';

@Component({
  selector: 'jobdetails',
  templateUrl: './jobdetails.component.html',
  styleUrls: ['./jobdetails.component.css']
})
export class JobdetailsComponent implements OnInit {

  id: any;
  public pjob: PostJobc;
  keyword: string;
  location: string;
  //fileNameDialogRef: MatDialogRef<ApplyjobComponent>;

  constructor(private router: Router,private _activeRoute:ActivatedRoute, private postservice: PostjobService, private dialog: MatDialog) {
    window.scroll(0,0);
    this._activeRoute.queryParams.subscribe(params => {
      console.log(params);
      this.keyword = params['keyword'];
      console.log("Keyword " + this.keyword);
      this.location = params['location'];
      console.log("Location " + this.location);
      //this.getPostJobsAlgolia(this.keyword,this.location);
      // this.listjob.keyword = this.keyword;
      // this.listjob.location = this.location;
    })

  }

  ngOnInit() {

    this._activeRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      console.log("Key Value :::::::: "+this.id);
    });
    this.postservice.getPostJobsById(this.id).subscribe(pjob=> {
      this.pjob = pjob;
      console.log("List Service ..... 33333 ::::: "+this.pjob.JobTitle);
    })

  }

  jobList() {
     //console.log("Search Componenet ******* "+jobsearchComponent.keyword+" Location "+jobsearchComponent.location);
    // this.router.navigate(['/jobdetails',jobid], { queryParams: {  keyword: this.keyword, 'location': this.location}, 'queryParamsHandling': 'merge' });
     this.router.navigate(['/listjob'], { queryParams: {  keyword: this.keyword, 'location': this.location}, 'queryParamsHandling': 'merge' });
  }

  onApply() {
    console.log("Pst Job ID :::: "+this.pjob.ApplyToEmail);
      const dialogConfig = new MatDialogConfig();
      // dialogConfig.data = this.pjob.ApplyToEmail;
      this.pjob.id = this.id;
      dialogConfig.data = this.pjob;
       dialogConfig.height = "4";
       dialogConfig.width ="3";
      this.dialog.open(ApplyjobComponent, dialogConfig);
    //  dialogConfig.disableClose = false;
    //  dialogConfig.autoFocus = true;

    //this.fileNameDialogRef = this.dialog.open(DialogComponent);
    //this.fileNameDialogRef = this.dialog.open(DialogComponent, dialogConfig);
    //this.postservice.deletePostJob(pjob);
  }

}
