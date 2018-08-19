import { Action } from "./action";
import { Store } from "./store";

export abstract class Effect {
  abstract apply(action: Action, store: Store): void;
}
