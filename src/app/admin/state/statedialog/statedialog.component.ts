import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserprofileService } from 'src/app/services/firebase/userprofile/userprofile.service';

@Component({
  selector: 'app-statedialog',
  templateUrl: './statedialog.component.html',
  styleUrls: ['./statedialog.component.css']
})
export class StatedialogComponent implements OnInit {
  isDeleted = false;
  constructor(private dialogRef: MatDialogRef<StatedialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, private uPRofile: UserprofileService) { }

  ngOnInit() { 
    console.log("This Data ::::::: -> > " +this.data.id);
  }

  close() {
    this.dialogRef.close(); 
  }

  deleteRecord() {
    this.uPRofile.deleteState(this.data.id);
    this.isDeleted = true;
  }

}
