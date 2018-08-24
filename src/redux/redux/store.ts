import { State } from "./state";
import { Reducer } from "./reducer";
import { Effect } from "./effect";
import { Action } from "./action";
import { Observable, BehaviorSubject } from "rxjs";

export class Store {

  private selectors: {[selector: string]: {state: State, reducer: Reducer, effect: Effect, subject: BehaviorSubject<State>}} = {};

  constructor() {}

  register<T=any>(selector: string, state: State<T>, reducer: Reducer<T>, effect: Effect<T>) {
    this.selectors[selector] = {state, reducer, effect, subject: new BehaviorSubject(state)};
    console.log(this.selectors[selector]);
  }

  select<T=any>(selector: string): Observable<State<T>> {
    return this.selectors[selector].subject.asObservable();
  }

  dispatch<T=any,U=any>(selector: string, action: Action<U>): Observable<State<T>> {
    let state: State<T> = <State<T>>this.selectors[selector].state.clone();
    state = this.selectors[selector].reducer.reduce(state, action);
    console.log(state.serial(), this.selectors[selector].state.serial());
    if (state.serial() !== this.selectors[selector].state.serial()) this.selectors[selector].subject.next(state);
    this.selectors[selector].state = state;
    return this.selectors[selector].effect.effect(state, action, (s: string, a: Action) => this.dispatch(s, a));
  }

}
