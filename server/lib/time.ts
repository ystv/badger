export function formatDurationMS(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  const secondsLeft = seconds % 60;
  const minutesLeft = minutes % 60;

  const hoursString = hours > 0 ? `${hours}h ` : "";
  const minutesString = minutesLeft > 0 ? `${minutesLeft}m ` : "";
  const secondsString = secondsLeft > 0 ? `${secondsLeft}s` : "";

  return `${hoursString}${minutesString}${secondsString}`;
}
