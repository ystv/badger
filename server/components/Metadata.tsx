"use client";

import invariant from "@/lib/invariant";
import Button from "@badger/components/button";
import { Input } from "@badger/components/input";
import { Textarea } from "@badger/components/textarea";
import { Prisma } from "@badger/prisma/client";
import { Metadata, MetadataField } from "@badger/prisma/client";
import { useId, useMemo, useReducer, useState, useTransition } from "react";
import { FormResponse } from "./Form";
import {
  IoCheckmarkSharp,
  IoCloseSharp,
  IoAddCircle,
  IoChevronDownSharp,
} from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@badger/components/dropdown-menu";
import { twMerge } from "tailwind-merge";
import { expectNever } from "ts-expect";
import {
  CompleteMedia,
  ItemMediaStateAndUploadDialog,
  MediaMetadata,
} from "./MediaState";
import { PastShowsMedia } from "./MediaSelection";

export interface MetadataWithFieldAndMedia extends Metadata {
  field: MetadataField;
  media: CompleteMedia | null;
  _temporary?: boolean;
}

export interface MediaMetaUploadValue {
  uploadUrl: string;
  fileName: string;
}

export interface MediaMetaSelectValue {
  mediaId: number;
}

function MetaValue(props: {
  field: MetadataField;
  value: Metadata | null;
  saveChanges: (val: Prisma.InputJsonValue) => Promise<FormResponse>;
  onCancel?: () => void;
  slim?: boolean;
  hideCancel?: boolean;
  initialTouched?: boolean;
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
    case "Media":
      invariant(false, "MetaValue does not support Media metadata");
    default:
      expectNever(props.field.type);
  }

  // This isn't a Rules-of-Hooks violation because the invariants should never be false
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState((props.value?.value as string) ?? ""); // will need to change if we add non-text meta types
  const [touched, setTouched] = useState(props.initialTouched);
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
      <div className={twMerge("flex", props.slim ? "flex-row" : "flex-col")}>
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
            {!props.hideCancel && (
              <Button
                color="danger"
                size={props.slim ? "icon" : "default"}
                onClick={() => {
                  props.onCancel?.();
                  setValue((props.value?.value as string) ?? "");
                  setTouched(false);
                }}
                data-testid="MetaValue.cancel"
              >
                <IoCloseSharp />
              </Button>
            )}
            <Button
              color="primary"
              size={props.slim ? "icon" : "default"}
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
              data-testid="MetaValue.save"
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

function MediaMetaValue({
  field,
  meta,
  value,
  onUploadComplete,
  onExistingSelected,
  pastShowsPromise,
}: {
  field: MetadataField;
  meta: Metadata | null;
  value: CompleteMedia | null;
  onUploadComplete: (url: string, fileName: string) => Promise<unknown>;
  onExistingSelected: (id: number) => Promise<unknown>;
  pastShowsPromise: Promise<PastShowsMedia>;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id}>
        <strong>{field.name}</strong>
      </label>
      <div>
        <ItemMediaStateAndUploadDialog
          item={{
            field,
            media: value,
          }}
          onUploadComplete={onUploadComplete}
          onExistingSelected={onExistingSelected}
          pastShowsPromise={pastShowsPromise}
        />
      </div>
    </div>
  );
}

function tempFieldsReducer(
  state: MetadataWithFieldAndMedia[],
  action:
    | { type: "add"; fieldType: MetadataField }
    | { type: "remove"; id: number },
): MetadataWithFieldAndMedia[] {
  switch (action.type) {
    case "add":
      return [
        ...state,
        {
          field: action.fieldType,
          fieldId: action.fieldType.id,
          showId: -1,
          rundownId: -1,
          id: Math.random(),
          _temporary: true,
          value: "",
          mediaId: null,
          media: null,
        },
      ];
    case "remove":
      return state.filter((x) => x.id !== action.id);
    default:
      // @ts-expect-error exhaustive
      invariant(false, `Unknown tempFieldsReducer action type ${action.type}`);
  }
}

