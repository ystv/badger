"use client";

import { Dialog } from "@headlessui/react";
import { createContext, useContext, useState } from "react";
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

export function MediaUploadDialog(props: {
  title: string;
  onComplete: (url: string, fileName: string) => void;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const endpoint = useTusEndpoint();
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    disabled: isUploading,
    onDrop(files) {
      const upload = new tus.Upload(files[0], {
        endpoint,
        onError: function (error) {
          setIsUploading(false);
          setError(error.message);
        },
        onProgress: function (bytesUploaded, bytesTotal) {
          const percentage = (bytesUploaded / bytesTotal) * 100;
          setUploadProgress(percentage);
        },
        onSuccess: function () {
          setIsUploading(false);
          props.onComplete(upload.url!, files[0].name);
        },
      });
      // Check if there are any previous uploads to continue.
      upload.findPreviousUploads().then(function (previousUploads) {
        // Found previous uploads so we select the first one.
        if (previousUploads.length) {
          upload.resumeFromPreviousUpload(previousUploads[0]);
        }

        // Start the upload
        upload.start();
        setUploadProgress(0);
        setIsUploading(true);
      });
    },
    accept: {
      "video/*": [],
    },
    maxFiles: 1,
  });
  return (
    <>
      <div className="fixed inset-0 bg-dark/60" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4 shadow-xl">
        <Dialog.Panel className="mx-auto max-w-sm rounded bg-light p-8 relative">
          <Dialog.Title className="text-xl font-bold">
            {props.title}
          </Dialog.Title>
          {error && (
            <div className="bg-danger-4 text-light rounded-md p-2 mt-2">
              {error}
            </div>
          )}
          {/* TODO: Google Drive picker */}
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
              <p>Drop video files here, or click to select</p>
            )}
          </div>
          {isUploading && (
            <div
              className="absolute bottom-0 w-full h-2 left-0 bg-primary"
              style={{
                width: `${uploadProgress}%`,
              }}
            />
          )}
        </Dialog.Panel>
      </div>
    </>
  );
}
