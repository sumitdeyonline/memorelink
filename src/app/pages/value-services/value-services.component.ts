import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators, NgForm, EmailValidator, FormGroup, FormControl  } from '@angular/forms';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { ValueServices } from 'src/app/services/authentication/valueservices.model';
import { AUTH_CONFIG, FIREBASE_CONFIG } from 'src/app/global-config';
import { UserdetailsService } from 'src/app/services/firebase/userdetails/userdetails.service';
import { UserDetails } from 'src/app/services/firebase/userdetails/UserDetails.model';
import { UserprofileService } from 'src/app/services/firebase/userprofile/userprofile.service';
import { UserRole } from 'src/app/services/firebase/userprofile/userrole.model';

@Component({
  selector: 'valueservices',
  templateUrl: './value-services.component.html',
  styleUrls: ['./value-services.component.css']
})
export class ValueServicesComponent implements OnInit {

  userDetails: UserDetails[];
  ValueServices: ValueServices[];
  valueservicesForm: any;
  //valueservices = new ValueServices();
  valueservicesMessage: string='';
  valueservicesSucessMessage: string='';
  error: any[];
  email: any = '';
  postjob: boolean = false;
  resumesearch: boolean = false;
  UserRole: UserRole[];
  userActualRole: string;
  userDetailsID: string;
  companyName: string;
  companyAddress: string;

  constructor(private _auth: AuthService, fb: FormBuilder, private udetails: UserdetailsService, private uProfile: UserprofileService) {

    // this.valueservicesForm = fb.group({
    //   email: ['', Validators.required,Validators.email],
    //   password: ['', Validators.required,Validators.minLength(5)],
    //   repassword: ['',Validators.required,Validators.minLength(5)],
    //   postjob: [false],
    //   resumesearch: [false]
    // });
    window.scroll(0,0);
    this.resetForm();
    this.uProfile.getUserRoleDetails().subscribe(urole => {
      this.UserRole = urole;
      console.log("User Role :::::::: => "+this.UserRole.length);
    })

    if (this._auth.isAuthenticated()) {

      this.udetails.getUserDetails(this._auth.userProfile.name, 'U').subscribe(udtl=> {
        this.userDetails = udtl;
        console.log(" Length :::: "+this.userDetails.length);


        if (this.userDetails.length > 0) {
          this.userActualRole = this.userDetails[0].userRole;
          this.userDetailsID = this.userDetails[0].id;
          this.udetails.selectedValueServices.userRole = this.userDetails[0].userRole;
           this.udetails.selectedValueServices.company = this.userDetails[0].company;
           this.udetails.selectedValueServices.companyAddress = this.userDetails[0].companyAddress;
           this.udetails.selectedValueServices.phone = this.userDetails[0].phone;

        } else {
          this.userDetailsID = null;
        }

      })

    } else {



    }
    // this.valueservicesForm.postjob = false;
    // this.valueservicesForm.resumesearch = false;


  }


  ngOnInit() {
  }

  signUpValueServices(model: ValueServices) {
    console.log("Value Radio Burron :::: "+model.userRole);
    console.log("Company :::: "+model.company);
    console.log("Company Address:::: "+model.companyAddress);
    this.valueservicesMessage = '';
    model.client_id = AUTH_CONFIG.clientID;
    model.connection = AUTH_CONFIG.connection;
    model.response_type = AUTH_CONFIG.responseType;
    this.userActualRole = model.userRole;
    if ((model.userRole == null) || (model.userRole == undefined) || (model.userRole == '')) {
      console.log("Value NULL");
    } else {
      if (this._auth.isAuthenticated()) {
        model.email = this._auth.userProfile.name;
        // console.log("Post Job ::::: "+model.postjob);
        // console.log("Resume Search ::::: "+model.resumesearch);
        this.udetails.addUpdateUserDetails(this.userDetailsID, model.email, model.userRole, model.company, model.companyAddress, model.phone,0);
        this.valueservicesSucessMessage = model.email+" has been Sucessfully Updated."
        return true;
      } else {
        this._auth.signUp(model).subscribe(
          modelsignup => {
              // refresh the list
              //alert("User Addred");
              this.valueservicesSucessMessage = model.email+" has been Sucessfully Registered"
              console.log(this.valueservicesSucessMessage);
              //console.log("Value Radio Burron ::::===>>>>>>> "+this.userActualRole);
              this.udetails.addUpdateUserDetails(this.userDetailsID, model.email, this.userActualRole, model.company, model.companyAddress,  model.phone,0);
              //this.router.navigate(['/signupconfirm']);
              return true;
          },
          error => {
            this.error = error;
            console.log("Message 2 "+error);
            //console.log("Message 1 "+error[1].name);
            //console.log("Message 2 "+error.description);
            //this.signupMessage = error; //   "This user already exists."
            this.valueservicesSucessMessage = "User already exists or password not satisfy minimum requrements"; //   "This user already exists."
          });
      }

    }
  }

  changeRoleValue(role) {
    console.log("Role Value ::: "+role.value);
    this.udetails.selectedValueServices.userRole = role.value;
  }
    resetForm(valueservicesForm? : NgForm) {
      //this.signupError='';
      if (valueservicesForm !=null)
      valueservicesForm.reset();
      this.valueservicesMessage ='';
      this.valueservicesSucessMessage ='';

      this.udetails.selectedValueServices = {
        //id: '',
        // question: '',
        // answer: '',
        // category: '',
        // details: ''
      }

      //console.log("User Name "+SignupComponent.username+" Password "+SignupComponent.password+" Re Pass : "+SignupComponent.repassword);
      // SignupComponent.username='';
      // SignupComponent.password='';
      // SignupComponent.repassword='';
      // this.signup = new SignUp();
    }

    Fieldlength(fieldValue: string): number {
      //console.log("FIELD LENGTH .."+fieldValue);
      if (fieldValue == null) {
        return 0;
      } else {
        //console.log("FIELD LENGTH .."+fieldValue.length);
        return fieldValue.length;
      }

    }

    onFocus(event) {
      this.valueservicesMessage = '';
    }


}
