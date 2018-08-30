/**
 * 
    appMetadata: appMetadataReducer,
    appStatus: appStatusReducer,
    appError: appErrorReducer,
    userMetadata: userMetadataReducer,
    userTheme: userThemeReducer,
    userFavori: userFavoriReducer,
    appProduct: appProductReducer,
    appTheme: appThemeReducer,
 */

import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { UserMetadataActionType, UserMetadataStore, UserMetadataAuthentifySuccessAction, AppErrorSetErrorAction, UserMetadataAuthentifyRequestAction, AppStatusSetProcessLoadingAction, AppStatusSetProcessReadyAction, AppStatusActionType, AppProductActionType, AppProductFetchSuccessAction, AppThemeActionType, AppThemeFetchSuccessAction } from '../store/root/state';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError, tap, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AuthProvider } from '../providers/auth/auth';
import { ofType } from '../redux/ngrx-helpers';
import { LoadingController, Loading } from 'ionic-angular';
import { HubProductsProvider } from '../providers/hub-products/hub-products';
import { HubThemesProvider } from '../providers/hub-themes/hub-themes';

@Injectable()
export class UserMetadataEffect {
    constructor(public actions: Actions, public store: Store<any>, public auth: AuthProvider) {}

    @Effect()
    authentify$ = this.actions.pipe(
        ofType(UserMetadataActionType.authentifyRequest),
        tap(() => this.store.dispatch(new AppStatusSetProcessLoadingAction)),
        switchMap(() => this.store.select('userMetadata').pipe(take(1))),
        switchMap((userMetadata: UserMetadataStore) => this.auth.login(userMetadata.credentials).pipe(
            map((response: any) => new UserMetadataAuthentifySuccessAction(response)),
            catchError((error: Error) => of(new AppErrorSetErrorAction({
                type: UserMetadataActionType.authentifyRequest,
                error: error.name+' : '+error.message
            })))
        )),
        tap(() => this.store.dispatch(new AppStatusSetProcessReadyAction)),
    );

}

@Injectable()
export class AppStatusEffect {
    loading: Loading;
    cpt: number = 0;
    constructor(public actions: Actions, public store: Store<any>, public loadingCtrl: LoadingController) {}

    @Effect()
    loading$ = this.actions.pipe(
        ofType(AppStatusActionType.setProcessLoading),
        tap(() => {
            if (this.cpt > 0) {
                this.cpt++;
                return;
            }
            this.cpt++;
            this.loading = this.loadingCtrl.create({});
            this.loading.present();
        }),
        switchMap(() => this.actions.pipe(
            ofType(AppStatusActionType.setProcessReady),
            tap(() => {
                if (!this.cpt) return ;
                this.cpt--;
                if (this.cpt > 0) return ;
                this.loading.dismiss();
                this.loading = undefined;
            })
        )),
        switchMap(() => of())
    );

}

@Injectable()
export class AppProductEffect {
    constructor(public actions: Actions, public store: Store<any>, public hubProducts: HubProductsProvider) {}

    @Effect()
    fetch$ = this.actions.pipe(
        ofType(AppProductActionType.fetchRequest),
        tap(() => this.store.dispatch(new AppStatusSetProcessLoadingAction)),
        switchMap(() => this.hubProducts.fetch().pipe(
            map((response: any) => new AppProductFetchSuccessAction(response)),
            catchError((error: Error) => of(new AppErrorSetErrorAction({
                type: AppProductActionType.fetchRequest,
                error: error.name+' : '+error.message
            })))
        )),
        tap(() => this.store.dispatch(new AppStatusSetProcessReadyAction)),
    );

}

@Injectable()
export class AppThemeEffect {
    constructor(public actions: Actions, public store: Store<any>, public hubThemes: HubThemesProvider) {}

    @Effect()
    fetch$ = this.actions.pipe(
        ofType(AppThemeActionType.fetchRequest),
        tap(() => this.store.dispatch(new AppStatusSetProcessLoadingAction)),
        switchMap(() => this.hubThemes.fetch().pipe(
            map((response: any) => new AppThemeFetchSuccessAction(response)),
            catchError((error: Error) => of(new AppErrorSetErrorAction({
                type: AppThemeActionType.fetchRequest,
                error: error.name+' : '+error.message
            })))
        )),
        tap(() => this.store.dispatch(new AppStatusSetProcessReadyAction)),
    );

}