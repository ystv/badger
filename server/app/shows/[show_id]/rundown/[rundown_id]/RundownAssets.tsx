"use client";

import { Asset, Rundown } from "@badger/prisma/types";
import React, { ReactNode, useMemo, useState, useTransition } from "react";
import classNames from "classnames";
import Button from "@badger/components/button";
import {
  IoChevronDown,
  IoChevronForward,
  IoImageSharp,
  IoMusicalNoteSharp,
  IoTvSharp,
  IoWarningSharp,
} from "react-icons/io5";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@badger/components/popover";
import Spinner from "@/app/_assets/spinner.svg";
import Image from "next/image";
import { Media, MediaState } from "@badger/prisma/client";
import {
  createAssetFromExistingMedia,
  processAssetUpload,
  removeAsset,
} from "@/app/shows/[show_id]/rundown/[rundown_id]/assetsActions";
import {
  MediaSelectOrUploadDialog,
  PastShowsMedia,
} from "@/components/MediaSelection";
import { expectNever } from "ts-expect";
import { Input } from "@badger/components/input";
import { isEqual } from "lodash";

interface AssetWithMedia extends Asset {
  media: Media;
}

export interface RundownWithAssets extends Rundown {
  assets: AssetWithMedia[];
}

export const AssetExtensionIcons: Record<string, ReactNode> = {
  ".png": <IoImageSharp />,
  ".jpg": <IoImageSharp />,
  ".jpeg": <IoImageSharp />,
  ".gif": <IoImageSharp />,
  ".svg": <IoImageSharp />,
  ".mp3": <IoMusicalNoteSharp />,
  ".wav": <IoMusicalNoteSharp />,
  ".flac": <IoMusicalNoteSharp />,
  ".mp4": <IoTvSharp />,
  ".mov": <IoTvSharp />,
  ".avi": <IoTvSharp />,
};

function AssetsCategory({
  assets,
  rundownId,
  category,
  pastShowsPromise,
}: {
  assets: AssetWithMedia[];
  rundownId: number;
  category: string;
  pastShowsPromise: Promise<PastShowsMedia>;
}) {
  const [isPending, startTransition] = useTransition();
  const [isExpanded, setExpanded] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  return (
    <div className="shadow-md rounded-md bg-light p-2 mb-4">
      <div onClick={() => setExpanded((v) => !v)} role="button">
        {isExpanded ? (
          <IoChevronDown className="inline-block" aria-label="Collapse" />
        ) : (
          <IoChevronForward className="inline-block" aria-label="Expand" />
        )}
        <h3 className="inline font-lg font-bold">{category}</h3>
      </div>
      {isExpanded && (
        <div className="flex flex-col">
          {assets
            .sort((a, b) => a.order - b.order)
            .map((asset) => {
              let icon;
              switch (asset.media.state) {
                case MediaState.Pending:
                case MediaState.Processing:
                  icon = (
                    <Image src={Spinner} alt="" className="inline-block" />
                  );
                  break;
                case MediaState.ProcessingFailed:
                  icon = (
                    <IoWarningSharp
                      className="inline"
                      data-testid="RundownAssets.loadFailed"
                    />
                  );
                  break;
                case MediaState.Ready:
                case MediaState.ReadyWithWarnings: {
                  icon =
                    AssetExtensionIcons[asset.media!.name.split(".").pop()!];
                  break;
                }
                case MediaState.Archived:
                  icon = (
                    <IoWarningSharp
                      className="inline"
                      data-testid="RundownAssets.archived"
                    />
                  );
                  break;
                default:
                  expectNever(asset.media.state);
              }
              return (
                <div
                  key={asset.id}
                  className={classNames(
                    "flex flex-row items-center space-x-2",
                    asset.media.state === "Pending" && "text-mid-dark",
                    asset.media.state === "Processing" && "text-purple-4",
                    asset.media.state === "ProcessingFailed" &&
                      "text-danger-4 line-through",
                    asset.media.state === "ReadyWithWarnings" &&
                      "text-warning-4",
                  )}
                >
                  <div>{icon}</div>
                  <div>{asset.name}</div>
                  <div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button color="ghost" size="icon" aria-label="Delete">
                          &times;
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <Button
                          color="danger"
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
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              );
            })}
          <div>
            <Button
              color="light"
              onClick={() => setIsUploadOpen(true)}
              disabled={isPending}
              size="small"
            >
              {isPending && <Image src={Spinner} alt="" />}
              Upload new asset
            </Button>
          </div>
        </div>
      )}
      <MediaSelectOrUploadDialog
        isOpen={isUploadOpen}
        setOpen={setIsUploadOpen}
        title={"Upload new asset"}
        onUploadComplete={(url, fileName) =>
          processAssetUpload(rundownId, category, fileName, url)
        }
        onExistingSelected={(id) =>
          createAssetFromExistingMedia(rundownId, category, id)
        }
        pastShowsPromise={pastShowsPromise}
        containerType="asset"
        containerId={rundownId + ":" + category}
        acceptMedia={{}}
      />
    </div>
  );
}

export default function RundownAssets(props: {
  rundown: RundownWithAssets;
  pastShowsPromise: Promise<PastShowsMedia>;
}) {
  const assetsByCategory = useMemo(() => {
    const categories = new Map<string, AssetWithMedia[]>();
    for (const asset of props.rundown.assets) {
      if (!categories.has(asset.category)) {
        categories.set(asset.category, []);
      }
      categories.get(asset.category)!.push(asset);
    }
    return categories;
  }, [props.rundown.assets]);

  const [isCatOpen, setIsCatOpen] = useState(false);
  const [tempCatInputVal, setTempCatInputVal] = useState("");
  const [tempCats, setTempCats] = useState<string[]>([]);

  const [prevCats, setPrevCats] = useState<string[]>([]);
  const cats = Array.from(assetsByCategory.keys());
  if (!isEqual(cats, prevCats)) {
    setPrevCats(cats);
    setTempCats((v) => v.filter((tc) => !cats.includes(tc)));
  }

  return (
    <div>
      <h2 className="text-xl">Assets</h2>

      {Array.from(assetsByCategory.entries()).map(([category, assets]) => (
        <AssetsCategory
          key={category}
          category={category}
          assets={assets}
          rundownId={props.rundown.id}
          pastShowsPromise={props.pastShowsPromise}
        />
      ))}
      {tempCats.map((cat) => (
        <AssetsCategory
          key={cat}
          category={cat}
          assets={[]}
          rundownId={props.rundown.id}
          pastShowsPromise={props.pastShowsPromise}
        />
      ))}
      <Popover
        open={isCatOpen}
        onOpenChange={(open) => {
          setIsCatOpen(open);
          if (open) {
            setTempCatInputVal("");
          }
        }}
      >
        <PopoverTrigger asChild>
          <Button color="ghost" size="small">
            New Category
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <form
            action={() => {
              setTempCats((v) => [...v, tempCatInputVal]);
              setIsCatOpen(false);
            }}
          >
            <label>
              Name
              <Input
                type="text"
                value={tempCatInputVal}
                onChange={(e) => setTempCatInputVal(e.target.value)}
                placeholder="Stills"
              />
            </label>
            <Button>Create</Button>
          </form>
        </PopoverContent>
      </Popover>
    </div>
  );
}
