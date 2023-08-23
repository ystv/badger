import type { Metadata } from "next";
import "./globals.css";
import { DebugModeProvider } from "@/components/DebugMode";
import { cookies } from "next/headers";

import { DEBUG_MODE_COOKIE } from "@/app/enableDebugMode/constants";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <DebugModeProvider
          value={cookies().get(DEBUG_MODE_COOKIE)?.value === "true"}
        >
          <main className="max-w-3xl mx-auto">{children}</main>
        </DebugModeProvider>
      </body>
    </html>
  );
}
