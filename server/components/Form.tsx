"use client";
import { z, ZodEffects, ZodTypeAny } from "zod";
import {
  DeepPartial,
  FieldValues,
  FormProvider,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState, useTransition } from "react";
import classNames from "classnames";
import { FieldPath } from "react-hook-form/dist/types/path";
import { DebugOnly } from "@/components/DebugMode";
import Button from "@/components/Button";
import { isRedirectError } from "next/dist/client/components/redirect";

export interface FormErrorResponse<Fields extends FieldValues = any> {
  ok: false;
  errors: { [K in keyof Fields | "root"]?: string };
}

export type FormResponse<
  OK extends Record<string, unknown> = {},
  Fields extends FieldValues = any,
> = ({ ok: true } & OK) | FormErrorResponse;
export type FormAction<
  OK extends Record<string, unknown> = {},
  Fields extends FieldValues = any,
> = (data: Fields) => Promise<FormResponse<OK, Fields>>;

const useForceUpdate = () => {
  const [, setState] = useState(true);
  return useCallback(() => {
    setState((s) => !s);
  }, []);
};

export default function Form<
  Schema extends ZodTypeAny | ZodEffects<ZodTypeAny>,
  SuccessfulResponse extends Record<string, unknown> = {},
>(props: {
  action: FormAction<SuccessfulResponse, z.infer<Schema>>;
  schema: Schema;
  initialValues?: DeepPartial<z.infer<Schema>>;
  children: React.ReactNode;
  className?: string;
  submitLabel?: string;
  onSuccess?: (res: SuccessfulResponse) => void;
}) {
  const form = useForm<z.infer<Schema>>({
    resolver: zodResolver(props.schema),
    defaultValues: props.initialValues,
  });
  const [isSubmitting, startTransition] = useTransition();
  const { action, onSuccess } = props;
  const forceUpdate = useForceUpdate();
  const submitHandler = useCallback(async () => {
    const valid = await form.trigger();
    if (valid) {
      startTransition(async () => {
        let res;
        try {
          // TODO: This submits the form values as JSON, effectively ignoring the FormData parameter. This works, but
          //  may run into issues down the line, especially when (if?) we upload files directly from the form.
          //  Instead, we should probably use the FormData object React gives us (though we'll have to figure out how
          //  to make it play nice with hook-form).
          res = await action(form.getValues());
        } catch (e) {
          if (e instanceof Error && isRedirectError(e)) {
            throw e;
          }
          console.error(e);
          form.setError("root", { type: "custom", message: String(e) });
          return;
        }
        if (!("ok" in res)) {
          throw new Error(
            "<Form> action did not conform to FormResponse interface.",
          );
        }
        if (res.ok) {
          form.clearErrors();
          onSuccess?.(res);
          return;
        }
        form.clearErrors();
        for (const [k, err] of Object.entries(
          (res as FormErrorResponse).errors,
        )) {
          form.setError(k as FieldPath<z.infer<Schema>>, {
            type: "custom",
            message: err,
          });
        }
      });
    }
  }, [form, action, onSuccess]);
  return (
    <FormProvider {...form}>
      <form action={submitHandler} className={props.className}>
        {form.formState.errors.root && (
          <span className="block font-semibold text-red-500">
            {(form.formState.errors.root?.message as string) ?? ""}
          </span>
        )}
        {props.children}
        <button
          type="submit"
          // disabled={isSubmitting || !form.formState.isValid}
          className={classNames(
            "mt-4 rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-4",
            (isSubmitting || !form.formState.isValid) &&
              "cursor-not-allowed opacity-50",
          )}
        >
          {props.submitLabel ?? "Create"}
        </button>
      </form>
      <DebugOnly>
        <pre className="mt-4 text-xs text-gray-500">
          Debug: form state: {JSON.stringify(form.formState, null, 2)}
          <br />
          isValid: {JSON.stringify(form.formState.isValid)}
          <br />
          isDirty: {JSON.stringify(form.formState.isDirty)}
          <br />
          values: {JSON.stringify(form.getValues(), null, 2)}
          <br />
          validated:{" "}
          {JSON.stringify(
            props.schema.safeParse(form.getValues()),
            null,
            2,
          )}{" "}
          <br />
          <Button size="small" color="light" onClick={forceUpdate}>
            Force update
          </Button>
        </pre>
      </DebugOnly>
    </FormProvider>
  );
}
