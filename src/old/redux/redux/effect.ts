import { State } from "./state";
import { Action } from "./action";
import { Observable } from "rxjs";

export abstract class Effect<T=any> {
  abstract effect(state: State<T>, action: Action, dispatcher: (s: string, a: Action) => Observable<State<T>>): Observable<State<T>>;
}
