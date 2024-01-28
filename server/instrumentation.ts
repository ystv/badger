export async function register() {
  console.log(
    `Starting Bowser Server v${
      process.env.NEXT_PUBLIC_VERSION
    } (${process.env.NEXT_PUBLIC_GIT_COMMIT?.slice(0, 7)})`,
  );
  const { logFlagState } = await import("@bowser/feature-flags");
  logFlagState();
}
