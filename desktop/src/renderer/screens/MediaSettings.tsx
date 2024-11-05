import Button from "@badger/components/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@badger/components/table";
import { useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@badger/components/dropdown-menu";
import { IoChevronDownSharp } from "react-icons/io5";
import { Badge } from "@badger/components/badge";
import { useQueryClient } from "@tanstack/react-query";
// import { getQueryKey } from "@trpc/react-query";

function humaniseSize(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} bytes`;
  }
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(2)} KiB`;
  }
  if (bytes < 1024 * 1024 * 1024) {
    return `${(bytes / 1024 / 1024).toFixed(2)} MiB`;
  }
  return `${(bytes / 1024 / 1024 / 1024).toFixed(2)} GiB`;
}

export function MediaSettings() {
  const queryClient = useQueryClient();
  const [data] = ipc.media.getLocalMedia.useSuspenseQuery({
    includeSize: true,
  });
  const [mediaPath] = ipc.media.getPath.useSuspenseQuery();
  const [currentShow] = ipc.getSelectedShow.useSuspenseQuery();
  const open = ipc.media.openPath.useMutation();
  const deleteOldMedia = ipc.media.deleteOldMedia.useMutation({
    async onSuccess() {
      await queryClient.invalidateQueries(getQueryKey(ipc.media.getLocalMedia));
    },
  });
  const totalSpace = data.map((x) => x.sizeBytes!).reduce((a, b) => a + b, 0);

  const mediaInShow = useMemo(() => {
    const ids = new Set<number>();
    currentShow?.continuityItems.forEach((x) => {
      if (x.media) {
        ids.add(x.media.id);
      }
    });
    currentShow?.rundowns.forEach((x) =>
      x.items.forEach((y) => {
        if (y.media) {
          ids.add(y.media.id);
        }
      }),
    );
    return ids;
  }, [currentShow]);
  function isMediaInShow(item: (typeof data)[0]) {
    return mediaInShow.has(item.mediaID);
  }

  return (
    <div>
      <h2 className="text-xl">Media</h2>
      <p>
        Location: <code>{mediaPath}</code>
        <Button color="ghost" onClick={() => open.mutate()}>
          Open
        </Button>
      </p>
      <p>Total disk usage: {humaniseSize(totalSpace)}</p>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild disabled={deleteOldMedia.isLoading}>
            <Button color="light">
              <IoChevronDownSharp className="mr-2 h-4 w-2" /> Delete media older
              than&hellip;
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => deleteOldMedia.mutate({ minAgeDays: 7 })}
            >
              1 week
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => deleteOldMedia.mutate({ minAgeDays: 14 })}
            >
              2 weeks
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => deleteOldMedia.mutate({ minAgeDays: 29 })}
            >
              1 month
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Path</TableHead>
              <TableHead>Size</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((media) => (
              <TableRow
                key={media.mediaID}
                data-testid={`MediaSettings.Row.${media.mediaID}`}
              >
                <TableCell>{media.path.replace(mediaPath, "")}</TableCell>
                <TableCell>{humaniseSize(media.sizeBytes!)}</TableCell>
                <TableCell>
                  {isMediaInShow(media) ? (
                    <Badge variant="default">In use</Badge>
                  ) : (
                    <Badge variant="dark">Safe to delete</Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
