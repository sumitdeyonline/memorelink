import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { PostjobService } from 'src/app/services/firebase/postjob/postjob.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  description:string;
  isDeleted: boolean = false;

  constructor(private dialogRef: MatDialogRef<DialogComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any,
              private postservice: PostjobService) { 

    }

  ngOnInit() {
    console.log("This Data ::::::: -> > " +this.data);
  }

  close() {
    this.dialogRef.close();
  }

  deleteRecord() {
    this.postservice.deletePostJobWithID(this.data);
    this.isDeleted = true;
  }
}
