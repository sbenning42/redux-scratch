/**
 * Basic immutable class
 */
export abstract class State<T> {

  constructor(public data: T) { }

  serial(data: T): string {
    return JSON.stringify(data);
  }
  parse(serial: string): T {
    return JSON.parse(serial);
  }
  clone(): State<T> {
    const serial = this.serial(this.data);
    const clone = Object.create(Object.getPrototypeOf(this));
    clone.data = this.parse(serial);
    return clone;
  }

}
