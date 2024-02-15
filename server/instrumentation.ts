export async function register() {
  console.log(
    `Starting Badger Server v${
      process.env.NEXT_PUBLIC_VERSION
    } (${process.env.NEXT_PUBLIC_GIT_COMMIT?.slice(0, 7)})`,
  );
  const { logFlagState } = await import("@badger/feature-flags");
  logFlagState();
}
