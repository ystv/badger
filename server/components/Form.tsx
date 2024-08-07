"use client";
import { z, ZodEffects, ZodTypeAny } from "zod";
import {
  DeepPartial,
  FieldValues,
  FormProvider,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, {
  ComponentProps,
  useCallback,
  useEffect,
  useState,
  useTransition,
} from "react";
import classNames from "classnames";
import { FieldPath } from "react-hook-form/dist/types/path";
import { DebugOnly } from "@/components/DebugMode";
import Button from "@badger/components/button";
import { isRedirectError } from "next/dist/client/components/redirect";
import { UseFormReturn } from "react-hook-form/dist/types/form";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface FormErrorResponse<Fields extends FieldValues = any> {
  ok: false;
  errors: { [K in keyof Fields | "root"]?: string };
}

export type FormResponse<
  OK extends Record<string, unknown> = Record<string, unknown>,
  _Fields extends FieldValues = any,
> = ({ ok: true } & OK) | FormErrorResponse;
export type FormAction<
  OK extends Record<string, unknown> = Record<string, unknown>,
  Fields extends FieldValues = any,
> = (data: Fields) => Promise<FormResponse<OK, Fields>>;
/* eslint-enable @typescript-eslint/no-explicit-any */

const useForceUpdate = () => {
  const [, setState] = useState(true);
  return useCallback(() => {
    setState((s) => !s);
  }, []);
};

interface FormProps<
  Schema extends ZodTypeAny | ZodEffects<ZodTypeAny>,
  SuccessfulResponse extends Record<string, unknown> = Record<string, unknown>,
> {
  action: FormAction<SuccessfulResponse, z.infer<Schema>>;
  schema: Schema;
  initialValues?: DeepPartial<z.infer<Schema>>;
  children: React.ReactNode;
  className?: string;
  submitLabel?: string;
  submitButtonProps?: Partial<
    ComponentProps<"button"> & { "data-testid": string }
  >;
  onSuccess?: (
    res: SuccessfulResponse,
    form: UseFormReturn<z.infer<Schema>>,
  ) => void;
  formRef?: React.MutableRefObject<UseFormReturn<z.infer<Schema>> | null>;
}

export default function Form<
  Schema extends ZodTypeAny | ZodEffects<ZodTypeAny>,
  SuccessfulResponse extends Record<string, unknown> = Record<string, unknown>,
>(props: FormProps<Schema, SuccessfulResponse>) {
  const form = useForm<z.infer<Schema>>({
    resolver: zodResolver(props.schema),
    defaultValues: props.initialValues,
  });
  useEffect(() => {
    if (props.formRef) {
      props.formRef.current = form;
    }
    return () => {
      if (props.formRef) {
        props.formRef.current = null;
      }
    };
  }, [form, props.formRef]);
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
          //  It's also not brilliant for progressive enhancement.
          //  Instead, we should probably use the FormData object React gives us (though we'll have to figure out how
          //  to make it play nice with hook-form).
          res = await action(form.getValues());
        } catch (e) {
          console.warn("Form error", e);
          if (e instanceof Error && isRedirectError(e)) {
            throw e;
          }
          console.error(e);
          form.setError("root", { type: "custom", message: String(e) });
          return;
        }
        if (typeof res !== "object") {
          throw new Error(
            "Internal error: <Form> action result was not an object",
          );
        }
        if (!("ok" in res)) {
          throw new Error(
            "Internal error: <Form> action did not conform to FormResponse interface.",
          );
        }
        if (res.ok) {
          form.clearErrors();
          onSuccess?.(res, form);
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
          {...props.submitButtonProps}
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
