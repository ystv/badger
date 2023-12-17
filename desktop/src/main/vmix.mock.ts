import { VMixState } from "./vmixTypes";

export class MockVMixConnection {
  public async getFullState(): Promise<VMixState> {
    return {
      version: "26",
      edition: "4k",
      inputs: [],
    };
  }
}
