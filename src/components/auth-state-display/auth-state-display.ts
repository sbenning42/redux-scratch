import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { StoreProvider } from '../../providers/store/store';

import {
  AuthUser,
  AuthState,
  AuthLoginRequestAction
} from '../../redux/redux-scratch';

/**
 * Generated class for the AuthStateDisplayComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'auth-state-display',
  templateUrl: 'auth-state-display.html'
})
export class AuthStateDisplayComponent implements OnInit, OnDestroy {

  sub: Subscription;

  authentified: boolean = false;
  authUser: AuthUser = undefined;

  emailControl: FormControl;
  passwordControl: FormControl;
  loginGroup: FormGroup;

  constructor(public storeProvider: StoreProvider) {
    console.log('Hello AuthStateDisplayComponent Component');
    this.initForm();
  }

  private initForm() {
    this.emailControl = new FormControl('', [Validators.required]);
    this.passwordControl = new FormControl('', [Validators.required]);
    this.loginGroup = new FormGroup({
      login: this.emailControl,
      password: this.passwordControl
    });
  }

  ngOnInit() {
    this.sub = this.storeProvider.store.select('authState')
      .subscribe((authState: AuthState) => this.authStateChanged(authState));
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  authStateChanged(authState: AuthState) {
    this.authentified = authState.authentified;
    this.authUser = authState.authUser;
  }

  loginOrLogout() {
    if (this.authentified) {
      this.authUser = undefined;
      this.authentified = false;
    } else {
      this.storeProvider.store.dispatch(new AuthLoginRequestAction({
        login: this.emailControl.value,
        password: this.passwordControl.value,
      }));
    }
  }

}
