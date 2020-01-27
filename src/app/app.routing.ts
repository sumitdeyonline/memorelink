
import { Router, RouterModule  }     from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotfoundComponent } from './common/notfound/notfound.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { PostjobComponent } from './pages/postjob/postjob.component';
import { AuthGuardService as AuthGuard, AuthGuardService } from './services/authentication/auth-guard.service';
import { ScopeGuardService as ScopeGuard } from './services/authentication/scope-guard.service';
import { ListjobComponent } from './pages/listjob/listjob.component';
import { JobpoststatusComponent } from './pages/postjob/jobpoststatus/jobpoststatus.component';
import { JobdetailsComponent } from './pages/jobdetails/jobdetails.component';
import { UserProfileComponent } from './pages/userprofile/userprofile.component';
import { ResumesearchComponent } from './pages/resumesearch/resumesearch.component';
import { ResumedetailsComponent } from './pages/resumesearch/resumedetails/resumedetails.component';
import { TechNewsDetailsComponent } from './pages/tech-news/tech-news-details/tech-news-details.component';
import { ResetpasswordComponent } from './pages/login/resetpassword/resetpassword.component';
import { AboutComponent } from './pages/about/about.component';
import { RecruitersSolutionComponent } from './pages/recruiters-solution/recruiters-solution.component';
import { RecruitersFollowingComponent } from './pages/recruiters-following/recruiters-following.component';
import { ResumeServiceComponent } from './pages/resume-service/resume-service.component';
import { SalaryPredictorComponent } from './pages/salary-predictor/salary-predictor.component';
import { ValueServicesComponent } from './pages/value-services/value-services.component';

export const routing = RouterModule.forRoot([



    {
        path: 'login',
        component: LoginComponent
    },
    /*{
        path: 'postjob',
        component: PostjobComponent,
        canActivate: [AuthGuard]
    },  */

    {
        path: 'postjob',
        component: PostjobComponent,
        canActivate: [ScopeGuard] ,
        data: { expectedScopes: ['write:messages']}

    },
    {
        path: 'postjob/:id',
        component: PostjobComponent,
        canActivate: [ScopeGuard] ,
        data: { expectedScopes: ['write:messages']}

    },
    {
        path: 'jobpoststatus',
        component: JobpoststatusComponent,
        canActivate: [ScopeGuard] ,
        data: { expectedScopes: ['write:messages']}
    },
    {
        path: 'resumesearch',
        component: ResumesearchComponent,
        canActivate: [ScopeGuard] ,
        data: { expectedScopes: ['write:messages']}
    },
    {
        path: 'resumedetails/:id',
        component: ResumedetailsComponent,
        canActivate: [ScopeGuard] ,
        data: { expectedScopes: ['write:messages']}
    },
    {
        path: 'recruiterssolution',
        component: RecruitersSolutionComponent,
        canActivate: [ScopeGuard] ,
        data: { expectedScopes: ['write:messages']}
    },   
    {
        path: 'recruitersfollowing',
        component: RecruitersFollowingComponent,
        canActivate: [ScopeGuard] ,
        data: { expectedScopes: ['write:messages']}
    },     
    {
        path: 'userprofile',
        component: UserProfileComponent,
        canActivate: [AuthGuardService]
    },    
    {
        path: 'jobdetails/:id',
        component: JobdetailsComponent
        // canActivate: [ScopeGuard] ,
        // data: { expectedScopes: ['write:messages']}
      },
      {
        path: 'technewsdetails/:id',
        component: TechNewsDetailsComponent
      },
      {
          path: 'listjob',
          component: ListjobComponent
      },
      {
        path: 'resetpassword',
        component: ResetpasswordComponent
      },
      {
          path: 'signup',
          component: SignupComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'resumeservice',
        component: ResumeServiceComponent
      },
      {
        path: 'salarypredictor',
        component: SalaryPredictorComponent
      }, 
      {
        path: 'valueservices',
        component: ValueServicesComponent
      },       
                 
      {
          path: '',
          component: HomeComponent
      },
      {
          path: '**',
          component: NotfoundComponent
      }


]);
