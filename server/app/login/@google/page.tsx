import { cookies } from "next/headers";
import { GoogleLoginButton } from "./GoogleLoginButton";
import { Alert } from "@bowser/components/alert";

export default async function GoogleLogin(props: {
  searchParams: { return?: string; status?: string };
}) {
  // FIXME
  // if (props.searchParams.return) {
  //   await cookies().set("bowser_auth_return", props.searchParams.return, {
  //     expires: new Date(Date.now() + 1000 * 60 * 60),
  //     httpOnly: true,
  //     sameSite: "strict"
  //   });
  // }
  let message;
  switch (props.searchParams.status) {
    case undefined:
      break;
    case "created_inactive":
      message =
        "Your account has been created, but is not yet active. Please contact the Computing Team.";
      break;
    default:
      message = `Unknown sign-in status: ${props.searchParams.status}`;
  }
  return (
    <div>
      {message && <Alert variant="default">{message}</Alert>}
      <p>Please sign in.</p>
      {process.env.GOOGLE_AUTO_CREATE_DOMAINS && (
        <p>
          Use your{" "}
          {process.env.GOOGLE_AUTO_CREATE_DOMAINS.split(", ").join(" , or ")}{" "}
          account to get access faster.
        </p>
      )}
      <GoogleLoginButton
        clientID={process.env.GOOGLE_CLIENT_ID!}
        publicURL={process.env.PUBLIC_URL!}
      />
    </div>
  );
}
