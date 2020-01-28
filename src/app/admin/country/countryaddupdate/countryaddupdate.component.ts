import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { Country } from 'src/app/services/firebase/userprofile/country.model';
import { UserprofileService } from 'src/app/services/firebase/userprofile/userprofile.service';
import { FIREBASE_CONFIG } from 'src/app/global-config';

@Component({
  selector: 'app-countryaddupdate',
  templateUrl: './countryaddupdate.component.html',
  styleUrls: ['./countryaddupdate.component.css']
})
export class CountryaddupdateComponent implements OnInit {

  countryForm: FormGroup;
  Country: Country;
  checkCountry: boolean = false;
  isUpdate: boolean = false;
  countrySucessMessage: string = FIREBASE_CONFIG.CountryCreate;
  constructor(private dialogRef: MatDialogRef<CountryaddupdateComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any, fb: FormBuilder, private auth: AuthService, private uPRofile: UserprofileService) { 

    this.countryForm=  fb.group({
      countryID: [null, Validators.required],
      CountryName: [null, Validators.required]
    });    
    this.checkCountry = false;

    if (data.id !=undefined) {
      this.isUpdate = true;
      this.Country  = data;
      console.log("FB ID :"+data.id);
      console.log("Country ID :"+data.countryID);
      
      console.log("Country Name :"+data.CountryName);
      this.countryForm.setValue({
        countryID: data.countryID,
        CountryName: data.CountryName
      });
    } else {
      this.isUpdate = false;
    }


  }
  
  ngOnInit() {
  }  

  close() {
    this.dialogRef.close();
  }

  addUpdateCountry() {
    console.log("Country ID :"+this.countryForm.get('countryID').value);
    console.log("Country Name :"+this.countryForm.get('CountryName').value);

    this.Country = { countryID: this.countryForm.get('countryID').value,
                     CountryName: this.countryForm.get('CountryName').value,
                     CreatedBy: this.auth.userProfile.name,
                     CreateDate: new Date()

                    };
    if (this.data.id == undefined) {
      this.uPRofile.addUpdateCountry(this.Country , null);
    } else {
      this.Country.CreatedBy = this.auth.userProfile.name;
      this.Country.CreateDate = new Date();
      this.uPRofile.addUpdateCountry(this.Country , this.data.id);
    }

    this.checkCountry = true;
  }

}
