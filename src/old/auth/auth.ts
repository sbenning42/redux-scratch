import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, tap, switchMap } from '../../../node_modules/rxjs/operators';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

export class LoginRequestBody {
  constructor(public login: string, public password: string) {}
}

export class LoginResponseBody {
  constructor(public token: string) {}
}

@Injectable()
export class AuthProvider {

  loginEp = 'http://api.api/v1/login';

  constructor(public http: HttpClient) {
    console.log('Hello AuthProvider Provider');
  }

  login(body: LoginRequestBody): Observable<LoginResponseBody> {
    const token = `abc123-${body.login}-z9`;
    return Observable.of<LoginResponseBody>({token}).pipe(
      delay(1000),
      switchMap(() => { throw new Error('Sample network error'); })
    );
  }

  logout(): Observable<boolean> {
    return Observable.of<boolean>(true).pipe(
      delay(1000)
    );
  }

}
