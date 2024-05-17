"use client";

import Script from "next/script";

export function GoogleLoginButton(props: {
  clientID: string;
  publicURL: string;
}) {
  return (
    <div id="signInWrapper" className="my-8">
      <div
        id="g_id_onload"
        data-client_id={props.clientID}
        data-login_uri={`${props.publicURL}/login/google/callback`}
        data-auto_prompt="false"
      ></div>

      <div
        className="g_id_signin"
        data-type="standard"
        data-shape="rectangular"
        data-theme="outline"
        data-text="signin_with"
        data-size="large"
        data-logo_alignment="left"
      ></div>
      <Script src="https://accounts.google.com/gsi/client" async />
    </div>
  );
}
