import { Component, OnInit, Inject } from '@angular/core';
import { UserprofileService } from 'src/app/services/firebase/userprofile/userprofile.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { State } from 'src/app/services/firebase/userprofile/state.model';
import { FIREBASE_CONFIG } from 'src/app/global-config';

@Component({
  selector: 'app-stateaddupdate',
  templateUrl: './stateaddupdate.component.html',
  styleUrls: ['./stateaddupdate.component.css']
})
export class StateaddupdateComponent implements OnInit {
  state: State;
  stateForm: FormGroup;
  checkState: boolean = false;
  isUpdate: boolean = false;
  stateSucessMessage: string = FIREBASE_CONFIG.StateCreate;
  constructor(private dialogRef: MatDialogRef<StateaddupdateComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, fb: FormBuilder, private auth: AuthService, private uPRofile: UserprofileService) { 

      console.log("Country ID(Dialog) :"+data.id); 
      this.checkState = false;
      this.stateForm=  fb.group({
        stateID: [null, Validators.required],
        stateName: [null, Validators.required]
      });        

      this.checkState = false;
       if (data.id == '') {
        this.isUpdate = false;
        console.log("Country Name :::::-->>>>"+data.CountryName);
        console.log("State ID :::::-->>>>"+data.stateID);
        console.log("State Name :::::-->>>>"+data.CountryName);

       } else {
        this.state  = data;
        console.log("Country Name :"+data.CountryName);
        this.isUpdate = true;
        this.stateForm.setValue({
          stateID: data.StateName,
          stateName: data.StateDisplayName
        });      
       }

    }

  ngOnInit() { 
  }

  addUpdateState() {
 
    let stateID = this.stateForm.get('stateID').value;
    console.log("State ID :"+stateID.toUpperCase());
    console.log("State Name :"+this.stateForm.get('stateName').value);   
    console.log("Country ID :"+this.data.CountryName); 

    this.state = { StateName: stateID,
                   StateDisplayName: this.stateForm.get('stateName').value,
                     CountryName: this.data.CountryName,
                     CreatedBy: this.auth.userProfile.name,
                     CreateDate: new Date()

                    };

    if (this.data.id == '') {
      console.log("Add ......");
      this.uPRofile.addUpdateState(this.state,this.data.id)

    } else {
      this.state.CreatedBy = this.auth.userProfile.name;
      this.state.CreateDate = new Date();
      this.uPRofile.addUpdateState(this.state , this.data.id);
    }
      this.checkState = true;

  }

  close() {
    this.dialogRef.close();
  }

}
