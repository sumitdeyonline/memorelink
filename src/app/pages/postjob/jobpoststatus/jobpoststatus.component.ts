import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/authentication/auth.service';
import * as algoliasearch from 'algoliasearch';

import { Router } from '@angular/router';
import { DateformatService } from '../../../services/dateformat/dateformat.service';
import { PostJobc } from 'src/app/services/firebase/postjob/postjob.model';
import { PostjobService } from 'src/app/services/firebase/postjob/postjob.service';
import { SEARCH_CONFIG } from 'src/app/global-config';
import { PagerService } from 'src/app/services/common/pager.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { DialogComponent } from '../../jobdetails/dialog/dialog.component';


@Component({
  selector: 'jobpoststatus',
  templateUrl: './jobpoststatus.component.html',
  styleUrls: ['./jobpoststatus.component.css']
})
export class JobpoststatusComponent implements OnInit {


  monthsFull = [
    'January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September',
    'October', 'November', 'December'
    ];

  months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May',
    'Jun', 'Jul', 'Aug', 'Sep',
    'Oct', 'Nov', 'Dec'
    ];

  fileNameDialogRef: MatDialogRef<DialogComponent>;

  pjob: PostJobc[];

  length: any = SEARCH_CONFIG.LIST_JOB_DESC_STATUS;
  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

  constructor(private auth: AuthService,
      private postservice: PostjobService,
      private router: Router,
      private dformat: DateformatService,
      private dialog: MatDialog,
      private pagerService: PagerService) {
        window.scroll(0,0);
      }

  ngOnInit() {
    window.scroll(0,0);
    this.postservice.getPostJobsByUser(this.auth.userProfile.name, 'U').subscribe(pjob=> {
      this.pjob = pjob;
      //console.log("Last Updated ::: "+ Math.round(Math.abs(new Date().getTime() - this.pjob[3].LastModifiedDate.toDate().getTime())/(24*60*60*1000));
      // console.log("Last Updated ::: "+ this.getDateDiff(this.pjob[3].LastModifiedDate));

      // Math.round(Math.abs(new Date().getTime() - this.pjob[0].LastModifiedDate.toDate().getTime())/(24*60*60*1000)
      this.setPage(1);
      //console.log("List Service ..... 33333 ::::: "+this.pjob[1].id);
    })
  }


  getDateDiff(dateIput) {
    return Math.round(Math.abs(new Date().getTime() - dateIput.toDate().getTime())/(24*60*60*1000));
    //return Math.round(Math.abs(new Date().getTime() - this.pjob[3].LastModifiedDate.toDate().getTime())/(24*60*60*1000);
  }
  /*monthNumToSigName(monthnum) {
    // console.log("Months :::: "+monthnum);
    // console.log("Months ::::....1 "+ this.months[monthnum - 1]);
    return this.months[monthnum - 1] || '';
  }*/

  goToDetails(id) {
    this.router.navigate(['jobdetails',id]);
  }

  setPage(page: number) {
    console.log("Page Count");
    window.scroll(0,0);
    // get pager object from service
    this.pager = this.pagerService.getPager(this.pjob.length, page);
    //console.log("Page Count...1  ::: "+this.pager.length);
    // get current page of items
    this.pagedItems = this.pjob.slice(this.pager.startIndex, this.pager.endIndex + 1);
    //console.log("Page Count...1  ::: "+this.pagedItems.length);
  }

  onDelete(pjob) {
    console.log("Pst Job ID :::: "+pjob.id);
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = pjob.id;
      // dialogConfig.height = "4";
      // dialogConfig.width ="3";
      this.dialog.open(DialogComponent, dialogConfig);
    //  dialogConfig.disableClose = false;
    //  dialogConfig.autoFocus = true;

    //this.fileNameDialogRef = this.dialog.open(DialogComponent);
    //this.fileNameDialogRef = this.dialog.open(DialogComponent, dialogConfig);
    //this.postservice.deletePostJob(pjob);
  }


}
