import { getLogger } from "loglevel";
import { mock, when, It, verify, reset } from "strong-mock";
import VMixConnection from "./vmix";

const logger = getLogger("vMix.mock");

const mockVmix: VMixConnection = mock<VMixConnection>();
when(() => mockVmix.host)
  .thenReturn("localhost")
  .anyTimes();
when(() => mockVmix.port)
  .thenReturn(8099)
  .anyTimes();
when(() => mockVmix.getFullState()).thenResolve({
  version: "26",
  edition: "4k",
  inputs: [],
});

globalThis.__MOCK_VMIX = (
  cb: (w: typeof when, mockVmix: VMixConnection, it: typeof It) => unknown,
) => cb(when, mockVmix, It);

globalThis.__MOCK_VMIX_RESET = () => {
  reset(mockVmix);
};

globalThis.__MOCK_VMIX_VERIFY = () => {
  verify(mockVmix);
};

declare global {
  // If you change this, also change e2e/complete/vmix.spec.ts's copy.

  /* eslint-disable no-var */
  var __MOCK_VMIX: (
    cb: (
      when: typeof import("strong-mock").when,
      vmix: VMixConnection,
      It: typeof import("strong-mock").It,
    ) => void,
  ) => void;
  var __MOCK_VMIX_RESET: () => void;
  var __MOCK_VMIX_VERIFY: () => void;
  /* eslint-enable no-var */
}

export function getMockVMix() {
  logger.debug("Using mock vMix");
  return mockVmix;
}
