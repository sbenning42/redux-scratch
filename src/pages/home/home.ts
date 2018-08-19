import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StoreProvider } from '../../providers/store/store';
import { Observable, Subscription } from 'rxjs';
import { tap, merge } from 'rxjs/operators';
import { AppData, appSelector } from '../../providers/app-state/app-state';
import { AuthData, authSelector, AuthLoginAction, AuthLoginValue, AuthLogoutAction, AuthLogoutValue } from '../../providers/auth-state/auth-state';
import { LoginRequestBody } from '../../providers/auth/auth';
import { OverlayProvider } from '../../providers/overlay/overlay';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit, OnDestroy {

  appData$: Observable<AppData>;
  authData$: Observable<AuthData>;

  appData: AppData;
  authData: AuthData;

  sub: Subscription;
  error: Error;

  constructor(
    public navCtrl: NavController,
    public store: StoreProvider,
    public overlay: OverlayProvider
  ) {
    this.appData$ = this.store.select<AppData>(appSelector).pipe(
      tap((appData: AppData) => this.appDataChange(appData)),
    );
    this.authData$ = this.store.select<AuthData>(authSelector).pipe(
      tap((authData: AuthData) => this.authDataChange(authData)),
    );
  }

  ngOnInit() {
    this.sub = Observable.of(true).pipe(
      merge(this.appData$, this.authData$)
    ).subscribe();
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  appDataChange(appData: AppData) {
    console.log('New AppData in HomePage: ', appData);
    this.appData = appData;
  }

  authDataChange(authData: AuthData) {
    console.log('New AuthData in HomePage: ', authData);
    this.authData = authData;
  }

  login() {
    this.error = undefined;
    const body = new LoginRequestBody('sben@sben.sben', 'Sben42Sben');
    this.store.dispatch(new AuthLoginAction(new AuthLoginValue(body)));
  }

  logout() {
    this.error = undefined;
    this.store.dispatch(new AuthLogoutAction(new AuthLogoutValue));
  }

}
