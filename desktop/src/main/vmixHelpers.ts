import invariant from "../common/invariant";
import { getVMixConnection } from "./vmix";

export async function reconcileList(listName: string, elements: string[]) {
  const conn = getVMixConnection();
  invariant(conn, "VMix connection not initialized");
  const state = await conn.getFullState();
  const existingInput = state.inputs.find((x) => x.shortTitle === listName);
  let key;
  if (existingInput) {
    key = existingInput.key;
  } else {
    key = await conn.addInput("VideoList", "");
    await conn.renameInput(key, listName);
  }
  // TODO: Can we do this without removing and adding everything?
  //  Shortcuts unfortunately don't let us reorder, only add and remove.
  await conn.clearList(key);
  // Not done in a Promise.all() to ensure they're done in order
  for (const el of elements) {
    await conn.addInputToList(key, el);
  }
}
