import { Router, RouterModule  } from '@angular/router';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { AdminGuardService } from '../services/authentication/admin-guard.service';
import { UserrolesComponent } from './userroles/userroles.component';
import { UserroleassignmentComponent } from './userroleassignment/userroleassignment.component';
import { UserprofilesComponent } from './userprofiles/userprofiles.component';
import { PostjobvendorComponent } from './postjobvendor/postjobvendor.component';
import { CountryComponent } from './country/country.component';
import { StateComponent } from './state/state.component';
import { ApplyjobAdminComponent } from './applyjob-admin/applyjob-admin.component';


export const adminRouting = RouterModule.forChild([
    {
        path: 'postsadminhome',
        component: AdminhomeComponent,
        canActivate: [AdminGuardService]
     },
     {
      path: 'userroles',
      component: UserrolesComponent,
      canActivate: [AdminGuardService]
    },
    {
      path: 'userroleassignment',
      component: UserroleassignmentComponent,
      canActivate: [AdminGuardService]
    },
    {
      path: 'userprofiles',
      component: UserprofilesComponent,
      canActivate: [AdminGuardService]
    },
    {
      path: 'postjobvendor',
      component: PostjobvendorComponent,
      canActivate: [AdminGuardService]
    },
    {
      path: 'country',
      component: CountryComponent,
      canActivate: [AdminGuardService]
    },
    {
      path: 'state',
      component: StateComponent,
      canActivate: [AdminGuardService]
    },
    {
      path: 'applyjobadmin',
      component: ApplyjobAdminComponent,
      canActivate: [AdminGuardService]
    }   
           
    
    
]);
