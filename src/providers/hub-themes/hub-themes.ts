import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

export interface HubTheme {
  [key: string]: any;
}

/*
  Generated class for the HubThemesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HubThemesProvider {

  constructor(public http: HttpClient) {
    console.log('Hello HubThemesProvider Provider');
  }

  fetch(): Observable<HubTheme[]> {
    return this.http.get<HubTheme[]>('http://hubspectacles.zento.fr/api/v1/themes');
  }

}
