import {
  ArrayPath,
  FieldArray,
  FieldValues,
  Path,
  RegisterOptions,
  useController,
  useFieldArray,
  useFormContext,
} from "react-hook-form";
import { FieldPath } from "react-hook-form/dist/types/path";
import classNames from "classnames";
import {
  ForwardedRef,
  ReactNode,
  forwardRef,
  useEffect,
  useMemo,
  useState,
} from "react";
import Button from "@bowser/components/button";
import { identity } from "lodash";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@bowser/components/popover";
import { cn } from "@bowser/components/utils";
import { IoCalendarSharp } from "react-icons/io5";
import { format, parse } from "date-fns";
import { Calendar } from "@bowser/components/calendar";
import { Input } from "@bowser/components/input";

interface FieldBaseProps<
  TFields extends FieldValues,
  TFieldName extends Path<TFields>,
  TEl extends React.ElementType = "input",
> {
  name: TFieldName;
  label?: string;
  className?: string;
  as?: TEl;
  registerParams?: RegisterOptions<TFields, TFieldName>;
}

function FieldWrapper(props: {
  label?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      {props.label && (
        <span className="font-bold text-gray-700">{props.label}</span>
      )}
      {props.error && (
        <span className="block font-semibold text-danger">
          {props.error ?? ""}
        </span>
      )}
      {props.children}
    </label>
  );
}

/**
 * A generic form field, tied into the validation system and with some basic styling.
 * Pass the `as` prop to render a different element type (e.g. `as="textarea"`), otherwise it will be an input.
 * `label` is rendered outside the element, all other props are passed to the element as if it were a normal <input>.
 */
export const Field = forwardRef(function Field<
  TFields extends FieldValues,
  TFieldName extends FieldPath<TFields> = FieldPath<TFields>,
  TEl extends React.ElementType = typeof Input,
>(
  props: FieldBaseProps<TFields, TFieldName, TEl> &
    React.ComponentPropsWithoutRef<TEl>,
  ref: ForwardedRef<HTMLElement>,
) {
  const { label, registerParams, ...rest } = props;
  const ctx = useFormContext<TFields>();
  const El = props.as ?? Input;
  const { ref: regRef, ...reg } = ctx.register(props.name, registerParams);
  const field = (
    <El
      {...rest}
      {...reg}
      className={classNames(
        props.className ??
          "mt-1 block w-full rounded-md border-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ",
        ctx.formState.errors[props.name] ? "border-danger" : "border-gray-300",
      )}
      ref={(e) => {
        // Ensure that both hook-form and the parent component get a ref to the element
        regRef(e);
        if (ref) {
          "current" in ref ? (ref.current = e) : ref(e);
        }
      }}
    />
  );
  if (!label) {
    return field;
  }
  return (
    <FieldWrapper
      label={label}
      error={ctx.formState.errors[props.name]?.message as string | undefined}
    >
      {field}
    </FieldWrapper>
  );
});

export function HiddenField<
  TFields extends FieldValues,
  TFieldName extends FieldPath<TFields> = FieldPath<TFields>,
>(props: { name: TFieldName; value: string }) {
  const ctx = useFormContext<TFields>();
  return (
    <input type="hidden" {...ctx.register(props.name)} value={props.value} />
  );
}

export function DatePickerField(props: {
  name: string;
  defaultValue?: Date | string;
  label: string;
  showTimeSelect?: boolean;
  timeIntervals?: number;
}) {
  const controller = useController({
    name: props.name,
    defaultValue:
      props.defaultValue instanceof Date
        ? props.defaultValue.toISOString
        : props.defaultValue,
  });
  const v = useMemo(
    () => (controller.field.value ? new Date(controller.field.value) : null),
    [controller.field.value],
  );
  return (
    <FieldWrapper
      label={props.label}
      error={controller.fieldState.error?.message}
    >
      <Popover>
        <PopoverTrigger asChild>
          <Button
            color="ghost"
            className={cn(
              "justify-start items-center text-left font-normal block",
              !v && "text-muted-foreground",
            )}
            data-testid="DatePickerField.trigger"
          >
            <IoCalendarSharp className="inline mr-2 h-4 w-4" />
            {v ? format(v, "PPP") : <span className="h-4">Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={v ?? undefined}
            onSelect={controller.field.onChange}
            initialFocus
          />
          {props.showTimeSelect && (
            <div className="flex justify-end px-3 py-2">
              <Input
                type="time"
                value={v ? format(v, "HH:mm") : ""}
                onChange={(e) => {
                  const newTime = parse(
                    e.target.value,
                    "HH:mm",
                    v ?? new Date(),
                  );
                  console.log("New time", newTime);
                  controller.field.onChange(newTime);
                }}
              />
            </div>
          )}
        </PopoverContent>
      </Popover>
    </FieldWrapper>
  );
}

export function CheckBoxField(props: { name: string; label?: string }) {
  const ctx = useFormContext();
  if (!props.label) {
    return <input type="checkbox" {...ctx.register(props.name)} />;
  }
  return (
    <label className="block">
      <span className="font-bold text-gray-700">{props.label}</span>
      <input type="checkbox" {...ctx.register(props.name)} />
    </label>
  );
}

export function NullableCheckboxField(props: {
  name: string;
  checkboxLabel: string;
  children: React.ReactNode;
}) {
  const controller = useController({
    name: props.name,
    defaultValue: null,
  });
  const [isChecked, setChecked] = useState(controller.field.value !== null);
  useEffect(() => {
    if (!isChecked) {
      controller.field.onChange(null);
    }
  }, [isChecked, controller.field]);
  return (
    <>
      <label className="block">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => {
            setChecked(e.target.checked);
          }}
        />
        <span className="ml-1 inline font-bold text-gray-700">
          {props.checkboxLabel}
        </span>
      </label>
      {isChecked && props.children}
    </>
  );
}

