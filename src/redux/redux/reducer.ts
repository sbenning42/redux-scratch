import { State } from "./state";
import { Action } from "./action";

export abstract class Reducer<T=any> {
  abstract reduce(state: State<T>, action: Action): State<T>;
}
