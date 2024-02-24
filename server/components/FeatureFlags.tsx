"use client";

import { createContext, useContext } from "react";
import type * as FlagsType from "@badger/feature-flags";

const featureFlagsCtx = createContext<Record<string, boolean>>({});

export function FeatureFlagsProvider(props: {
  value: Record<string, boolean>;
  children: React.ReactNode;
}) {
  return (
    <featureFlagsCtx.Provider value={props.value}>
      {props.children}
    </featureFlagsCtx.Provider>
  );
}

export function useFeatureFlag(flag: keyof typeof FlagsType) {
  return useContext(featureFlagsCtx)[flag];
}

export function FlagGate(props: {
  children: React.ReactNode;
  flag: keyof typeof FlagsType;
}) {
  if (useFeatureFlag(props.flag)) {
    return <>{props.children}</>;
  }
  return null;
}

export function FlagDisabledGate(props: {
  children: React.ReactNode;
  flag: keyof typeof FlagsType;
}) {
  if (!useFeatureFlag(props.flag)) {
    return <>{props.children}</>;
  }
  return null;
}
