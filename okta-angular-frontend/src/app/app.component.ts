import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { AuthState } from '@okta/okta-auth-js';
import { filter, map, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AsyncPipe, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private oktaStateService = inject(OktaAuthStateService);
  private oktaAuth = inject(OKTA_AUTH);
  private http = inject(HttpClient);

  title = 'okta-angular-quickstart';
  getApiHelloResult = '';
  getApiWhoamIResult = '';

  public isAuthenticated$ = this.oktaStateService.authState$.pipe(
    filter((s: AuthState) => !!s),
    map((s: AuthState) => s.isAuthenticated ?? false)
  );

  public async signIn(): Promise<void> {
    await this.oktaAuth.signInWithRedirect();
  }

  public async signOut(): Promise<void> {
    await this.oktaAuth.signOut();
  }

  public getApiHello() {
    this.http.get('https://localhost:7127/info/hello', { responseType: 'text' }).subscribe(result => this.getApiHelloResult = result);
  }

  public getApiWhoamI() {
    this.http.get('https://localhost:7127/info/whoami', { responseType: 'text' }).subscribe(result => this.getApiWhoamIResult = result);
  }
}
