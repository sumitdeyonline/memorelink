import { Component, OnInit } from '@angular/core';
import { UserprofileService } from 'src/app/services/firebase/userprofile/userprofile.service';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { PagerService } from 'src/app/services/common/pager.service';
import { SEARCH_CONFIG } from 'src/app/global-config';
import { Country } from 'src/app/services/firebase/userprofile/country.model';
import { State } from 'src/app/services/firebase/userprofile/state.model';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { StateaddupdateComponent } from './stateaddupdate/stateaddupdate.component';
import { StatedialogComponent } from './statedialog/statedialog.component';

@Component({
  selector: 'state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {

  country: Country[];
  state: State[];
  stform;
  isDisplay: boolean = false;
  isAdd: boolean = false;
  countryToPass: string;

  length: any = SEARCH_CONFIG.LIST_JOB_DESC_WIDTH;

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

  constructor(private uProfile: UserprofileService, private auth: AuthService, fb: FormBuilder, private pagerService: PagerService, private dialog: MatDialog) {
    this.stform = fb.group({
      country: ['', Validators.required]
    })

    this.getCountry();

  }

  ngOnInit() {
  }

  getCountry() {
    this.uProfile.getCountry().subscribe(cntry => {
      this.country = cntry;
      console.log("Country => "+this.country.length);
    });
  }

  getState(country) {
    console.log("Get Country ::::: "+country);
    this.countryToPass = country;
    if (country =="") {
      this.isAdd = false;
      this.isDisplay = false;
      this.state = [];
    } else {
      this.uProfile.getStateDetails(country).subscribe(sprop => {
        this.state = sprop;
        console.log("State :::::::: => "+this.state.length);
        if (this.state.length > 0) {
          this.isDisplay = true;
          this.setPage(1);
        } else {
          this.isDisplay = false;
          this.state = [];
        }
        this.isAdd = true;
      })
    }

  }

  onAdd() {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.data = this.pjob.ApplyToEmail;
    //this.pjob.id = this.id;
    this.state[0] = {id:'',CountryName:this.countryToPass,StateName:'',StateDisplayName:''};
    //console.log("DATAAAAAAA ::: "+this.state[0].CountryName);
    //this.state[0].id = "";
    //this.state[0].CountryName = this.countryToPass;
    dialogConfig.data = this.state[0];
    //dialogConfig.data = this.countryToPass;
     //dialogConfig.height = "4";
     //dialogConfig.width ="3";
    this.dialog.open(StateaddupdateComponent, dialogConfig);
  }

  onUpdate(state) {
    console.log("Country ID :"+state.id);
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.data = this.pjob.ApplyToEmail;
    //this.pjob.id = this.id;
    dialogConfig.data = state;
     //dialogConfig.height = "4";
     //dialogConfig.width ="3";
    this.dialog.open(StateaddupdateComponent, dialogConfig);
  }

  onDelete(state) {
    console.log("Country ID :"+state.id);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = state;
    // dialogConfig.height = "4";
    // dialogConfig.width ="3";
    this.dialog.open(StatedialogComponent, dialogConfig);

  }  

  setPage(page: number) {
    console.log("Page Count");
    window.scroll(0,0);
    // get pager object from service
    this.pager = this.pagerService.getPager(this.state.length, page);
    //console.log("Page Count...1  ::: "+this.pager.length);
    // get current page of items
    this.pagedItems = this.state.slice(this.pager.startIndex, this.pager.endIndex + 1);
    //console.log("Page Count...1  ::: "+this.pagedItems.length);
  }



}
