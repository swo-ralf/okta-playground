import { Component, inject } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';
import { filter, map } from 'rxjs';
import { AuthState } from '@okta/okta-auth-js';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [AsyncPipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  private oktaAuthStateService = inject(OktaAuthStateService);

  public name$ = this.oktaAuthStateService.authState$.pipe(
    filter((authState: AuthState) => !!authState && !!authState.isAuthenticated),
    map((authState: AuthState) => authState.idToken?.claims.name ?? '')
  );
}
