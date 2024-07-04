import AbstractJob from "./base.js";

export default class DummyTestJob extends AbstractJob {
  constructor() {
    super();
  }
  run(_: object): Promise<void> {
    return Promise.resolve(undefined);
  }
}
