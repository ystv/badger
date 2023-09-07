"use client";

import { useEffect, useState } from "react";

export function DateTime(props: {
  val: string;
  format?: "date" | "time" | "datetime";
}) {
  const format = props.format ?? "datetime";
  const [visible, setVisible] = useState(false);
  const [formatted, setFormatted] = useState(() =>
    // We initially render the UTC value to avoid a hydration mismatch
    // (using toLocaleString would render in the server's timezone).
    new Date(props.val).toUTCString(),
  );
  useEffect(() => {
    // Once we know the client's timezone and locale,
    // we can render the date in the user's timezone.
    setFormatted(
      new Date(props.val).toLocaleString(undefined, {
        dateStyle:
          format === "date" || format === "datetime" ? "short" : undefined,
        timeStyle:
          format === "time" || format === "datetime" ? "short" : undefined,
      }),
    );
    setVisible(true);
  }, [props.val, format]);
  return (
    // We initially render it with `visibility: hidden` to avoid showing the wrong value
    // while still avoiding a layout shift (unlike `display: none`)
    <time dateTime={props.val} className={visible ? "" : "invisible"}>
      {formatted}
    </time>
  );
}
