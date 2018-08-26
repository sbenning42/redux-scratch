import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

export interface HubProductDeatails {
  [key: string]: any;
}

export interface HubProduct {
  [key: string]: any;
  details: HubProductDeatails;
}

/*
  Generated class for the HubProductsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HubProductsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello HubProductsProvider Provider');
  }

  fetch(): Observable<HubProduct[]> {
    return this.http.get<HubProduct[]>('http://hubspectacles.zento.fr/api/v1/filter');
  }

}
