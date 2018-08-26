import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, merge } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { StoreProvider } from '../../providers/store/store';

import {
  AuthUser,
  AuthState,
  HubThemesState,
  Preference,
  ThemesPreferenceSerializer,
  FavorisPreferenceSerializer,
  PreferencesState,
  PreferencesFetchRequestAction,
} from '../../redux/redux-scratch';

/**
 * Generated class for the PreferencesStateDisplayComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'preferences-state-display',
  templateUrl: 'preferences-state-display.html'
})
export class PreferencesStateDisplayComponent implements OnInit, OnDestroy {

  sub: Subscription;

  fetched: boolean = false;
  userId: id = undefined;
  collection: Preference[] = [];
  
  themeCollection: HubTheme[];
  favorisCollection: {alpha: string, item: {alpha: string, type: string, code: string, [key: string]: any}}[];
  
  themeSerializer = new ThemesPreferenceSerializer;
  favoriSerializer = new FavorisPreferenceSerializer;

  hubThemesState: HubThemesState;

  constructor(public storeProvider: StoreProvider) {
    console.log('Hello PreferencesStateDisplayComponent Component');
  }

  ngOnInit() {
    const authUser$ = this.storeProvider.store.select('authState').pipe(
      map((authState: AuthState) => authState.authUser),
      tap((authUser: AuthUser) => this.authUserChanged(authUser))
    );
    const preferences$ = this.storeProvider.store.select('preferences').pipe(
      tap((preferencesState: PreferencesState) => this.preferencesStateChanged(preferencesState)),
    );
    const hubThemes$ = this.storeProvider.store.select('hubThemes').pipe(
      tap((hubThemesState: HubThemesState) => this.hubThemesStateChanged(hubThemesState)),
    );
    this.sub = merge(authUser$, preferences$, hubThemes$).subscribe();
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  authUserChanged(authUser: AuthUser) {
    this.userId = authUser ? authUser.id : this.userId;
  }

  preferencesStateChanged(preferencesState: PreferencesState) {
    this.fetched = preferencesState.fetched;
    this.userId = preferencesState.userId;
    this.collection = preferencesState.collection.slice(0, 10);
  }

  hubThemesStateChanged(hubThemesState: HubThemesState) {
    this.hubThemesState = hubThemesState;
  }

  fetch() {
    this.storeProvider.store.dispatch(new PreferencesFetchRequestAction(this.userId));
  }

  deserialize() {
    if (!this.fetched || !(this.hubThemesState && this.hubThemesState.fetched)) return ;
    const themesPreference = this.collection.find(item => item.cle === 'userThemePreference');
    const favorisPreference = this.collection.find(item => item.cle === 'userFavori');
    this.themeCollection = this.themeSerializer.deserialize(themesPreference.valeur, this.hubThemesState.collection);
    this.favoriCollection = this.favoriSerializer.deserialize(favorisPreference.valeur);
  }

}
