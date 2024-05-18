"use client";

import { Fragment, ReactNode } from "react";
import { create as zustand } from "zustand";
import { produce } from "immer";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@badger/components/card";
import AsyncLock from "async-lock";
import * as tus from "tus-js-client";
import Button from "@badger/components/button";
import { Progress } from "@badger/components/progress";
import { twMerge } from "tailwind-merge";
import { useBeforeunload } from "react-beforeunload";

interface UploadsState {
  uploads: Array<{
    file: File;
    fileName: string;
    progress: number;
    state: "pending" | "uploading" | "complete" | "cancelled" | "error";
    errorReason?: string;
  }>;
  enqueueUpload: (
    file: File,
    onComplete: (url: string, fileName: string) => void,
  ) => void;
  cancelUpload: (file: File) => void;
}

const COMPLETE_UPLOAD_REMOVAL_DELAY =
  // __COMPLETE_UPLOAD_REMOVAL_DELAY is only used for testing
  (typeof window !== "undefined" &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).__COMPLETE_UPLOAD_REMOVAL_DELAY) ??
  10_000;

const uploadLock = new AsyncLock();

const pendingUploads = new WeakMap<File, tus.Upload>();

export const useUploadsStore = zustand<UploadsState>()((set) => ({
  uploads: [],
  enqueueUpload: async (file, onComplete) => {
    set(
      produce<UploadsState>((draft) => {
        draft.uploads.push({
          file,
          fileName: file.name,
          progress: 0,
          state: "pending",
        });
      }),
    );
    await uploadLock.acquire(
      "upload",
      () =>
        new Promise<void>((resolve, reject) => {
          const upload = new tus.Upload(file, {
            endpoint: (window as unknown as { TUS_ENDPOINT: string })
              .TUS_ENDPOINT,
            // The Tus JS Client documentation doesn't recommend manually setting a chunk size.
            // However we've observed that the default of Infinity can lead to failures
            // of particularly big files (as video tends to be), so we set one. The chunk size of 50MB
            // is a good balance between upload speed, per-chunk overhead, and reliability - assuming an average
            // a chunk, and a 1Gb file would be split into 20 chunks, with maybe 0.5s of processing
            // time for each chunk.
            chunkSize: 50 * 1024 * 1024,
            retryDelays: [0, 1000, 3000, 5000],
            onError: function (error) {
              set(
                produce<UploadsState>((draft) => {
                  const upload = draft.uploads.find((x) => x.file === file);
                  if (upload) {
                    upload.state = "error";
                    upload.errorReason = error.message;
                  }
                }),
              );
              reject(error);
            },
            onProgress: function (bytesUploaded, bytesTotal) {
              set(
                produce<UploadsState>((draft) => {
                  const upload = draft.uploads.find((x) => x.file === file);
                  if (upload) {
                    upload.progress = bytesUploaded / bytesTotal;
                  }
                }),
              );
            },
            onSuccess: function () {
              onComplete(upload.url!, file.name);
              resolve();
              set(
                produce<UploadsState>((draft) => {
                  const upload = draft.uploads.find((x) => x.file === file);
                  if (upload) {
                    upload.state = "complete";
                  }
                }),
              );
              setTimeout(() => {
                set(
                  produce<UploadsState>((draft) => {
                    draft.uploads = draft.uploads.filter(
                      (x) => x.file !== file,
                    );
                  }),
                );
              }, COMPLETE_UPLOAD_REMOVAL_DELAY);
            },
          });
          pendingUploads.set(file, upload);
          // Check if there are any previous uploads to continue.
          upload.findPreviousUploads().then(function (previousUploads) {
            // Found previous uploads so we select the first one.
            if (previousUploads.length) {
              upload.resumeFromPreviousUpload(previousUploads[0]);
            }

            // Start the upload
            upload.start();
            set(
              produce<UploadsState>((draft) => {
                const upload = draft.uploads.find((x) => x.file === file);
                if (upload) {
                  upload.state = "uploading";
                }
              }),
            );
          });
        }),
    );
  },
  cancelUpload: (file) => {
    const upload = pendingUploads.get(file);
    if (upload) {
      upload.abort(true);
      set(
        produce<UploadsState>((draft) => {
          const upload = draft.uploads.find((x) => x.file === file);
          if (upload) {
            upload.state = "cancelled";
          }
        }),
      );
    }
  },
}));

export function MediaUploader(props: { children: ReactNode }) {
  const uploads = useUploadsStore();

  const inProgress = uploads.uploads.filter((x) => x.state !== "complete");
  useBeforeunload((e) => {
    if (inProgress.length > 0) {
      e.preventDefault();
      return "You have uploads in progress. Are you sure you want to leave?";
    }
  });

  return (
    <>
      {props.children}
      {inProgress.length > 0 && (
        <Card className="fixed bottom-4 right-4 p-8">
          <CardHeader>
            <CardTitle>Uploads</CardTitle>
          </CardHeader>
          <CardContent
            className="grid grid-cols-[1fr_auto] items-center justify-items-center"
            data-testid="MediaUploader.progress"
          >
            {uploads.uploads.map((up) => (
              <Fragment key={up.fileName}>
                <p
                  className={twMerge(
                    (up.state === "cancelled" || up.state === "error") &&
                      "line-through",
                    up.state === "error" && "text-red-500",
                    up.state === "complete" && "text-green-500",
                  )}
                >
                  {up.fileName}
                </p>
                {up.state === "uploading" && (
                  <Button
                    size="icon"
                    color="ghost"
                    aria-label="Cancel"
                    onClick={() => uploads.cancelUpload(up.file)}
                  >
                    &times;
                  </Button>
                )}
                <Progress
                  value={up.progress * 100}
                  max={100}
                  className="inline-block col-span-2 w-full"
                ></Progress>
                {up.state === "error" && <p>Error: {up.errorReason}</p>}
              </Fragment>
            ))}
          </CardContent>
        </Card>
      )}
    </>
  );
}