export function MetadataFields(props: {
  metadata: MetadataWithFieldAndMedia[];
  fields: MetadataField[];
  setValue: (
    metaID: number,
    val: Prisma.InputJsonValue | MediaMetaUploadValue | MediaMetaSelectValue,
  ) => Promise<FormResponse>;
  createMeta: (
    fieldID: number,
    val: Prisma.InputJsonValue | MediaMetaUploadValue | MediaMetaSelectValue,
  ) => Promise<FormResponse>;
  pastShowsPromise: Promise<PastShowsMedia>;
}) {
  const emptyFields = useMemo(
    () =>
      props.fields.filter(
        (f) => !props.metadata.some((m) => m.field.id === f.id),
      ),
    [props.fields, props.metadata],
  );
  const emptyDefaultFields = emptyFields.filter((f) => f.default);
  const emptyNonDefaultFields = emptyFields.filter((f) => !f.default);

  const [tempFields, setTempFields] = useReducer(tempFieldsReducer, []);

  return (
    <div className="space-y-2 my-8">
      {props.metadata
        .filter((x) => x.field.default)
        .map((meta) =>
          meta.field.type === "Media" ? (
            <MediaMetaValue
              key={meta.id}
              meta={meta}
              field={meta.field}
              value={meta.media}
              onUploadComplete={(url, fileName) =>
                props.setValue(meta.id, { uploadUrl: url, fileName })
              }
              onExistingSelected={(id) =>
                props.setValue(meta.id, { mediaId: id })
              }
              pastShowsPromise={props.pastShowsPromise}
            />
          ) : (
            <MetaValue
              key={meta.id}
              field={meta.field}
              value={meta}
              saveChanges={(val) => props.setValue(meta.id, val)}
            />
          ),
        )}
      {emptyDefaultFields.map((field) =>
        field.type === "Media" ? (
          <MediaMetaValue
            key={field.id}
            meta={null}
            field={field}
            value={null}
            onUploadComplete={(url, fileName) =>
              props.createMeta(field.id, { uploadUrl: url, fileName })
            }
            onExistingSelected={(id) =>
              props.createMeta(field.id, { mediaId: id })
            }
            pastShowsPromise={props.pastShowsPromise}
          />
        ) : (
          <MetaValue
            key={field.id}
            field={field}
            value={null}
            saveChanges={(val) => props.createMeta(field.id, val)}
            slim
          />
        ),
      )}
      {props.metadata
        .filter((x) => !x.field.default)
        .map((meta) =>
          meta.field.type === "Media" ? (
            <MediaMetaValue
              key={meta.id}
              meta={meta}
              field={meta.field}
              value={meta.media}
              onUploadComplete={(url, fileName) =>
                props.setValue(meta.id, { uploadUrl: url, fileName })
              }
              onExistingSelected={(id) =>
                props.setValue(meta.id, { mediaId: id })
              }
              pastShowsPromise={props.pastShowsPromise}
            />
          ) : (
            <MetaValue
              key={meta.id}
              field={meta.field}
              value={meta}
              saveChanges={(val) => props.setValue(meta.id, val)}
              slim
            />
          ),
        )}
      {tempFields.map((meta) =>
        meta.field.type === "Media" ? (
          <MediaMetaValue
            key={meta.id}
            meta={meta}
            field={meta.field}
            value={null}
            onUploadComplete={async (url, fileName) => {
              const r = await props.createMeta(meta.field.id, {
                uploadUrl: url,
                fileName,
              });
              if (r.ok) {
                setTempFields({ type: "remove", id: meta.id });
              }
              return r;
            }}
            onExistingSelected={async (id) => {
              const r = await props.createMeta(meta.field.id, { mediaId: id });
              if (r.ok) {
                setTempFields({ type: "remove", id: meta.id });
              }
              return r;
            }}
            pastShowsPromise={props.pastShowsPromise}
          />
        ) : (
          <MetaValue
            key={meta.id}
            field={meta.field}
            value={meta}
            saveChanges={async (val) => {
              const r = await props.createMeta(meta.field.id, val);
              if (r.ok) {
                setTempFields({ type: "remove", id: meta.id });
              }
              return r;
            }}
            onCancel={() => setTempFields({ type: "remove", id: meta.id })}
            initialTouched
            slim
          />
        ),
      )}
      {emptyNonDefaultFields.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button color="ghost">
              <IoChevronDownSharp className="mr-1" />
              Add extra show details
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {emptyNonDefaultFields.map((field) => (
              <DropdownMenuItem
                key={field.id}
                onClick={() => setTempFields({ type: "add", fieldType: field })}
              >
                {field.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
