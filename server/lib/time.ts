export function formatDurationMS(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  const secondsLeft = seconds % 60;
  const minutesLeft = minutes % 60;

  const hoursString = hours > 0 ? `${hours.toFixed(0).padStart(2, "0")}:` : "";
  const minutesString = `${minutesLeft.toFixed(0).padStart(2, "0")}:`;
  const secondsString = `${secondsLeft.toFixed(0).padStart(2, "0")}`;

  return `${hoursString}${minutesString}${secondsString}`;
}
