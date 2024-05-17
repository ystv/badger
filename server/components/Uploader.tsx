"use client";

import { ReactNode, useRef } from "react";
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

interface UploadsState {
  uploads: Array<{
    file: File;
    fileName: string;
    progress: number;
    state:
      | "pending"
      | "uploading"
      | "complete"
      | "gone"
      | "cancelled"
      | "error";
    errorReason?: string;
  }>;
  enqueueUpload: (
    file: File,
    onComplete: (url: string, fileName: string) => void,
  ) => void;
  cancelUpload: (file: File) => void;
}

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
    await uploadLock.acquire("upload", async () => {
      const upload = new tus.Upload(file, {
        endpoint: (window as unknown as { TUS_ENDPOINT: string }).TUS_ENDPOINT,
        // The Tus JS Client documentation doesn't recommend manually setting a chunk size.
        // However we've observed that the default of Infinity can lead to failures
        // of particularly big files (as video tends to be), so we set one. The chunk size of 50MB
        // is a good balance between upload speed, per-chunk overhead, and reliability - assuming an average
        // UK broadband connection of 86Mbps, it should take about 5 seconds to upload
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
                const upload = draft.uploads.find((x) => x.file === file);
                if (upload) {
                  upload.state = "gone";
                }
              }),
            );
          }, 10_000);
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
    });
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

  return (
    <>
      {props.children}
      {inProgress.length > 0 && (
        <Card className="fixed bottom-4 right-4 p-8">
          <CardHeader>
            <CardTitle>Uploads</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {uploads.uploads
              .filter((x) => x.state !== "gone")
              .map((up) => (
                <div
                  key={up.fileName}
                  className={twMerge(
                    "shadow-xs rounded flex flex-row items-center",
                    up.state === "cancelled" && "line-through",
                  )}
                >
                  <p>{up.fileName}</p>
                  <Progress
                    value={up.progress}
                    max={1}
                    className="inline-block"
                  ></Progress>
                  {up.state === "error" && <p>Error: {up.errorReason}</p>}
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
                </div>
              ))}
          </CardContent>
        </Card>
      )}
    </>
  );
}
