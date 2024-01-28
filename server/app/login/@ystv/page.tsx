import { LoginForm } from "@/app/login/@ystv/form";

export default async function LoginPage(props: {
  searchParams: { return?: string };
}) {
  return (
    <div>
      <h1>Please sign in</h1>
      <p>Use your normal YSTV login details.</p>
      <LoginForm return={props.searchParams.return} />
    </div>
  );
}
