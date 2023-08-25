"use client";

import type { User } from "@/lib/auth/types";
import { createContext, useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

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
        username: user.server_name ?? user.its_name ?? user.email,
        email: user.email,
      });
    }
  }, [props.value]);
  return (
    <UserContext.Provider value={props.value}>
      {props.children}
    </UserContext.Provider>
  );
}
