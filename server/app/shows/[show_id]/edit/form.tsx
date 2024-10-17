"use client";

import { Show } from "@badger/prisma/client";
import { schema } from "./schema";
import { DatePickerField, Field, HiddenField } from "@/components/FormFields";
import { doEdit } from "./actions";
import Form from "@/components/Form";
import { useRouter } from "next/navigation";

export function EditShowForm(props: { initialValues: Show }) {
  const router = useRouter();
  return (
    <div>
      <h1 className="text-4xl">Edit &apos;{props.initialValues.name}&apos;</h1>
      <Form
        action={doEdit}
        schema={schema}
        initialValues={props.initialValues}
        onSuccess={(v) => {
          router.push(`/shows/${v.id}`);
        }}
        submitLabel="Save"
      >
        <HiddenField name="id" value={props.initialValues.id.toString(10)} />
        <Field name="name" label="Name" />
        <DatePickerField
          name="start"
          label="Start"
          showTimeSelect
          timeIntervals={15}
        />
      </Form>
    </div>
  );
}
