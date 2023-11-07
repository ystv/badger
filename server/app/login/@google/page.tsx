import { cookies } from "next/headers";
import { GoogleLoginButton } from "./GoogleLoginButton";
import { Alert } from "@bowser/components/alert";
import { SignInResult } from "@/lib/auth";

export default async function GoogleLogin(props: {
  searchParams: { return?: string; status?: string };
}) {
  let message;
  switch (props.searchParams.status) {
    case undefined:
      break;
    case SignInResult.CreatedInactive:
      message =
        "Your account has been created, but is not yet active. Please contact the Computing Team.";
      break;
    case SignInResult.Inactive:
      message =
        "Your account is not active. Please contact the Computing Team.";
      break;
    default:
      message = `Unknown sign-in status: ${props.searchParams.status}`;
  }
  return (
    <div>
      {message && <Alert variant="warning">{message}</Alert>}
      <p>Please sign in.</p>
      {process.env.USER_AUTO_CREATE_DOMAINS && (
        <p>
          If you have a{" "}
          {process.env.USER_AUTO_CREATE_DOMAINS.split(", ").join(" , or ")}{" "}
          account, use it to get access faster.
        </p>
      )}
      <GoogleLoginButton
        clientID={process.env.GOOGLE_CLIENT_ID!}
        publicURL={process.env.PUBLIC_URL!}
      />
    </div>
  );
}
