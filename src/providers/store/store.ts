import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

/*
  Generated class for the StoreProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

export class State {
  [key: string]: any;
}

@Injectable()
export class StoreProvider {

  private state: State = new State;
  private subjects: {[selectors: string]: BehaviorSubject<State>} = {};

  constructor() {
    console.log('Hello StoreProvider Provider');
  }

  private selectSubject(selector: string): BehaviorSubject<State> {
    const selectors = selector.split('/');
    let state = this.state;
    selectors.forEach(s => state = state?state[s]:undefined);
    if (state) {
      this.subjects[selector] = this.subjects[selector]
        ? this.subjects[selector]
        : new BehaviorSubject(state);
    }
    return this.subjects[selector];
  }

  private selectObservable(selector: string) {
    const subject = this.selectSubject(selector);
    return subject ? subject.asObservable() : undefined;
  }

  private notify(selector: string, state: State) {
    if (!this.subjects[selector]) {
      this.subjects[selector] = new BehaviorSubject(state);
    } else {
      this.subjects[selector].next(state);
    }
  }

  private _register(selectors: string[], toState: State, state: State) {
    const selector = selectors.shift();
    toState = toState?toState:{[selector]: {}};
    if (selectors.length === 0) {
      toState[selector] = state;
    } else {
      this._register(selectors, toState[selector], state);
    }
  }

  register(selector: string, state: State) {
    const selectors = selector.split('/');
    this._register(selectors, this.state, state);
    this.subjects[selector] = this.subjects[selector]
      ? this.subjects[selector]
      : new BehaviorSubject(state);
  }

  select(selector: string) {
    const stream$ = this.selectObservable(selector);
    return stream$ ? stream$.pipe(
      distinctUntilChanged()
    ) : undefined;
  }


  test() {
    const appSelector = 'app';
    const envSelector = 'app/env';
    const authSelector = 'app/auth';
    const authUserSelector = 'app/auth/user';
    this.register(appSelector, <State>{
      title: 'Test Reduxed App',
      version: '1.0.0',
      online: false,
    });
    this.register(envSelector, <State>{
      test: true,
      dev: true,
      prod: false,
      firstVisit: true
    });
    this.register(authSelector, <State>{
      authentified: false,
      roles: undefined,
      token: undefined
    });
    this.register(authUserSelector, <State>{
      id: undefined,
      email: undefined,
      password: undefined,
      name: undefined,
      avatar: undefined,
    });
    const state$ = this.select('app');
    state$.subscribe(console.log);
  }

}
