import { Routes } from '@angular/router';
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
  { path: 'login/callback', component: OktaCallbackComponent },
  { path: 'profile', component: ProfileComponent },
  {
    path: 'protected',
    loadChildren: () => import('./protected/routes').then(m => m.PROTECTED_FEATURE_ROUTES),
    canActivate: [OktaAuthGuard]
  }
];
