import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { OKTA_AUTH } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';

export const authInterceptor: HttpInterceptorFn = (req, next, oktaAuth = inject(OKTA_AUTH)) => {
  let request = req;
  const allowedOrigins = ['http://localhost', 'https://localhost'];
  const accessToken = oktaAuth.getAccessToken();

  if (accessToken && !!allowedOrigins.find(origin => request.url.includes(origin))) {
    request = req.clone({ setHeaders: { 'Authorization': `Bearer ${accessToken}` } })
  }

  return next(request);
};

async function getAccessToken(oktaAuth: OktaAuth): Promise<string | undefined> {
  const token = await oktaAuth.token.getWithoutPrompt({
    responseType: 'token',
    scopes: ['openid', 'profile', 'email', 'accessdemo'],
  });

  return token.tokens.accessToken?.accessToken;
}
