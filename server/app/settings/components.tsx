"use client";

import Form from "@/components/Form";
import { Field, SelectField } from "@/components/FormFields";
import invariant from "@/lib/invariant";
import {
  SettingsCategories,
  SettingsCategoriesSchema,
  SettingsNames,
  SettingsTypes,
  SettingsTypesSchema,
} from "@/lib/settings";
import { SettingKey } from "@bowser/prisma/client";
import { identity } from "lodash";
import { ZodFirstPartyTypeKind } from "zod";
import { updateSettings } from "./actions";

export function SettingsForm(props: { initialValues: Partial<SettingsTypes> }) {
  return (
    <Form
      action={updateSettings}
      schema={SettingsTypesSchema.partial()}
      initialValues={props.initialValues}
      submitLabel="Save"
    >
      {SettingsCategoriesSchema.options.map((cat) => (
        <fieldset key={cat}>
          <legend className="text-xl mt-8">{cat}</legend>
          {SettingsCategories[cat].map((key) => (
            <SettingsField key={key} field={key} />
          ))}
        </fieldset>
      ))}
    </Form>
  );
}

export function SettingsField(props: { field: SettingKey }) {
  const type = SettingsTypesSchema.shape[props.field];
  switch (type._def.typeName) {
    case ZodFirstPartyTypeKind.ZodString:
      return (
        <Field
          as="input"
          name={props.field}
          label={SettingsNames[props.field]}
        />
      );
    case ZodFirstPartyTypeKind.ZodNumber:
      return (
        <Field
          as="input"
          type="tel"
          name={props.field}
          label={SettingsNames[props.field]}
        />
      );
    case ZodFirstPartyTypeKind.ZodEnum:
      return (
        <SelectField
          name={props.field}
          label={SettingsNames[props.field]}
          options={type._def.values}
          renderOption={identity}
          getOptionValue={identity}
          filter={false}
        />
      );
    default:
      invariant(
        false,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        `Unsupported type ${(type._def as any).typeName} for setting ${props.field}`,
      );
  }
}
