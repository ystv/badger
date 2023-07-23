import { ipc } from "./ipc";

export function DownloadTracker() {
  const downloadStatus = ipc.media.getDownloadStatus.useQuery(void 0, {
    refetchInterval: 1000,
  });
  if (downloadStatus.isLoading) {
    return null;
  }
  if (downloadStatus.error) {
    return <div>Error: {downloadStatus.error.message}</div>;
  }
  return (
    <div className="absolute bottom-0 right-0">
      {downloadStatus.data
        .filter((x) => x.status !== "done")
        .map((download) => (
          <div key={download.mediaID}>
            <strong>{download.name}</strong>: {download.status},{" "}
            {download.progressPercent?.toFixed(1)}%
          </div>
        ))}
    </div>
  );
}
