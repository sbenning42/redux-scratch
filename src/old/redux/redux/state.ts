export interface IState<T> {
  obj: T;
}
export class State<T=any> implements IState<T> {
  obj: T;
  constructor(obj: T) {
    this.obj = JSON.parse(JSON.stringify(obj));
  }
  clone(): State<T> {
    return new State<T>(this.obj);
  }
  serial(): string {
    return JSON.stringify(this.obj);
  }
}
