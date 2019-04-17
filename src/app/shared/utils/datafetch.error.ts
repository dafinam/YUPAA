export default class DataFetchError extends Error {
  constructor(m: string) {
    super(m);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, DataFetchError.prototype);
  }
}
