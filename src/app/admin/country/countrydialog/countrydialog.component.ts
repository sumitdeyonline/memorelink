import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserprofileService } from 'src/app/services/firebase/userprofile/userprofile.service';

@Component({
  selector: 'app-countrydialog',
  templateUrl: './countrydialog.component.html',
  styleUrls: ['./countrydialog.component.css']
})
export class CountrydialogComponent implements OnInit {
  isDeleted = false;
  constructor(private dialogRef: MatDialogRef<CountrydialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, private uPRofile: UserprofileService) { }

  ngOnInit() {  
    console.log("This Data ::::::: -> > " +this.data);
  }

  close() {
    this.dialogRef.close();
  }

  deleteRecord() {
    this.uPRofile.deleteCountry(this.data);
    this.isDeleted = true;
  }

}
