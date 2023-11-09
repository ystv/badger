"use client";

import { ReactNode, useMemo } from "react";
import { useCurrentUser } from "./CurrentUser";
import { Permission } from "@bowser/prisma/client";

export function PermissionGate(props: {
  children: ReactNode;
  permission: Permission;
}) {
  const me = useCurrentUser();
  const open = useMemo(
    () =>
      me?.permissions.includes(props.permission) ||
      me?.permissions.includes(Permission.SUDO),
    [me, props.permission],
  );
  if (open) {
    return <>{props.children}</>;
  }
  return null;
}
