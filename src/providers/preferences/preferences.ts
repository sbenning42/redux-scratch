import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

export interface Preference {
  cle: string;
  valeur: string;
}

/*
  Generated class for the PreferencesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PreferencesProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PreferencesProvider Provider');
  }

  fetch(steamuloUserId: string): Observable<Preference[]> {
    return this.http.get<Preference[]>(
      `http://www.recette.spectacles.carrefour.fr/api/internautes/${steamuloUserId}/preferences`,
      {withCredentials: true}
    );
  }

  update(steamuloUserId: string, preference: Preference): Observable<Preference[]> {
    return this.http.post<Preference[]>(
      `http://www.recette.spectacles.carrefour.fr/api/internautes/${steamuloUserId}/preferences`,
      preference,
      {withCredentials: true}
    );
  }

}
