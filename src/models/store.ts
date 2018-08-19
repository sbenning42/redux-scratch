import { State } from "./state";
import { Observable, BehaviorSubject } from "rxjs";
import { Reducer } from "./reducer";
import { Effect } from "./effect";
import { Action } from "./action";

export class Store {

  private streams: {[selector: string]: BehaviorSubject<State<any>>} = {};
  private reducers: {[selector: string]: Reducer<any>} = {};
  private effects: {[selector: string]: Effect} = {};
  public steps: {action: Action, serial: string}[] = [];

  constructor(private states: {[selector: string]: State<any>}) {
    this.create(this.states);
  }

  private applyToAll(states: {[selector: string]: State<any>}, projet: (selector: string) => any) {
    Object.keys(states).forEach(projet);
  }

  private create(states: {[selector: string]: State<any>}) {
    this.applyToAll(states, selector => {
      this.states[selector] = states[selector];
      this.streams[selector] = new BehaviorSubject(states[selector].data);
    });
    this.steps.push({action: undefined, serial: JSON.stringify(this.states)});
  }

  private updateSelector(selector: string, states: {[selector: string]: State<any>}) {
    this.states[selector] = states[selector].clone();
    this.streams[selector].next(this.states[selector].data);
  }

  private update(action: Action, states: {[selector: string]: State<any>}) {
    this.applyToAll(states, selector => {
      this.updateSelector(selector, states);
    });
    this.steps.push({action: undefined, serial: JSON.stringify(this.states)});
    console.log('STORE: ', this.states);
  }

  select(selector: string): Observable<any> {
    return this.streams[selector].asObservable();
  }

  combine(states: {[selector: string]: State<any>}) {
    this.applyToAll(this.states, selector => delete states[selector]);
    this.create(states);
  }

  registerReducers(reducers: {[selector: string]: Reducer<any>}) {
    Object.keys(reducers).forEach(selector => this.reducers[selector] = reducers[selector]);
  }

  registerEffects(effects: {[selector: string]: Effect}) {
    Object.keys(effects).forEach(selector => this.effects[selector] = effects[selector]);
  }

  dispatch(action: Action) {
    const reducer = this.reducers[action.selector] ? this.reducers[action.selector] : {reduce: (action, state) => state};
    const state = reducer.reduce(action, this.states[action.selector]);
    const diff = {};
    diff[action.selector] = state;
    this.update(action, diff);
    const effect = this.effects[action.selector] ? this.effects[action.selector] : {apply: (action, store) => {}};
    effect.apply(action, this);
  }

}
