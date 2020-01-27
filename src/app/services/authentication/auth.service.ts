import { Injectable } from '@angular/core';
import { AUTH_CONFIG, FIREBASE_CONFIG } from '../../global-config';
import * as auth0 from 'auth0-js';
import { Router } from '@angular/router';
//import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { SESSION_CONFIG } from './auth.config';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import {throwError as observableThrowError,  Observable, config } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotFoundError } from '../../common/exception/not-found-error';
import { BadInput } from '../../common/exception/bad-input';
import { AppError } from '../../common/exception/app-error';
import { HttpErrorResponse, HttpClient, HttpResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { UserDetails } from '../firebase/userdetails/userdetails.model';
import { UserprofileService } from '../firebase/userprofile/userprofile.service';
import { UserRole } from '../firebase/userprofile/userrole.model';

//import { UserDetails } from '../firebase/userdetails.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userProfile: any;
  pName: string;
  result: any;
  authResult: any;
  public auth0Error: string;
  private signUperror: string;
  udCollection: AngularFirestoreCollection<UserDetails>;
  userDetail: Observable<UserDetails[]>;
  userRoleCollection: AngularFirestoreCollection <UserRole>;
  userRoleProfilec: Observable<UserRole[]>;
  uDetail: UserDetails[];
  isEmployerPostJobRole: boolean = false;
  isEmployerResumeSearchRole: boolean = false;
  isAdminUserRole: boolean = false;
  UserRoled: UserRole[];

  auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.clientID,
    domain: AUTH_CONFIG.domain,
    responseType: AUTH_CONFIG.responseType,
    audience: AUTH_CONFIG.audience,
    redirectUri: AUTH_CONFIG.redirectUri,
    callbackURL: AUTH_CONFIG.callbackURL,
    scope: AUTH_CONFIG.scope,
    //audience: `https://${AUTH_CONFIG.domain}/userinfo`,
    //redirectUri: 'http://localhost:4200/callback',
  });

  constructor(private router: Router, private _http: HttpClient, private afs : AngularFirestore) {
    this.userProfile = JSON.parse(localStorage.getItem(SESSION_CONFIG.profile));
    this.udCollection = this.afs.collection(FIREBASE_CONFIG.UserDetails);
    this.userRoleCollection = this.afs.collection(FIREBASE_CONFIG.UserRoles);

    if (this.isAuthenticated()) {
      this.userRoleAssignment();
    }


  }

  public login(username, password) {

    //this.auth0.authorize();
    console.log("Login Componenet ******* 1 Username : "+username);
    //this.auth0.client.login({
    this.auth0.redirect.loginWithCredentials({
      connection: AUTH_CONFIG.connection,
      responseType: AUTH_CONFIG.responseType, // 'token'
      username: username,
      password: password,
      scope: AUTH_CONFIG.scope, //'openid profile',
    }, function(err, authResult) {
      //alert("Error: " + err.description);
      //this.setLoginError(err.description);
      console.log("authResult :::::::: -> "+authResult);
      if (authResult !== null) {
        this.authResult = authResult;
        //this.handleAuthentication();
      }
      else
        console.log("err.description :::::"+ err.description);
      if (err) alert("something went wrong: " + err);
    });
  }

  public resetPassword(username) {
    console.log("Reset Password Section .... ");
    this.auth0.changePassword({
      connection: AUTH_CONFIG.connection,
      responseType: 'token',
      email: username,
  }, function(err, authResult) {
    console.log("authResult :::::::: -> "+authResult);
    if (authResult !== null) {
      //return authResult;
      //this.authResult = ""+authResult+"";
      //console.log("authResult :::::::: -> "+""+authResult+"");
      //this.setvalue();
      alert(authResult);
      //this.handleAuthentication();
    }
    else
      console.log("err.description :::::"+ err.description);
    if (err) alert("something went wrong: " + err);
  });
  }

  private setValue() {
    //this.authResult = val;
    console.log("Val -> ");
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      //console.log("HanleAuth :::::: => Home Page");
      if (authResult && authResult.accessToken && authResult.idToken) {
        //console.log("HanleAuth :::::: => Home Page1");
        window.location.hash = '';
        this.setSession(authResult);

        /* Set profile */
        this.setProfile((err, profile) => {
          this.userProfile = profile;
          //console.log("Profile "+profile);
        });
        this.router.navigate(['']);
      } else if (err) {
        alert("Login Error " +err);
        //console.log("HanleAuth :::::: => Home Page2");
        this.router.navigate(['']);
        console.log(err);
      }
    });
  }



  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const scopes = authResult.scope || AUTH_CONFIG.scope || '';
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem(SESSION_CONFIG.accessToken, authResult.accessToken);
    console.log("Access token ::::: =>>>>>"+authResult.accessToken)
    localStorage.setItem(SESSION_CONFIG.idToken, authResult.idToken);
    localStorage.setItem(SESSION_CONFIG.expireAt, expiresAt);
    localStorage.setItem(SESSION_CONFIG.scope, JSON.stringify(scopes));
  }



  public userHasScopes(scopes: Array<string>): boolean {
    const grantedScopes = JSON.parse(localStorage.getItem(SESSION_CONFIG.scope)).split(' ');
    console.log("Scope :::: "+grantedScopes+scopes);
    return scopes.every(scope => grantedScopes.includes(scope));
  }

  public logout(): void {
    console.log("Logout....");
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem(SESSION_CONFIG.accessToken);
    localStorage.removeItem(SESSION_CONFIG.idToken);
    localStorage.removeItem(SESSION_CONFIG.expireAt);
    localStorage.removeItem(SESSION_CONFIG.profile);
    // Go back to the home route
    this.router.navigate(['/login']);
  }


  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem(SESSION_CONFIG.expireAt));
    //console.log("isAuthticated "+ expiresAt);
    return new Date().getTime() < expiresAt;
  }

  public setProfile(cb): void {
    const accessToken = localStorage.getItem(SESSION_CONFIG.accessToken);
    if (!accessToken) {
      throw new Error('Access token must exist to fetch profile');
    }

    const self = this;
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        self.userProfile = profile;
          //localStorage.setItem('profile', this.userProfile);
          localStorage.setItem(SESSION_CONFIG.profile, JSON.stringify(profile));
          console.log("Profile Name "+profile.name);
          // Check for the employer Role

          if (this.userProfile !=null) {
            this.userRoleAssignment();
            // this.UserRole().subscribe(udetail=> {
            //   this.uDetail = udetail;
            //   if (this.uDetail[0] !=null) {
            //     if (this.uDetail[0].userRole == FIREBASE_CONFIG.EmployerPostJob) {
            //       console.log("Employer Post Job :::::: ");
            //       this.isEmployerPostJobRole = true;
            //     } else if (this.uDetail[0].userRole == FIREBASE_CONFIG.EmployerResumeSearch) {
            //       console.log("Employer Resume Search :::::: ");
            //       this.isEmployerResumeSearchRole = true;
            //     } else if (this.uDetail[0].userRole == FIREBASE_CONFIG.EmployerPowerUser) {
            //       console.log("Employer Resume Search :::::: ");
            //       this.isEmployerPostJobRole = true;
            //       this.isEmployerResumeSearchRole = true;
            //     } else if (this.uDetail[0].userRole == FIREBASE_CONFIG.AdminRole) {
            //       console.log("Admin Power User:::::: ");
            //       this.isEmployerPostJobRole = true;
            //       this.isEmployerResumeSearchRole = true;
            //       this.isAdminUserRole = true;
            //     } else {
            //       console.log("User Role :::::: ");
            //       this.isEmployerPostJobRole = false;
            //       this.isEmployerResumeSearchRole = false;
            //     }
            //   }
            //   //console.log("List Service ..... 33333 ::::: "+this.pjob[1].id);
            // })
          }


          //console.log("profile "+profile.roles);
      }
      cb(err, profile);
    });
  }

  private userRoleAssignment() {
    this.UserRole().subscribe(udetail=> {
      this.uDetail = udetail;

      if (this.uDetail[0] !=null) {


        this.getUserRoleByRoles(this.uDetail[0].userRole).subscribe(urole => {
          this.UserRoled = urole;
          console.log("User Role :::::::: => "+this.UserRoled[0].RoleName);
          this.isEmployerPostJobRole =  this.UserRoled[0].isEmployerPostJobRole;
          this.isEmployerResumeSearchRole =  this.UserRoled[0].isEmployerResumeSearchRole;
          this.isAdminUserRole =  this.UserRoled[0].isAdminUserRole;


        })



        // if (this.uDetail[0].userRole == FIREBASE_CONFIG.EmployerPostJob) {
        //   console.log("Employer Post Job :::::: ");
        //   this.isEmployerPostJobRole = true;
        // } else if (this.uDetail[0].userRole == FIREBASE_CONFIG.EmployerResumeSearch) {
        //   console.log("Employer Resume Search :::::: ");
        //   this.isEmployerResumeSearchRole = true;
        // } else if (this.uDetail[0].userRole == FIREBASE_CONFIG.EmployerPowerUser) {
        //   console.log("Employer Power User :::::: ");
        //   this.isEmployerPostJobRole = true;
        //   this.isEmployerResumeSearchRole = true;
        // } else if (this.uDetail[0].userRole == FIREBASE_CONFIG.AdminRole) {
        //   console.log("Admin Power User:::::: ");
        //   this.isEmployerPostJobRole = true;
        //   this.isEmployerResumeSearchRole = true;
        //   this.isAdminUserRole = true;
        // } else {
        //   console.log("User Role :::::: ");
        //   this.isEmployerPostJobRole = false;
        //   this.isEmployerResumeSearchRole = false;
        // }
      }
      //console.log("List Service ..... 33333 ::::: "+this.pjob[1].id);
    })
  }

  public profileName() {
    this.pName = JSON.parse(localStorage.getItem(SESSION_CONFIG.profile)).name;
    return this.pName;
  }

  public isAdminRole() {
    return this.isAdminUserRole;
    // if (JSON.parse(localStorage.getItem(SESSION_CONFIG.profile)) !==null)
    // //console.log("******* IsAdmin  ******* 1 "+localStorage.getItem(SESSION_CONFIG.profile));
    // {
    //   //if (JSON.parse(localStorage.getItem(SESSION_CONFIG.profile)).roles == SESSION_CONFIG.admin)
    //   if (localStorage.getItem(SESSION_CONFIG.profile).indexOf('admin') !=null) {
    //     //console.log(localStorage.getItem(SESSION_CONFIG.profile).indexOf('admin'));
    //     if (localStorage.getItem(SESSION_CONFIG.profile).indexOf('admin') > -1)
    //       return true;
    //     else
    //       return false;
    //   }
    // }
  }

  public isPostJobRole() {
    // if (this.userProfile !=null) {
    //   this.UserRole().subscribe(udetail=> {
    //     this.uDetail = udetail;
    //     if (this.uDetail[0] !=null) {
    //       if (this.uDetail[0].userRole == "Employer") {
    //         //console.log("Employer Role :::::: ");
    //         this.isEmployeeRole = true;
    //       } else {
    //         //console.log("Not a Employer Role :::::: ");
    //         this.isEmployeeRole = false;
    //       }
    //     }
    //     //console.log("List Service ..... 33333 ::::: "+this.pjob[1].id);
    //   })
    // }
    //console.log("Employer Role ::::::: => "+this.isEmployerPostJobRole);
    return this.isEmployerPostJobRole;
  }

  public isResumeSearchRole() {
    return this.isEmployerResumeSearchRole;
  }

  UserRole() {
    //console.log("USER ROLE ::::: -> UserName ::::: "+this.userProfile.name);
    if (this.userProfile !=null) {
      this.udCollection = this.afs.collection(FIREBASE_CONFIG.UserDetails, ref =>
        ref.where('userName','==',this.userProfile.name)); //.orderBy('CreatedDate','desc'));
          //console.log("List Service ..... 4");
        this.userDetail = this.udCollection.snapshotChanges().pipe(map(changes => {
        //console.log("List Service ..... 5");
        return changes.map(a => {
        //console.log("List Service ..... 6");
          const data = a.payload.doc.data() as UserDetails;
          data.id = a.payload.doc.id;
          //console.log("List Service 11111 ..... 2");
          return data;
          });
        }));
    }
    return this.userDetail;
  }


  getUserRoleByRoles(rolename) {
    this.userRoleCollection = this.afs.collection(FIREBASE_CONFIG.UserRoles, ref =>
          ref.where('RoleName','==',rolename));
          // console.log("List Service ..... 4");
    this.userRoleProfilec = this.userRoleCollection.snapshotChanges().pipe(map(changes => {
      // console.log("List Service ..... 5");
      return changes.map(a => {
        // console.log("List Service ..... 6");
        const data = a.payload.doc.data() as UserRole;
        data.id = a.payload.doc.id;
        // console.log("List Service 11111 ..... 2");
        return data;
      });
    }));

    return this.userRoleProfilec;
  }

  signUp(signUpItems){
    //let header = new Headers({ 'Content-Type': 'application/json' });
    let header = new HttpHeaders({ 'Content-Type': 'application/json' });
    //let optionsHeader = new RequestOptions({ headers: header });
    //let optionsHeader = new HttpRequest({ headers: header });
    let optionsHeader = {  headers: header  }
    
		let body = JSON.stringify(signUpItems);
		//console.log("JSON :::: "+body);
        //let headers = new Headers();
        //headers.append('Content-Type','application/json');
		// return this._http.post(AUTH_CONFIG.sighupURL, body, optionsHeader )
    //   .map((res: Response) => res.json());
    // return this._http.post(AUTH_CONFIG.sighupURL, body, optionsHeader ).pipe(
    //   map((res: Response) => res.json(), error => this.signUperror = error));

    return this._http.post(AUTH_CONFIG.sighupURL, body, optionsHeader ).pipe(
    map(res => res, error => this.signUperror = error));
    //map((response) => response.json()))
      //   return Response.map((chamado) => new Chamado(chamado));
      // })
      // catchError(this.handleError);

    

      //.catch(response => response.json());
      //.catch(this.errorHandle);
	}

  forgotPassword(semail) {
		let header = new Headers({ 'Content-Type': 'application/json' });
		//let optionsHeader = new RequestOptions({ headers: header });

    let body:
    { client_id: 'YOUR_CLIENT_ID',
      email: 'semail',
      connection: 'Username-Password-Authentication' },
      json: true ;

      /*request(options, function (error, response, body) {
        if (error) throw new Error(error);
      return this._http.post(AUTH_CONFIG.sighupURL, body, optionsHeader ).pipe(
        map((res: Response) => res.json(), error => this.signUperror = error));

   console.log(body);*/

  }



  errorHandle(error: HttpErrorResponse) {
    console.log("ERROR : error.message "+error.ok+ "Text : "+error.error);
    return observableThrowError(error.message);
  }

  private handleError(error: Response) {
    console.log("EROORRRRRRRRRRRRRR......");
    let errorVal = { logdetails: error, logdate: (new Date).toString(), errorType: 'General', category: 'Home', createdBy: 'Sumit'  }
    console.log("errorVal  ::::: "+error);
    /*this.logservice.createLogg(errorVal)
      .map(response => response.json())
      .catch(this.handleError);
    */
      //console.log("errorVal HHHHHHH   ::::: ");
    //let service: LogService
    if (error.status === 400) {
        return observableThrowError(new BadInput(error.json()+" URL1 : "))
    }
    if (error.status === 404) {
      return observableThrowError(new NotFoundError());
    }

    return observableThrowError(new AppError(error));
  }





}
