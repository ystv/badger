import { LoginForm } from "@/app/login/@local/form";

export default async function LoginPage(props: {
  searchParams: { return?: string };
}) {
  return (
    <div>
      <h1>Please sign in</h1>
      <LoginForm return={props.searchParams.return} />
    </div>
  );
}
