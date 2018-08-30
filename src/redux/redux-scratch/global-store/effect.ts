import { LoadingController, LoadingOptions, Loading } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable, merge, of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { ofType, ofTypes } from '../../ngrx-helpers';

import {
    GlobalActionTypes,
    GlobalLoadingStartAction,
    GlobalLoadingStopAction,
    GlobalSetOnlineAction,
    GlobalSetOfflineAction,
} from './state';

/**
 * C'est ici que l'on tire partie de la puissance de Redux/RXjs.
 * 
 * Les "effets" sont le reflet de "l'intelligence métier" de l'application.
 * 
 * Un "effet" réagit aux "actions" enregistrées dans le "Store",
 * il produit des effets de bords et enregistre de nouvelles "actions".
 * 
 * Il peut par exemple éffectuer une requête Http à la demande d'une "action",
 * est enregistrer le(s) "action(s)" de succes ou d'erreurs associées.
 * 
 */

export function loadingFactory(
    actions$: Observable<Action>,
    loadingCtrl: LoadingController,
    httpClient: HttpClient
): Observable<any> {
    let isLoading: boolean = false;
    let loading: Loading;
    return merge(

        actions$.pipe(
            ofType(GlobalActionTypes.loadingStart),
            tap((action: GlobalLoadingStartAction) => {
                if (isLoading) return ;
                loading = loadingCtrl.create(action.opts);
                loading.present();
                isLoading = true;
            }),
            switchMap(() => of())
        ),

        actions$.pipe(
            ofType(GlobalActionTypes.loadingStop),
            tap((action: GlobalLoadingStopAction) => {
                if (!isLoading) return ;
                loading.dismiss();
                isLoading = true;
            }),
            switchMap(() => of())
        ),

        actions$.pipe(
            ofType(GlobalActionTypes.askOnline),
            switchMap(() => this.httpClient.get('https://google.com').pipe(
                map(() => new GlobalSetOnlineAction),
                catchError(() => of(new GlobalSetOfflineAction))
            ))
        )

    );
}