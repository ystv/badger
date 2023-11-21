"use client";

import Form from "@/components/Form";
import type {
  ContinuityItem,
  Metadata,
  MetadataField,
  Rundown,
  Show,
} from "@bowser/prisma/client";
import { createStreamsPayloadSchema } from "./schema";
import { doCreateStreams } from "./actions";
import { DeepPartial, useController } from "react-hook-form";
import {
  CheckBoxField,
  DatePickerField,
  Field,
  HiddenField,
  SelectField,
} from "@/components/FormFields";
import { ReactNode } from "react";
import { RundownItem } from "@bowser/prisma/client";
import { z } from "zod";
import { identity } from "lodash";
import { twMerge } from "tailwind-merge";

interface MetaValueWithField extends Metadata {
  field: MetadataField;
}

interface RundownWithItemsAndMeta extends Rundown {
  items: RundownItem[];
  metadata: MetaValueWithField[];
}

export interface YTStreamsShowData extends Show {
  rundowns: RundownWithItemsAndMeta[];
  continuityItems: ContinuityItem[];
  metadata: MetaValueWithField[];
}

function StreamItem(props: {
  namePrefix: string;
  name: string;
  broadcastExists?: boolean;
}) {
  const enabled = useController({
    name: props.namePrefix + ".enabled",
  });

  return (
    <div
      className={twMerge("border p-4", props.broadcastExists && "bg-green-300")}
    >
      <div className="flex flex-row">
        <CheckBoxField
          name={`${props.namePrefix}.enabled`}
          disabled={props.broadcastExists}
        />
        <h3 className="text-xl ml-2">{props.name}</h3>
      </div>
      {enabled.field.value && (
        <>
          <Field name={props.namePrefix + ".title"} label="Title" />
          <Field
            name={props.namePrefix + ".description"}
            label="Description"
            as="textarea"
          />
          <DatePickerField
            label="Scheduled Start"
            name={props.namePrefix + ".start"}
            showTimeSelect
            timeIntervals={15}
          />
          <DatePickerField
            label="Scheduled End"
            name={props.namePrefix + ".end"}
            showTimeSelect
            timeIntervals={15}
          />
          <SelectField
            name={props.namePrefix + ".visibility"}
            label="Visibility"
            options={["public", "unlisted", "private"]}
            getOptionValue={identity}
            renderOption={(v) => v[0].toLocaleUpperCase() + v.slice(1)}
            filter={false}
          />
        </>
      )}
    </div>
  );
}

export default function CreateYTStreamsForm(props: {
  show: YTStreamsShowData;
  titleFieldID?: number;
  descFieldID?: number;
}) {
  const items = [...props.show.rundowns, ...props.show.continuityItems].sort(
    (a, b) => a.order - b.order,
  );

  const itemFields: ReactNode[] = [];
  const initialValues: DeepPartial<z.infer<typeof createStreamsPayloadSchema>> =
    {
      items: [],
      resolution: "1080p",
      frameRate: "30fps",
      ingestionType: "rtmp",
      enableEmbed: true,
    };
  let time = props.show.start.getTime();
  let idx = 0;

  for (const item of items) {
    const durationSeconds =
      "durationSeconds" in item
        ? item.durationSeconds
        : item.items.map((x) => x.durationSeconds).reduce((a, b) => a + b, 0);

    let title, description;
    if (props.titleFieldID && "metadata" in item) {
      const field = item.metadata.find((x) => x.fieldId == props.titleFieldID);
      if (field) {
        title = (field.value as string) + " | " + item.name;
      }
    }
    if (!title) {
      title = item.name;
    }

    if (props.descFieldID && "metadata" in item) {
      const field = item.metadata.find((x) => x.fieldId == props.descFieldID);
      if (field) {
        description = field.value as string;
      }
    }
    if (!description) {
      description = "";
    }

    initialValues.items!.push({
      enabled: !("durationSeconds" in item) || !!item.ytBroadcastID, // it's a rundown or it already exists
      title,
      description,
      start: new Date(time),
      end: new Date(time + durationSeconds * 1000),
      visibility: "public",
      rundownID: "durationSeconds" in item ? item.id : undefined,
      continuityItemID: "durationSeconds" in item ? undefined : item.id,
    });
    itemFields.push(
      <StreamItem
        key={item.order}
        name={item.name}
        namePrefix={`items[${
          idx + 1 /* all will be shifted down one at the unshift() below */
        }]`}
        broadcastExists={!!item.ytBroadcastID}
      />,
    );
    idx++;
    time += durationSeconds;
  }

  let title, description;
  if (props.titleFieldID) {
    const field = props.show.metadata.find(
      (x) => x.fieldId == props.titleFieldID,
    );
    if (field) {
      title = field.value as string;
    }
  }
  if (!title) {
    title = props.show.name;
  }
  if (props.descFieldID) {
    const field = props.show.metadata.find(
      (x) => x.fieldId == props.descFieldID,
    );
    if (field) {
      description = field.value as string;
    }
  }
  if (!description) {
    description = "";
  }

  initialValues.items!.unshift({
    title,
    description,
    start: props.show.start,
    end: new Date(time),
    enabled: true,
    visibility: "public",
    isShowBroadcast: true,
  });
  itemFields.unshift(
    <StreamItem key={-1} name={"Main Stream"} namePrefix={`items[0]`} />,
  );

  return (
    <Form
      schema={createStreamsPayloadSchema}
      action={doCreateStreams}
      initialValues={initialValues}
    >
      <HiddenField name="show_id" value={props.show.id.toString(10)} />
      <SelectField
        name="resolution"
        label="Stream Resolution"
        options={["1080p", "720p"]}
        getOptionValue={identity}
        renderOption={identity}
        filter={false}
      />
      <SelectField
        name="frameRate"
        label="Stream Frame Rate"
        options={["30fps", "60fps"]}
        getOptionValue={identity}
        renderOption={identity}
        filter={false}
      />
      <SelectField
        name="ingestionType"
        label="Ingestion Type"
        options={["rtmp", "dash"]}
        getOptionValue={identity}
        renderOption={identity}
        filter={false}
      />
      <CheckBoxField name="enableEmbed" label="Enable embedding" />
      <div className="flex flex-col space-y-4 my-6">{itemFields}</div>
    </Form>
  );
}
