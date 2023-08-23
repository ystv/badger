"use client";

import { schema } from "./schema";
import { create } from "./actions";
import Form from "@/components/Form";
import { DatePickerField, Field } from "@/components/FormFields";

export default function CreateShowPage() {
  return (
    <div>
      <h1 className="text-4xl">New Show</h1>
      <Form action={create} schema={schema}>
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
