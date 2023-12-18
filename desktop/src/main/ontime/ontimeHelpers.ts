import { CompleteShowType } from "../../common/types";
import { OntimeBaseEvent, OntimeEvent, OntimeFullEvent } from "./ontime";
import invariant from "../../common/invariant";
import { set } from "lodash/fp";
import type {
  CompleteRundownType,
  CompleteContinuityItemModel,
} from "@bowser/prisma/utilityTypes";

function dateToTimeMs(date: Date) {
  return (
    date.getHours() * 60 * 60 * 1000 +
    date.getMinutes() * 60 * 1000 +
    date.getSeconds() * 1000
  );
}

const vtColour = "#3E75E8";
const continuityColour = "#FF7878";

export function showToOntimeEvents(show: CompleteShowType, rundownId?: number) {
  const events: Omit<OntimeFullEvent, "id" | "revision">[] = [];
  let startTime = show.start;
  if (rundownId) {
    const rundown = show.rundowns.find((x) => x.id === rundownId);
    invariant(rundown, "Rundown not found");
    for (const item of rundown.items) {
      events.push({
        type: "event",
        title: item.name,
        timeStart: dateToTimeMs(startTime),
        duration: item.durationSeconds * 1000,
        timeEnd: dateToTimeMs(startTime) + item.durationSeconds * 1000,
        colour: item.type === "VT" ? vtColour : "",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } satisfies Partial<OntimeEvent> as any);
      startTime = new Date(startTime.getTime() + item.durationSeconds * 1000);
    }
  } else {
    const contents = [
      ...show.rundowns.map<{ _type: "rundown" } & CompleteRundownType>(
        set("_type", "rundown"),
      ),
      ...show.continuityItems.map<
        { _type: "continuity" } & CompleteContinuityItemModel
      >(set("_type", "continuity")),
    ].sort((a, b) => a.order - b.order);
    for (const container of contents) {
      if (container._type === "rundown") {
        events.push({
          type: "block",
          title: container.name,
        });
        for (const item of container.items) {
          events.push({
            type: "event",
            title: item.name,
            colour: item.type === "VT" ? vtColour : "",
            timeStart: dateToTimeMs(startTime),
            duration: item.durationSeconds * 1000,
            timeEnd: dateToTimeMs(startTime) + item.durationSeconds * 1000,
          } as OntimeBaseEvent & Partial<OntimeEvent>);
          startTime = new Date(
            startTime.getTime() + item.durationSeconds * 1000,
          );
        }
        events.push({
          type: "block",
          title: "End " + container.name,
        });
      } else {
        events.push({
          type: "event",
          title: container.name,
          colour: continuityColour,
          timeStart: dateToTimeMs(startTime),
          duration: container.durationSeconds * 1000,
          timeEnd: dateToTimeMs(startTime) + container.durationSeconds * 1000,
        } as OntimeBaseEvent & Partial<OntimeEvent>);
        startTime = new Date(
          startTime.getTime() + container.durationSeconds * 1000,
        );
      }
    }
  }
  return events;
}
