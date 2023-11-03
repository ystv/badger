"use client";

import invariant from "@/lib/invariant";
import Button from "@bowser/components/button";
import { Input } from "@bowser/components/input";
import { Textarea } from "@bowser/components/textarea";
import { Prisma } from "@bowser/prisma/client";
import { Metadata, MetadataField } from "@bowser/prisma/client";
import { useId, useMemo, useState, useTransition } from "react";
import { FormResponse } from "./Form";
import { IoCheckmarkSharp, IoCloseSharp } from "react-icons/io5";

export interface MetadataWithField extends Metadata {
  field: MetadataField;
}

function MetaValue(props: {
  field: MetadataField;
  value: Metadata | null;
  saveChanges: (val: Prisma.InputJsonValue) => Promise<FormResponse>;
}) {
  switch (props.field.type) {
    case "Text":
    case "LongText":
    case "URL":
      if (props.value) {
        invariant(
          typeof props.value.value === "string",
          `${props.value.value} is not a string`,
        );
      }
      break;
    default:
      invariant(
        false,
        // @ts-expect-error if the type of `type` is ever not `never` we've forgotten a case in the switch
        `Unknown metadata field type ${props.field.type.slice()}`,
      );
  }

  // This isn't a Rules-of-Hooks violation because the invariants should never be false
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState((props.value?.value as string) ?? ""); // will need to change if we add non-text meta types
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const id = useId();

  let inputType;
  let Component;
  switch (props.field.type) {
    case "Text":
      Component = Input;
      inputType = "text";
      break;
    case "URL":
      inputType = "url";
      Component = Input;
      break;
    case "LongText":
      Component = Textarea;
      break;
  }

  return (
    <div>
      <label htmlFor={id} className="font-bold">
        {props.field.name}
      </label>
      <div className="flex">
        <Component
          id={id}
          type={inputType}
          value={value}
          disabled={isPending}
          onChange={(e) => {
            setValue(e.target.value);
            setTouched(true);
          }}
        />
        {touched && (
          <>
            <Button
              color="danger"
              size="icon"
              onClick={() => {
                setValue((props.value?.value as string) ?? "");
                setTouched(false);
              }}
            >
              <IoCloseSharp />
            </Button>
            <Button
              color="primary"
              size="icon"
              onClick={() => {
                setError(null);
                startTransition(async () => {
                  const result = await props.saveChanges(value);
                  if (result.ok) {
                    setTouched(false);
                  } else {
                    setError(result.errors.root ?? "");
                  }
                });
              }}
              disabled={isPending}
            >
              <IoCheckmarkSharp />
            </Button>
          </>
        )}
      </div>
      {error && <p className="text-danger-4">{error}</p>}
    </div>
  );
}

export function MetadataFields(props: {
  metadata: MetadataWithField[];
  fields: MetadataField[];
  setValue: (
    metaID: number,
    val: Prisma.InputJsonValue,
  ) => Promise<FormResponse>;
  createMeta: (
    fieldID: number,
    val: Prisma.InputJsonValue,
  ) => Promise<FormResponse>;
}) {
  const emptyFields = useMemo(
    () =>
      props.fields.filter(
        (f) => !props.metadata.some((m) => m.field.id === f.id),
      ),
    [props.fields, props.metadata],
  );
  return (
    <div className="space-y-2 my-8">
      {props.metadata.map((meta) => (
        <MetaValue
          key={meta.id}
          field={meta.field}
          value={meta}
          saveChanges={(val) => props.setValue(meta.id, val)}
        />
      ))}
      {emptyFields.map((field) => (
        <MetaValue
          key={field.id}
          field={field}
          value={null}
          saveChanges={(val) => props.createMeta(field.id, val)}
        />
      ))}
    </div>
  );
}
