import { Component, OnInit } from '@angular/core';
import { UserprofileService } from 'src/app/services/firebase/userprofile/userprofile.service';
import { Country } from 'src/app/services/firebase/userprofile/country.model';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { PagerService } from 'src/app/services/common/pager.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { CountryaddupdateComponent } from './countryaddupdate/countryaddupdate.component';
import { CountrydialogComponent } from './countrydialog/countrydialog.component';

@Component({
  selector: 'country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  country: Country[];
  cntyForm
  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];  

  constructor(private uProfile:UserprofileService, private auth: AuthService, fb: FormBuilder, private pagerService: PagerService, private dialog: MatDialog) { 
    this.cntyForm = fb.group({
      CountryName: ['', Validators.required],
      countryID: ['', Validators.required]
    })
    this.getCountry();
    
  }

  ngOnInit() {
  }

  getCountry() {
    this.uProfile.getCountry().subscribe(cntry=> {
      this.country = cntry;
      this.setPage(1);
      console.log(" Length :::: "+this.country.length);
    })    
  }

  setPage(page: number) {
    console.log("Page Count");
    window.scroll(0,0);
    // get pager object from service
    if (this.country !=null) {
      this.pager = this.pagerService.getPager(this.country.length, page);
      //console.log("Page Count...1  ::: "+this.pager.length);
      // get current page of items
      this.pagedItems = this.country.slice(this.pager.startIndex, this.pager.endIndex + 1);
      //console.log("Page Count...1  ::: "+this.pagedItems.length);
    }

  }
  
  onAdd() {
    //console.log("Pst Job ID :::: "+this.pjob.ApplyToEmail);
      const dialogConfig = new MatDialogConfig();
      // dialogConfig.data = this.pjob.ApplyToEmail;
      //this.pjob.id = this.id;
      dialogConfig.data = "test";
       //dialogConfig.height = "4";
       //dialogConfig.width ="3";
      this.dialog.open(CountryaddupdateComponent, dialogConfig);
    //  dialogConfig.disableClose = false;
    //  dialogConfig.autoFocus = true;

    //this.fileNameDialogRef = this.dialog.open(DialogComponent);
    //this.fileNameDialogRef = this.dialog.open(DialogComponent, dialogConfig);
    //this.postservice.deletePostJob(pjob);
  }  

  onUpdate(country) {
    console.log("Country ID :"+country.id);
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.data = this.pjob.ApplyToEmail;
    //this.pjob.id = this.id;
    dialogConfig.data = country;
     //dialogConfig.height = "4";
     //dialogConfig.width ="3";
    this.dialog.open(CountryaddupdateComponent, dialogConfig);    
  }

  onDelete(country) {
    console.log("Country ID :"+country.id);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = country.id;
    // dialogConfig.height = "4";
    // dialogConfig.width ="3";
    this.dialog.open(CountrydialogComponent, dialogConfig);

  }  

}