export function ArrayField<
  TFieldValues extends FieldValues,
  TFieldName extends ArrayPath<TFieldValues> = ArrayPath<TFieldValues>,
>(props: {
  name: string;
  children: (
    // The unknown here is to remind you that, because of coercion, some of the types may not be what you expect
    // (e.g. you have a field that's defined as `z.coerce.number()` - the final value will actually be a number,
    // but the value you'll get passed here may be a string
    field: Record<string, unknown> & { id: string },
    index: number,
    els: { remove: React.ReactNode },
  ) => React.ReactNode;
  newElement: (value: FieldArray<TFieldValues, TFieldName>[]) => TFieldValues;
  header?: React.ReactNode;
}) {
  const { fields, append, remove } = useFieldArray<TFieldValues, TFieldName>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    name: props.name as any /* TODO: the typings here are absolutely insane */,
  });
  return (
    <>
      {fields.length > 0 && props.header}
      {fields.map((field, idx) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        props.children(field as any, idx, {
          remove: (
            <Button
              className="h-full min-w-[2rem] align-middle font-black"
              onClick={() => remove(idx)}
              color="danger"
              size="small"
            >
              -
            </Button>
          ),
        }),
      )}
      <Button
        className="mt-1 font-black"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onClick={() => append(props.newElement(fields) as any)}
        color="primary"
        size="small"
      >
        +
      </Button>
    </>
  );
}

export function SelectField<TObj>(props: {
  name: string;
  options: TObj[];
  label?: string;
  renderOption: (obj: TObj) => string;
  getOptionValue: (obj: TObj) => string | number;
  filter: ((obj: TObj, filter: string) => boolean) | false;
  nullable?: boolean;
}) {
  const { name, label, options, getOptionValue, renderOption, nullable } =
    props;
  return (
    <Field
      name={name}
      label={label}
      as="select"
      registerParams={{
        setValueAs: props.nullable
          ? (v: TObj) => (v === "" ? null : v)
          : identity,
      }}
    >
      {nullable && <option value="">None</option>}
      {options.map((opt) => (
        <option key={getOptionValue(opt)} value={getOptionValue(opt)}>
          {renderOption(opt)}
        </option>
      ))}
    </Field>
  );
}

/**
 * A field for entering a duration in seconds, with a nice HH:MM:SS format.
 * Note that milliseconds are not supported.
 * Also note that the only supported value for the `units` prop is "seconds" - this is to allow for future expansion.
 */
export function DurationField(props: {
  name: string;
  label?: string;
  units: "seconds";
}) {
  const controller = useController({
    name: props.name,
    defaultValue: 0,
  });
  const valueFormatted = useMemo(() => {
    const seconds = Math.floor(controller.field.value);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    let value = `${(minutes % 60).toString(10).padStart(2, "0")}:${(
      seconds % 60
    )
      .toString(10)
      .padStart(2, "0")}`;
    if (hours > 0) {
      value = `${hours.toString(10)}:${value}`;
    }
    return value;
  }, [controller.field.value]);
  return (
    <FieldWrapper
      label={props.label}
      error={controller.fieldState.error?.message}
    >
      <Input
        type="text"
        {...controller.field}
        value={valueFormatted}
        onChange={(e) => {
          let value = 0;
          const parts = e.target.value.split(":");
          for (let i = 0; i < parts.length; i++) {
            if (parts[i].length > 0) {
              value +=
                parseInt(parts[i], 10) * Math.pow(60, parts.length - i - 1);
            }
          }
          controller.field.onChange(value);
        }}
        placeholder="xx:xx"
      />
    </FieldWrapper>
  );
}
