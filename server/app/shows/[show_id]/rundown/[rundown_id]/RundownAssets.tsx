"use client";

import { Asset, AssetTypeSchema, LoadAssetJob, Rundown } from "@/lib/db/types";
import React, { useEffect, useRef, useState, useTransition } from "react";
import { AssetTypeType } from "@/lib/db/types/inputTypeSchemas/AssetTypeSchema";
import classNames from "classnames";
import Button from "@/components/Button";
import {
  IoAddCircleSharp,
  IoImageSharp,
  IoMusicalNoteSharp,
  IoTvSharp,
  IoVolumeMediumSharp,
} from "react-icons/io5";
import { IconType } from "react-icons/lib/cjs/iconBase";
import { MediaUploadDialog } from "@/components/MediaUpload";
import { Dialog, Popover } from "@headlessui/react";
import Spinner from "@/app/_assets/spinner.svg";
import Image from "next/image";
import { MediaState } from "@prisma/client";
import {
  processAssetUpload,
  removeAsset,
} from "@/app/shows/[show_id]/rundown/[rundown_id]/assetsActions";
import { deleteItem } from "@/app/shows/[show_id]/actions";
import { useRouter } from "next/navigation";

export interface RundownWithAssets extends Rundown {
  assets: Asset[];
}

const AssetColorClasses: { [K in AssetTypeType]: string } = {
  Still: "text-success-4",
  Graphic: "text-warning-4",
  SoundEffect: "text-purple-4",
  Music: "text-danger-4",
};

const AssetIcons: { [K in AssetTypeType]: IconType } = {
  Still: IoTvSharp,
  Graphic: IoImageSharp,
  SoundEffect: IoVolumeMediumSharp,
  Music: IoMusicalNoteSharp,
};

export default function RundownAssets(props: { rundown: RundownWithAssets }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [filter, setFilter] = useState<AssetTypeType | "all">("all");
  const assets = props.rundown.assets.filter((asset) => {
    if (filter === "all") {
      return true;
    }
    return asset.type === filter;
  });
  const [isUploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [newUploadType, setNewUploadType] = useState<AssetTypeType | "$none">(
    "$none",
  );

  // Periodically refresh if any assets are pending
  const refreshIntervalRef = useRef<number | null>(null);
  useEffect(() => {
    if (
      props.rundown.assets.some((asset) => asset.state !== MediaState.Ready)
    ) {
      refreshIntervalRef.current = window.setInterval(() => {
        router.refresh();
      }, 2500);
    }
    return () => {
      if (refreshIntervalRef.current !== null) {
        window.clearInterval(refreshIntervalRef.current);
      }
    };
  }, [props.rundown.assets, router]);

  return (
    <div>
      <h2 className="text-xl">Assets</h2>
      <div className="flex flex-col">
        <div className="flex flex-row space-x-1">
          <button
            onClick={() => setFilter("all")}
            className={classNames(
              "text-primary-4",
              filter === "all" && "font-black uppercase",
            )}
          >
            All
          </button>
          {AssetTypeSchema.options.map((option) => (
            <button
              key={option}
              onClick={() => setFilter(option)}
              className={classNames(
                AssetColorClasses[option],
                filter === option && "font-black uppercase",
              )}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="flex flex-col">
          {assets.map((asset) => {
            let icon;
            if (asset.state !== MediaState.Ready) {
              icon = <Image src={Spinner} alt="" className="inline-block" />;
            } else {
              const Icon = AssetIcons[asset.type];
              icon = (
                <Icon
                  className={classNames(
                    "w-6 h-6",
                    AssetColorClasses[asset.type],
                  )}
                />
              );
            }
            return (
              <div
                key={asset.id}
                className={classNames(
                  "flex flex-row items-center space-x-2",
                  asset.state === "Pending" && "text-mid-dark",
                  asset.state === "Processing" && "text-purple-4",
                  asset.state === "ProcessingFailed" &&
                    "text-danger-4 line-through",
                )}
              >
                <div>{icon}</div>
                <div>{asset.name}</div>
                <div>
                  <Popover>
                    <Popover.Button className="border-danger border-[1px] text-danger hover:text-light hover:bg-danger-4 px-0.5 py-1 rounded-md">
                      &times;
                    </Popover.Button>
                    <Popover.Overlay className="fixed inset-0 bg-dark/40 z-20" />
                    <Popover.Panel className="absolute shadow-lg ml-4 z-50 p-0 m-0">
                      <Button
                        color="danger"
                        inverted
                        onClick={() =>
                          startTransition(async () => {
                            await removeAsset(asset.id);
                          })
                        }
                        disabled={isPending}
                        className="z-50"
                      >
                        {isPending && <Image src={Spinner} alt="" />}
                        You sure boss?
                      </Button>
                    </Popover.Panel>
                  </Popover>
                </div>
              </div>
            );
          })}
          <button
            className="flex flex-row text-mid-dark italic items-center cursor-pointer"
            onClick={() => setUploadDialogOpen(true)}
          >
            <div>
              <IoAddCircleSharp />
            </div>
            <div>Upload new asset</div>
          </button>
        </div>
      </div>
      <Dialog
        open={isUploadDialogOpen}
        onClose={() => setUploadDialogOpen(false)}
      >
        <div className="fixed inset-0 bg-dark/60" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4 shadow-xl">
          <Dialog.Panel className="mx-auto max-w-sm rounded bg-light p-8 relative">
            <select
              onChange={(e) =>
                setNewUploadType(e.target.value as AssetTypeType)
              }
              value={String(newUploadType)}
              className="border border-mid-dark rounded-md p-1 w-64"
            >
              <option value="$none" disabled>
                Select type
              </option>
              {AssetTypeSchema.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {newUploadType !== "$none" && (
              <MediaUploadDialog
                title={"Upload new " + newUploadType}
                prompt="Drop file here, or click to select"
                accept={{}}
                disabled={isPending}
                onComplete={(url, name) => {
                  startTransition(async () => {
                    await processAssetUpload(
                      props.rundown.id,
                      newUploadType,
                      name,
                      url,
                    );
                    setUploadDialogOpen(false);
                  });
                }}
              />
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
