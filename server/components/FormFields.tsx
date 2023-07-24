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
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import classNames from "classnames";
import { useEffect, useMemo, useState } from "react";
import Button from "@/components/Button";
import { identity } from "lodash";

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

/**
 * A generic form field, tied into the validation system and with some basic styling.
 * Pass the `as` prop to render a different element type (e.g. `as="textarea"`), otherwise it will be an input.
 * `label` is rendered outside the element, all other props are passed to the element as if it were a normal <input>.
 */
export function Field<
  TFields extends FieldValues,
  TFieldName extends FieldPath<TFields> = FieldPath<TFields>,
  TEl extends React.ElementType = "input",
>(
  props: FieldBaseProps<TFields, TFieldName, TEl> &
    React.ComponentPropsWithoutRef<TEl>,
) {
  const { label, registerParams, ...rest } = props;
  const ctx = useFormContext<TFields>();
  const El = props.as ?? "input";
  const field = (
    <El
      {...rest}
      {...ctx.register(props.name, registerParams)}
      className={classNames(
        props.className ??
          "mt-1 block w-full rounded-md border-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ",
        ctx.formState.errors[props.name] ? "border-danger" : "border-gray-300",
      )}
    />
  );
  if (!props.label) {
    return field;
  }
  return (
    <label className="block">
      <span className="font-bold text-gray-700">{label}</span>
      {ctx.formState.errors[props.name] && (
        <span className="block font-semibold text-danger">
          {(ctx.formState.errors[props.name]?.message as string) ?? ""}
        </span>
      )}
      {field}
    </label>
  );
}

export function HiddenField<
  TFields extends FieldValues,
  TFieldName extends FieldPath<TFields> = FieldPath<TFields>,
>(props: { name: TFieldName; value: string }) {
  const ctx = useFormContext<TFields>();
  return (
    <input type="hidden" {...ctx.register(props.name)} value={props.value} />
  );
}

export function DatePickerField(
  props: {
    name: string;
    defaultValue?: Date | string;
    label: string;
  } & Omit<ReactDatePickerProps, "value" | "onChange">,
) {
  const { name, defaultValue, label, ...rest } = props;
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
    <label className="block">
      <span className="block font-bold text-gray-700">{props.label}</span>
      {controller.fieldState.error && (
        <span className="block font-semibold text-danger">
          {(controller.fieldState.error.message as string) ?? ""}
        </span>
      )}
      <DatePicker
        selected={v}
        onChange={(v) => controller.field.onChange(v?.toISOString())}
        onBlur={controller.field.onBlur}
        ref={controller.field.ref}
        className={classNames(
          "mt-1 block w-full rounded-md shadow-sm",
          controller.fieldState.error ? "border-danger" : "border-gray-300",
          props.className,
        )}
        wrapperClassName="block"
        {...rest}
        selectsRange={false}
      />
    </label>
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
    name: props.name as any /* TODO: the typings here are absolutely insane */,
  });
  return (
    <>
      {fields.length > 0 && props.header}
      {fields.map((field, idx) =>
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
        onClick={() => append(props.newElement(fields) as any)}
        color="primary"
        size="small"
      >
        +
      </Button>
    </>
  );
}

export function SelectField<TObj extends {}>(props: {
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
        setValueAs: props.nullable ? (v) => (v === "" ? null : v) : identity,
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
