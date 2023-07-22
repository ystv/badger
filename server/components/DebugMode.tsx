"use client";
import { createContext, useContext } from "react";
import Link from "next/link";

const DebugContext = createContext(false);

export const useDebugMode = () => useContext(DebugContext);

export function DebugModeProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: boolean;
}) {
  return (
    <DebugContext.Provider value={value}>{children}</DebugContext.Provider>
  );
}

export function DebugOnly({ children }: { children: React.ReactNode }) {
  const debug = useDebugMode();
  return debug ? children : null;
}

export function DebugIndicator() {
  return (
    <DebugOnly>
      <div className="fixed bottom-0 right-0 rounded-tl bg-danger-4/50 p-2 text-white">
        Debug mode active (
        <Link href="/enableDebugMode?value=false" className="underline">
          disable
        </Link>
        )
      </div>
    </DebugOnly>
  );
}
