import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { OktaAuthModule } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth.interceptor';

const oktaAuth = new OktaAuth({
  issuer: 'https://dev-79068487.okta.com/oauth2/ausmk96mj5FumvhSp5d7',
  clientId: '0oamfoqdk8FB9UOOq5d7',
  redirectUri: window.location.origin + '/login/callback',
  scopes: ['openid', 'profile', 'offline_access', 'access_demos']
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(OktaAuthModule.forRoot({ oktaAuth })),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        authInterceptor
      ])
    )
  ]
};
