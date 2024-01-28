"use client";

import { useEffect, useRef, useTransition } from "react";

/**
 * Implements the "polling server action" pattern: https://twitter.com/sebmarkbage/status/1667217918105403416
 *
 * Pass a Server Action that calls revalidatePath(currentPath) if the data displayed by this page has changed.
 */
export function Poll<TParams extends unknown[] = []>(props: {
  params: TParams;
  action: (...params: TParams) => Promise<void>;
  interval?: number;
}) {
  const [_, startTransition] = useTransition();
  const { params, action, interval = 5000 } = props;
  const idRef = useRef<number | NodeJS.Timeout | null>(null);
  useEffect(() => {
    function poll() {
      startTransition(async () => {
        await action(...params);
        idRef.current = setTimeout(poll, interval);
      });
    }
    idRef.current = setTimeout(poll, interval);
    return () => {
      if (idRef.current) {
        clearTimeout(idRef.current);
      }
    };
  }, [params, action, interval]);
  return null;
}
