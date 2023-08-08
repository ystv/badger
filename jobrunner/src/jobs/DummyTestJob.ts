import AbstractJob from "./base.js";

export default class DummyTestJob extends AbstractJob<{}> {
  constructor() {
    super();
  }
  run(params: {}): Promise<void> {
    return Promise.resolve(undefined);
  }
}
