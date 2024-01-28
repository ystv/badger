import { CompleteShowType } from "../../common/types";
import { serverApiClient } from "./serverApiClient";
import { BehaviorSubject } from "rxjs";
import invariant from "../../common/invariant";

export const selectedShow = new BehaviorSubject<CompleteShowType | null>(null);

export async function setSelectedShow(show: CompleteShowType) {
  selectedShow.next(show);
  if (timer === null) {
    checkForChangesLoop();
  }
}

async function doCheckForChanges() {
  const v = selectedShow.value;
  if (v === null) {
    return false;
  }
  invariant(serverApiClient !== null, "serverApiClient is null");
  const newV = await serverApiClient.shows.getVersion.query({
    id: v.id,
  });
  return v.version !== newV.version;
}

let timer: NodeJS.Timeout | null = null;
async function checkForChangesLoop() {
  if (await doCheckForChanges()) {
    invariant(serverApiClient !== null, "serverApiClient is null");
    if (selectedShow) {
      const newData = await serverApiClient.shows.get.query({
        id: selectedShow.value!.id,
      });
      selectedShow.next(newData);
    }
  }
  timer = setTimeout(checkForChangesLoop, 10_000);
}
