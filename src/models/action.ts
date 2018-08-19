export abstract class Action {
  public abstract value: any;
  constructor(public selector: string, public type: string) {}
}
