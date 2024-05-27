"use client";

import { createContext, useContext, useEffect } from "react";
import * as Sentry from "@sentry/nextjs";
import { User } from "@badger/prisma/types";

const UserContext = createContext<User | null>(null);

export function UserProvider(props: {
  value: User | null;
  children: React.ReactNode;
}) {
  useEffect(() => {
    const user = props.value;
    if (user && Sentry.isInitialized()) {
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

export function useCurrentUser() {
  return useContext(UserContext);
}
