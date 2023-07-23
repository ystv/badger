import { db } from "@/lib/db";
import { MediaFileSourceType } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

interface FileInfo {
  ID: string;
  Size: number;
  SizeIsDeferred: boolean;
  Offset: number;
  MetaData: Record<string, string>;
  IsPartial: boolean;
  IsFinal: boolean;
  PartialUploads: string[];
  Storage: Record<string, string>;
}

interface HTTPRequest {
  Method: string;
  URI: string;
  RemoteAddr: string;
  Header: Record<string, string[]>;
}

interface HookEvent {
  Upload: FileInfo;
  HTTPRequest: HTTPRequest;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const hookName = req.headers.get("Hook-Name");
  const data = (await req.json()) as HookEvent;
  console.log(`Received Tus ${hookName} hook`);
  switch (hookName) {
    case "pre-create":
      if ("rundownItemID" in data.Upload.MetaData) {
        const rundownItemID = parseInt(data.Upload.MetaData.rundownItemID, 10);
        const rundownItem = await db.rundownItem.findUnique({
          where: { id: rundownItemID },
        });
        if (!rundownItem) {
          return new NextResponse("Not found", { status: 404 });
        }
        return new NextResponse("", { status: 200 });
      } else {
        return new NextResponse("No reference", { status: 400 });
      }
    case "pre-finish":
      if ("rundownItemID" in data.Upload.MetaData) {
        const rundownItemID = parseInt(data.Upload.MetaData.rundownItemID, 10);
        const rundownItem = await db.rundownItem.findUnique({
          where: { id: rundownItemID },
          include: {
            rundown: true,
          },
        });
        if (!rundownItem) {
          return new NextResponse("Not found", { status: 404 });
        }
        await db.$transaction(async ($db) => {
          await $db.rundownItem.update({
            where: {
              id: rundownItemID,
            },
            data: {
              media: {
                deleteMany: {},
              },
            },
          });
          await $db.media.create({
            data: {
              name: data.Upload.MetaData.filename,
              durationSeconds: 0,
              rawPath: "",
              rundownItem: {
                connect: {
                  id: rundownItemID,
                },
              },
              process_jobs: {
                create: {
                  sourceType: MediaFileSourceType.Tus,
                  source: data.Upload.ID,
                  base_job: {
                    create: {},
                  },
                },
              },
            },
          });
        });
        revalidatePath(
          `/shows/${rundownItem.rundown.showId}/rundown/${rundownItem.rundownId}`
        );
        return new NextResponse("", { status: 200 });
      } else {
        return new NextResponse("No reference", { status: 400 });
      }
    default:
      return new NextResponse("", { status: 200 });
  }
}
