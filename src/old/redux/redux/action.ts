export class Action<U=any> {
  constructor(
    public type: string,
    public value?: U
  ) {}
}
