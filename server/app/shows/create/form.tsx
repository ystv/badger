"use client";

import { schema } from "./schema";
import { create } from "./actions";
import Form from "@/components/Form";
import { DatePickerField, Field } from "@/components/FormFields";
import { useRouter } from "next/navigation";

export default function CreateShowForm() {
  const router = useRouter();
  return (
    <div>
      <h1 className="text-4xl">New Show</h1>
      <Form
        action={create}
        schema={schema}
        onSuccess={(v) => {
          router.push(`/shows/${v.id}`);
        }}
      >
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
