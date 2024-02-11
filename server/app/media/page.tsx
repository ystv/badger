import { requirePermission } from "@/lib/auth";
import { Permission } from "@bowser/prisma/client";
import { ExtendedMedia, MediaTable } from "./mediaTable";
import { db } from "@/lib/db";
import { listMediaFiles } from "@/lib/s3";

export default async function MediaPage() {
  await requirePermission(Permission.ArchiveMedia);
  const data: ExtendedMedia[] = await db.media.findMany({
    include: {
      rundownItems: {
        include: {
          rundown: {
            include: {
              show: true,
            },
          },
        },
      },
      assets: {
        include: {
          rundown: {
            include: {
              show: true,
            },
          },
        },
      },
      continuityItems: {
        include: {
          show: true,
        },
      },
      metadata: {
        include: {
          field: true,
          show: true,
          rundown: {
            include: {
              show: true,
            },
          },
        },
      },
    },
  });
  const files = await listMediaFiles();
  data.forEach((media) => {
    const rawFile = files.find((file) => file.Key === media.rawPath);
    media.rawSize = rawFile?.Size;
    const processedFile = files.find((file) => file.Key === media.path);
    media.processedSize = processedFile?.Size;
  });

  return (
    <div>
      <h1 className="text-4xl">Media</h1>
      <MediaTable data={data} />
    </div>
  );
}
