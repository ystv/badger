"use client";
import { handleSignIn } from "@/app/login/@local/actions";
import { SignInSchema } from "@/app/login/@local/schema";
import { Field, HiddenField } from "@/components/FormFields";
import Form from "@/components/Form";
import { usePathname } from "next/navigation";

export function LoginForm(props: { return?: string }) {
  const pathname = usePathname();
  return (
    <Form action={handleSignIn} schema={SignInSchema} submitLabel="Sign In">
      <Field
        name="username"
        label="Username"
        placeholder="charlie.jeffery"
        autoComplete="username"
      />
      <Field
        name="password"
        label="Password"
        type="password"
        placeholder="********"
        autoComplete="current-password"
      />
      <HiddenField name="return" value={props.return ?? pathname ?? "/"} />
    </Form>
  );
}
