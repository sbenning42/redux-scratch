import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Effect, Actions } from '@ngrx/effects';

/*
  Generated class for the ClientProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ClientProvider {

  constructor(public http: HttpClient, public action: Actions) {
    console.log('Hello ClientProvider Provider');
  }

  get(url: string, opts?: any): Observable<any> {
    return this.http.get(url, opts);
  }

  post(url: string, body: any, opts?: any): Observable<any> {
    return this.http.post(url, body, opts);
  }

  put(url: string, body: any, opts?: any): Observable<any> {
    return this.http.put(url, body, opts);
  }

  delete(url: string, opts?: any): Observable<any> {
    return this.http.delete(url, opts);
  }

}
