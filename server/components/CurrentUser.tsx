"use client";

import { createContext, useEffect } from "react";
import * as Sentry from "@sentry/nextjs";
import { User } from "@bowser/prisma/types";

const UserContext = createContext<User | null>(null);

export function UserProvider(props: {
  value: User | null;
  children: React.ReactNode;
}) {
  useEffect(() => {
    const user = props.value;
    if (user && Sentry.getCurrentHub().getClient()) {
      Sentry.setUser({
        id: user.id,
        email: user.email ?? undefined,
      });
    }
  }, [props.value]);
  return (
    <UserContext.Provider value={props.value}>
      {props.children}
    </UserContext.Provider>
  );
}
