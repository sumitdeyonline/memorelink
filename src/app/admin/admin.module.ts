import { HomeComponent } from './../pages/home/home.component';
import { NgModule }  from '@angular/core';
import { CommonModule } from '@angular/common';
//import { HttpClientModule }  from '@angular/http';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { UserrolesComponent } from './userroles/userroles.component';
import { AdminGuardService } from '../services/authentication/admin-guard.service';
import { AuthService } from '../services/authentication/auth.service';
import { RouterModule } from '@angular/router';
import { UserroleassignmentComponent } from './userroleassignment/userroleassignment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserprofilesComponent } from './userprofiles/userprofiles.component';
import { PostjobvendorComponent } from './postjobvendor/postjobvendor.component';
import { CountryComponent } from './country/country.component';
import { CountryaddupdateComponent } from './country/countryaddupdate/countryaddupdate.component';
import { MatDialogModule, MatInputModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { CountrydialogComponent } from './country/countrydialog/countrydialog.component';
import { StateComponent } from './state/state.component';
import { StateaddupdateComponent } from './state/stateaddupdate/stateaddupdate.component';
import { StatedialogComponent } from './state/statedialog/statedialog.component';
import { ApplyjobAdminComponent } from './applyjob-admin/applyjob-admin.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,        
    ],
      declarations: [
      AdminhomeComponent,
      UserrolesComponent,
      UserroleassignmentComponent,
      UserprofilesComponent,
      PostjobvendorComponent,
      CountryComponent,
      CountryaddupdateComponent,
      CountrydialogComponent,
      StateComponent,
      StateaddupdateComponent,
      StatedialogComponent,
      ApplyjobAdminComponent
    ],
    entryComponents: [CountryaddupdateComponent, CountrydialogComponent, StatedialogComponent, StateaddupdateComponent],
    exports: [

    ],
    providers: [
      AdminGuardService
    ]


})

export class AdminModule {}
