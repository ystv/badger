"use client";

import { ReactNode, useMemo } from "react";
import { useCurrentUser } from "./CurrentUser";
import { Permission } from "@badger/prisma/client";
import { useFeatureFlag } from "./FeatureFlags";

export function PermissionGate(props: {
  children: ReactNode;
  permission: Permission;
}) {
  const disabled = useFeatureFlag("disablePermissionsChecks");
  const me = useCurrentUser();
  const open = useMemo(
    () =>
      disabled ||
      me?.permissions.includes(props.permission) ||
      me?.permissions.includes(Permission.SUDO),
    [me, props.permission, disabled],
  );
  if (open) {
    return <>{props.children}</>;
  }
  return null;
}
