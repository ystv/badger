"use client";

import invariant from "@/lib/invariant";
import {
  createContext,
  forwardRef,
  ReactNode,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useDropzone } from "react-dropzone";
import * as tus from "tus-js-client";

const TusEndpointContext = createContext<string>(
  process.env.TUS_ENDPOINT ?? "",
);
export function TusEndpointProvider(props: {
  value: string;
  children: React.ReactNode;
}) {
  return (
    <TusEndpointContext.Provider value={props.value}>
      {props.children}
    </TusEndpointContext.Provider>
  );
}
export const useTusEndpoint = () => useContext(TusEndpointContext);

export interface MediaUploaderHandle {
  cancel(): Promise<void> | undefined;

  /**
   * Returns the upload progress as a number between 0 and 1. Returns 0 if no
   * upload is in progress, or 1 if the upload is complete.
   */
  getProgress(): number;
}

interface MediaUploaderProps {
  prompt: ReactNode;
  title: string;
  accept: Record<string, string[]>;
  onComplete: (url: string, fileName: string) => void;
  disabled?: boolean;
}

export const MediaUploader = forwardRef<
  MediaUploaderHandle,
  MediaUploaderProps
>(function MediaUploader(props, ref) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const endpoint = useTusEndpoint();
  invariant(endpoint.length > 0, "no tus endpoint");
  const uploadRef = useRef<tus.Upload | null>(null);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    disabled: props.disabled || isUploading,
    onDrop(files) {
      uploadRef.current = new tus.Upload(files[0], {
        endpoint,
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
          setIsUploading(false);
          setError(error.message);
        },
        onProgress: function (bytesUploaded, bytesTotal) {
          const percentage = bytesUploaded / bytesTotal;
          setUploadProgress(percentage);
        },
        onSuccess: function () {
          setIsUploading(false);
          props.onComplete(uploadRef.current!.url!, files[0].name);
          uploadRef.current = null;
        },
      });
      // Check if there are any previous uploads to continue.
      uploadRef.current?.findPreviousUploads().then(function (previousUploads) {
        // Found previous uploads so we select the first one.
        if (previousUploads.length) {
          uploadRef.current?.resumeFromPreviousUpload(previousUploads[0]);
        }

        // Start the upload
        uploadRef.current?.start();
        setUploadProgress(0);
        setIsUploading(true);
      });
    },
    accept: props.accept,
    maxFiles: 1,
  });
  useImperativeHandle(ref, () => ({
    cancel() {
      return uploadRef.current?.abort();
    },
    getProgress() {
      return uploadProgress;
    },
  }));
  return (
    <>
      {error && (
        <div className="bg-danger-4 text-light rounded-md p-2 mt-2">
          {error}
        </div>
      )}
      {/* TODO [BOW-8]: Google Drive picker */}
      <div
        {...getRootProps()}
        className="p-8 m-1 rounded-md bg-mid-light text-dark w-64 h-24"
      >
        <input {...getInputProps()} />
        {isUploading ? (
          <p>Uploading, please wait...</p>
        ) : isDragActive ? (
          <p>Drop the file here...</p>
        ) : (
          <p>{props.prompt}</p>
        )}
      </div>
      {isUploading && (
        <div
          className="absolute bottom-0 w-full h-2 left-0 bg-primary"
          style={{
            width: `${uploadProgress * 100}%`,
          }}
        />
      )}
    </>
  );
});
