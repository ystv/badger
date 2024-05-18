"use client";

import { createContext, forwardRef, ReactNode, useContext } from "react";
import { useDropzone } from "react-dropzone";
import { UploadSourceType, useUploadsStore } from "./Uploader";

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
  sourceType: UploadSourceType;
  sourceId: string;
  onSelection: () => void;
  onComplete: (url: string, fileName: string) => void;
  disabled?: boolean;
}

export const MediaUploader = forwardRef<
  Record<string, never>,
  MediaUploaderProps
>(function MediaUploader(props, ref) {
  const uploads = useUploadsStore();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    disabled: props.disabled,
    onDrop(files) {
      for (const file of files) {
        uploads.enqueueUpload(
          props.sourceType,
          props.sourceId,
          file,
          props.onComplete,
        );
      }
      props.onSelection();
    },
    accept: props.accept,
    maxFiles: 1,
  });
  return (
    <>
      {/* TODO [BDGR-8]: Google Drive picker */}
      <div
        {...getRootProps()}
        className="p-8 m-1 rounded-md bg-mid-light text-dark w-64 h-24"
      >
        <input {...getInputProps()} />
        {isDragActive ? <p>Drop the file here...</p> : <p>{props.prompt}</p>}
      </div>
    </>
  );
});
