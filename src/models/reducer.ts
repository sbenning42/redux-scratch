import { Action } from "./action";

export abstract class Reducer<State> {
  abstract reduce(action: Action, state: State): State;
}
