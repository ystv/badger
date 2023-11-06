import { enableGoogleLogin } from "@bowser/feature-flags";
import { ReactNode } from "react";

export default function LoginPage(props: {
  ystv: ReactNode;
  google: ReactNode;
}) {
  return enableGoogleLogin ? props.google : props.ystv;
}
