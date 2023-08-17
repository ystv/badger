import AbstractJob from "./base.js";

export default class DummyTestJob extends AbstractJob<object> {
  constructor() {
    super();
  }
  run(_: object): Promise<void> {
    return Promise.resolve(undefined);
  }
}
